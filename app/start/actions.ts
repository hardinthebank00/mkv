'use server'

import { headers } from 'next/headers'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import { Resend } from 'resend'

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

// 3 submissions per hour, per IP address.
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  prefix: 'mkv:contact',
  analytics: true,
})

const resend = new Resend(process.env.RESEND_API_KEY)

const TO_EMAIL = 'main@mkvcompany.business'
// Once mkvcompany.business is verified in Resend, this sends from your domain.
const FROM_EMAIL = 'MKV Company <noreply@mkvcompany.business>'

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function submitInquiry(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  // 1. Honeypot — bots fill hidden fields, humans never see them.
  const honeypot = (formData.get('company_url') as string | null)?.trim()
  if (honeypot) {
    // Pretend success so bots don't learn they were caught.
    return { status: 'success' }
  }

  // 2. Rate limit by IP.
  const headerList = await headers()
  const ip =
    headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headerList.get('x-real-ip') ||
    'anonymous'

  const { success } = await ratelimit.limit(ip)
  if (!success) {
    return {
      status: 'error',
      message:
        "You've sent a few messages recently. Please wait a bit before submitting again.",
    }
  }

  // 3. Validate fields.
  const firstName = ((formData.get('firstName') as string) || '').trim()
  const lastName = ((formData.get('lastName') as string) || '').trim()
  const email = ((formData.get('email') as string) || '').trim()
  const company = ((formData.get('company') as string) || '').trim()
  const website = ((formData.get('website') as string) || '').trim()
  const message = ((formData.get('message') as string) || '').trim()

  if (!firstName || !lastName || !email || !message) {
    return {
      status: 'error',
      message: 'Please fill in your name, email, and a short message.',
    }
  }

  if (!isValidEmail(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }

  if (message.length > 5000) {
    return { status: 'error', message: 'That message is a little too long.' }
  }

  // 4. Forward via Resend.
  const fullName = `${firstName} ${lastName}`
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New inquiry from ${fullName}${company ? ` (${company})` : ''}`,
      html: `
        <div style="font-family: system-ui, sans-serif; line-height: 1.6; color: #111;">
          <h2 style="margin-bottom: 4px;">New inquiry via mkvcompany.business</h2>
          <p style="margin: 0 0 16px; color: #666;">Someone reached out through the contact form.</p>
          <table style="border-collapse: collapse; width: 100%; max-width: 560px;">
            <tr><td style="padding: 6px 12px 6px 0; color: #666; vertical-align: top;">Name</td><td style="padding: 6px 0;">${escapeHtml(fullName)}</td></tr>
            <tr><td style="padding: 6px 12px 6px 0; color: #666; vertical-align: top;">Email</td><td style="padding: 6px 0;">${escapeHtml(email)}</td></tr>
            ${company ? `<tr><td style="padding: 6px 12px 6px 0; color: #666; vertical-align: top;">Company</td><td style="padding: 6px 0;">${escapeHtml(company)}</td></tr>` : ''}
            ${website ? `<tr><td style="padding: 6px 12px 6px 0; color: #666; vertical-align: top;">Website</td><td style="padding: 6px 0;">${escapeHtml(website)}</td></tr>` : ''}
          </table>
          <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #eee;">
            <p style="margin: 0 0 6px; color: #666;">Message</p>
            <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
        </div>
      `,
      text: `New inquiry via mkvcompany.business

Name: ${fullName}
Email: ${email}${company ? `\nCompany: ${company}` : ''}${website ? `\nWebsite: ${website}` : ''}

Message:
${message}`,
    })

    if (error) {
      console.log('[v0] Resend error:', error)
      return {
        status: 'error',
        message: 'Something went wrong sending your message. Please try again.',
      }
    }

    // Confirmation auto-reply to the customer. Best-effort — a failure here
    // shouldn't block the successful inbound submission above.
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        replyTo: TO_EMAIL,
        subject: 'Thanks for reaching out to MKV Company',
        html: `
          <div style="font-family: system-ui, sans-serif; line-height: 1.6; color: #111;">
            <h2 style="margin-bottom: 4px;">Thanks, ${escapeHtml(firstName)}.</h2>
            <p style="margin: 0 0 16px; color: #444;">
              We've received your inquiry and a member of the MKV Company team will get back to you within 24&ndash;48 hours to set up an intro call.
            </p>
            <div style="margin: 20px 0; padding: 16px; background: #f6f6f4; border-radius: 8px;">
              <p style="margin: 0 0 6px; color: #666; font-size: 13px;">Here's what you sent us</p>
              <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
            </div>
            <p style="margin: 0 0 4px; color: #444;">
              Need to add something? Just reply to this email.
            </p>
            <p style="margin: 24px 0 0; color: #999; font-size: 13px;">
              — MKV Company · Vision to Visibility
            </p>
          </div>
        `,
        text: `Thanks, ${firstName}.

We've received your inquiry and a member of the MKV Company team will get back to you within 24-48 hours to set up an intro call.

Here's what you sent us:
${message}

Need to add something? Just reply to this email.

— MKV Company · Vision to Visibility`,
      })
    } catch (autoReplyErr) {
      console.log('[v0] Auto-reply failed (non-blocking):', autoReplyErr)
    }
  } catch (err) {
    console.log('[v0] submitInquiry exception:', err)
    return {
      status: 'error',
      message: 'Something went wrong sending your message. Please try again.',
    }
  }

  return { status: 'success' }
}
