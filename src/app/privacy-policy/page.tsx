// app/privacy-policy/page.tsx

import Navbar from "../Components/Navbar";

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">

      <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: 23/07/2025</p>

      <p className="mb-6">
        At Vinelier, we care about your privacy. This Privacy Policy explains how we collect, use,
        and protect your information when you use our website and services.
      </p>

      <p className="mb-6">
        By using Vinelier, you agree to the practices described in this policy.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">1. What Information We Collect</h2>
        <p className="mb-2 font-medium">a) Information You Provide:</p>
        <ul className="list-disc list-inside mb-2">
          <li>Email address (when signing up or subscribing)</li>
          <li>Feedback or messages you send us</li>
        </ul>
        <p className="mb-2 font-medium">b) Information We Collect Automatically:</p>
        <ul className="list-disc list-inside">
          <li>Device and browser type</li>
          <li>IP address</li>
          <li>Cookies and tracking technologies (e.g. page visits, referring URLs)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
        <p className="mb-2">We use your data to:</p>
        <ul className="list-disc list-inside">
          <li>Improve our product and services</li>
          <li>Send occasional updates or announcements</li>
          <li>Respond to your questions or support requests</li>
          <li>Ensure platform security and performance</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">3. How We Share Your Information</h2>
        <p className="mb-2">We do not sell your personal information.</p>
        <p className="mb-2">We may share data with:</p>
        <ul className="list-disc list-inside">
          <li>Service providers (e.g., hosting, analytics tools like Google Analytics)</li>
          <li>Legal authorities when required by law</li>
          <li>Business partners (in anonymized or aggregated form only)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">4. Your Rights</h2>
        <p className="mb-2">
          Under GDPR (if you're in the EU), you have the right to:
        </p>
        <ul className="list-disc list-inside">
          <li>Access your data</li>
          <li>Correct inaccurate data</li>
          <li>Delete your data ("right to be forgotten")</li>
          <li>Withdraw consent at any time</li>
          <li>Request data portability</li>
        </ul>
        <p className="mt-2">
          To exercise these rights, email us at{" "}
          <a href="mailto:partners@vinelier.com" className="text-blue-600 underline">
            partners@vinelier.com
          </a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">5. Cookies</h2>
        <p className="mb-2">We use cookies to:</p>
        <ul className="list-disc list-inside">
          <li>Remember your preferences</li>
          <li>Analyze website traffic</li>
          <li>Improve functionality</li>
        </ul>
        <p className="mt-2">
          You can disable cookies in your browser settings, though some features may not work properly.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">6. Data Storage and Security</h2>
        <p>
          We store your data securely using trusted providers. While no system is 100% secure, we
          take appropriate measures to protect your information from unauthorized access,
          alteration, or loss.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">7. Third-Party Links</h2>
        <p>
          Vinelier may contain links to third-party websites or platforms (e.g., our socials). We
          are not responsible for their privacy practices. Please read their privacy policies
          separately.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be reflected on this
          page, with the last updated effective date.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">9. Contact Us</h2>
        <p>
          Thank you for trusting us. If you have any questions or concerns, contact us at{" "}
          <a href="mailto:partners@vinelier.com" className="text-blue-600 underline">
            partners@vinelier.com
          </a>
        </p>
      </section>
    </main>
  );
}
