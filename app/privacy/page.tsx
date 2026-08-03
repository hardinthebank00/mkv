import type { Metadata } from 'next'
import { LegalPage, LegalSection } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How MKV Company collects, uses, and protects information when you visit our website.',
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="Protecting your personal information"
      updated="February 2026"
    >
      <LegalSection heading="Information we collect">
        <p>
          We collect no personal information about you unless you choose to provide that
          information to us.
        </p>
        <p>
          We do not use techniques that collect personal information about you without your
          knowledge.
        </p>
      </LegalSection>

      <LegalSection heading="How we use non-personal information">
        <p>
          Our site&apos;s operating system may automatically record some general information
          about your visit, such as:
        </p>
        <ul className="ml-5 flex list-disc flex-col gap-2">
          <li>
            The Internet domain for your Internet service provider, such as
            &quot;company.com&quot; or &quot;service.ca&quot; and the IP address of the
            computer accessing the website, such as &quot;ppp-55&quot;
          </li>
          <li>
            The type of browser (such as &quot;Safari version x&quot; or &quot;Internet
            Explorer version x&quot;) you are using
          </li>
          <li>
            The type of operating system you are using (such as Macintosh, Unix, or Windows)
          </li>
          <li>
            The date and time you visit our site and the web pages that you visit on our
            site, along with the address of the previous website you were visiting, if you
            linked to us from another website.
          </li>
        </ul>
        <p>
          We use this information for statistical analysis to help us make our site more
          useful to users. We may disclose this non-personal information to third parties
          such as suppliers, clients or advertisers and/or use it for auditing purposes. This
          tracking system does not record personal information about individuals or link this
          information to any personal data collected.
        </p>
        <p>
          We may use &quot;cookies&quot; that identify you as a return visitor. A cookie is a
          piece of data that a website can send to your browser, which may then store the
          cookie on your hard drive. So, when you come back to visit us again, we can tailor
          information to suit your individual preferences. The goal is to save you time and
          provide you with a more meaningful visit and to measure website activity. Cookies
          do not contain any personally identifying information. Browsers allow you to disable
          cookie collection if you wish, or inform you when a cookie is being stored on your
          hard drive.
        </p>
      </LegalSection>

      <LegalSection heading="What about spam?">
        <p>
          You will not receive marketing e-mail from MKV Company unless you have consented to
          receive it. From time to time we may use e-mail as a way to keep in touch with our
          existing customers and other interested individuals. However, we do not send
          &quot;spam&quot; (unsolicited marketing e-mail).
        </p>
        <p>
          If you agree to receive e-mail communications from us, every e-mail message we send
          you will include an e-mail address to which you can respond. If at any time you
          decide you do not want to receive marketing e-mail from us, simply let us know and
          we will remove your name and e-mail address from our marketing lists. We will do the
          same with your mailing address and telephone number on request.
        </p>
      </LegalSection>

      <LegalSection heading="When you leave this site">
        <p>
          This policy discloses the privacy practices for our website. However, our site
          contains links to other sites. Once you link to another site, you are subject to
          the privacy and security policies of the new site. We encourage you to read the
          privacy policies of all websites you visit, especially if you share any personal
          information.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
