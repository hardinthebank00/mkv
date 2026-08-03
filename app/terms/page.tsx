import type { Metadata } from 'next'
import { LegalPage, LegalSection } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms that govern your use of MKV Company services and website.',
}

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      subtitle="Please read these terms carefully before using our services"
      updated="February 2026"
      index="t01"
    >
      <LegalSection heading="Agreement to Terms">
        <p>
          By accessing or using MKV Company&apos;s services, you agree to be bound by these
          Terms of Service and all applicable laws and regulations. If you do not agree with
          any of these terms, you are prohibited from using or accessing our services.
        </p>
      </LegalSection>

      <LegalSection heading="Services Description">
        <p>
          MKV Company provides direct-to-consumer e-commerce services including but not
          limited to store development, paid media, retention and email marketing, branding,
          and AI-driven automation. The scope of services will be defined in individual
          service agreements or proposals.
        </p>
      </LegalSection>

      <LegalSection heading="Client Responsibilities">
        <p>As a client, you agree to:</p>
        <ul className="ml-5 flex list-disc flex-col gap-2">
          <li>Provide accurate and complete information necessary for service delivery</li>
          <li>Respond to requests for information or approval in a timely manner</li>
          <li>Ensure you have the legal right to use all materials provided to us</li>
          <li>Make payments according to agreed-upon terms and schedules</li>
          <li>Provide constructive feedback to facilitate project completion</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Payment Terms">
        <p>
          Payment terms will be specified in individual service agreements. Unless otherwise
          stated, invoices are due within 30 days of issuance. Late payments may incur
          interest charges at a rate of 1.5% per month or the maximum rate permitted by law,
          whichever is lower. We reserve the right to suspend services for accounts with
          overdue balances.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual Property">
        <p>
          Upon full payment, you will own the rights to the final deliverables created
          specifically for your project. However:
        </p>
        <ul className="ml-5 flex list-disc flex-col gap-2">
          <li>
            MKV Company retains ownership of all preliminary concepts, drafts, and working
            files
          </li>
          <li>
            We reserve the right to showcase completed work in our portfolio unless otherwise
            agreed
          </li>
          <li>Any pre-existing materials, templates, or tools used remain our property</li>
          <li>
            Third-party assets (stock photos, fonts, etc.) are subject to their respective
            licenses
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Project Timeline and Revisions">
        <p>
          Project timelines are estimates based on the scope of work and client
          responsiveness. Delays caused by late feedback or additional requests may extend
          delivery dates. Revision rounds will be specified in service agreements. Additional
          revisions beyond the agreed scope may incur extra charges.
        </p>
      </LegalSection>

      <LegalSection heading="Termination">
        <p>
          Either party may terminate services with written notice. Upon termination, the
          client is responsible for payment of all work completed to date. MKV Company will
          provide all completed deliverables upon receipt of final payment. Refunds are
          handled on a case-by-case basis and are not guaranteed.
        </p>
      </LegalSection>

      <LegalSection heading="Confidentiality">
        <p>
          We respect the confidentiality of your business information and will not disclose
          sensitive information to third parties without your consent, except as required by
          law or necessary to fulfill our services (e.g., sharing information with approved
          contractors or platforms).
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of Liability">
        <p>
          MKV Company shall not be liable for any indirect, incidental, special, or
          consequential damages arising from the use of our services. Our total liability
          shall not exceed the amount paid for the specific service giving rise to the claim.
          We do not guarantee specific results from marketing campaigns, as outcomes depend
          on various factors beyond our control.
        </p>
      </LegalSection>

      <LegalSection heading="Warranties and Disclaimers">
        <p>
          We warrant that services will be performed with reasonable skill and care. However,
          we make no guarantees regarding specific outcomes, search engine rankings, social
          media engagement, or sales results. All services are provided &quot;as is&quot;
          without warranties of any kind, express or implied.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to Terms">
        <p>
          MKV Company reserves the right to modify these terms at any time. Changes will be
          effective immediately upon posting to our website. Continued use of our services
          after changes constitutes acceptance of the modified terms.
        </p>
      </LegalSection>

      <LegalSection heading="Governing Law">
        <p>
          These terms shall be governed by and construed in accordance with the laws of the
          jurisdiction in which MKV Company operates, without regard to conflict of law
          principles.
        </p>
      </LegalSection>

      <LegalSection heading="Contact Information">
        <p>If you have any questions about these Terms of Service, please contact us at:</p>
        <p>
          Email:{' '}
          <a
            href="mailto:contact@mkvcompany.business"
            className="text-primary transition-colors hover:underline"
          >
            contact@mkvcompany.business
          </a>
        </p>
      </LegalSection>
    </LegalPage>
  )
}
