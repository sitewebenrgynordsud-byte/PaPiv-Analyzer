import { type Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    "Understand how PaPiv handles your data. Spoiler: We don't store it. All processing is done client-side in your browser.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto py-16 px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight mb-4 text-center">
              Privacy Policy
            </h1>
            <p className="text-center text-muted-foreground mb-8">
              Last Updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <div className="text-lg text-foreground/80 leading-relaxed space-y-6">
              <h2 className="text-2xl font-bold font-headline mt-8 mb-2">
                The Short Version
              </h2>
              <p>
                We do not collect, store, or transmit any data you paste into
                our tools. All processing happens exclusively within your
                browser (client-side). Your data is your own.
              </p>

              <h2 className="text-2xl font-bold font-headline mt-8 mb-2">
                Information We Do Not Collect
              </h2>
              <p>
                PaPiv operates on a principle of "privacy by design." When you
                use our text and data manipulation tools, the information you
                provide is processed in real-time on your computer. It is never
                sent to, stored on, or passed through our servers.
              </p>
              <p>
                This means we have absolutely no access to the content you are
                working with. We do not use cookies for tracking personal data,
                and we do not require user accounts.
              </p>

              <h2 className="text-2xl font-bold font-headline mt-8 mb-2">
                Information We Do Collect
              </h2>
              <p>
                For the purpose of improving our website and services, we may
                use privacy-respecting analytics tools to collect anonymous,
                aggregate usage data. This data is non-personal and may
                include:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>The type of tool used (e.g., "JSON to CSV").</li>
                <li>Browser type and version.</li>
                <li>Country of access (no specific location data).</li>
              </ul>
              <p>
                This information helps us understand which tools are most
                popular and how we can improve the user experience. It cannot
                be used to identify you or the specific data you have
                processed.
              </p>

              <h2 className="text-2xl font-bold font-headline mt-8 mb-2">
                Third-Party Services
              </h2>
              <p>
                We do not integrate with any third-party services that would
                compromise your privacy. Our hosting provider may log standard
                server access information for security and debugging, but this
                does not include the content you input into our tools.
              </p>

              <h2 className="text-2xl font-bold font-headline mt-8 mb-2">
                Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Any
                changes will be posted on this page. We encourage you to review
                this policy periodically.
              </p>

              <h2 className="text-2xl font-bold font-headline mt-8 mb-2">
                Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please feel
                free to contact us through any available channels on our
                website.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
