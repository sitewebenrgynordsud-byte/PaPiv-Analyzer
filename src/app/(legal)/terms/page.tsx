import { type Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Read the terms and conditions for using the PaPiv suite of free online tools.',
};

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto py-16 px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight mb-4 text-center">
              Terms of Service
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
              <p>
                Welcome to PaPiv! By accessing and using our website and its
                tools (the "Service"), you agree to be bound by the following
                terms and conditions. If you do not agree with any part of these
                terms, you must not use our Service.
              </p>

              <h2 className="text-2xl font-bold font-headline mt-8 mb-2">
                1. Use of Service
              </h2>
              <p>
                PaPiv provides a collection of free-to-use online tools. You are
                granted a limited, non-exclusive, non-transferable license to
                use the Service for your personal or internal business
                purposes. You agree not to use the service for any illegal
                activities or in any way that could harm the Service or its
                users.
              </p>

              <h2 className="text-2xl font-bold font-headline mt-8 mb-2">
                2. Data Privacy
              </h2>
              <p>
                Our Service is designed to be private. All data processing
                occurs client-side within your browser. We do not store, log, or
                transmit the content you input into our tools. Please see our{' '}
                <a
                  href="/privacy-policy"
                  className="text-accent underline hover:no-underline"
                >
                  Privacy Policy
                </a>{' '}
                for more details. You are solely responsible for the data you
                process.
              </p>

              <h2 className="text-2xl font-bold font-headline mt-8 mb-2">
                3. Disclaimer of Warranties
              </h2>
              <p>
                The Service is provided "as is" and "as available" without any
                warranties of any kind, express or implied. We do not guarantee
                that the Service will be error-free, uninterrupted, or that the
                results obtained from its use will be accurate or reliable. You
                use the Service at your own risk.
              </p>

              <h2 className="text-2xl font-bold font-headline mt-8 mb-2">
                4. Limitation of Liability
              </h2>
              <p>
                In no event shall PaPiv, its owners, or affiliates be liable for
                any direct, indirect, incidental, special, or consequential
                damages resulting from the use or inability to use the Service.
                This includes, but is not limited to, loss of data or loss of
                profits.
              </p>

              <h2 className="text-2xl font-bold font-headline mt-8 mb-2">
                5. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these terms at any time. We will
                notify users by updating the "Last Updated" date on this page.
                Your continued use of the Service after any changes constitutes
                your acceptance of the new terms.
              </p>

              <h2 className="text-2xl font-bold font-headline mt-8 mb-2">
                6. Governing Law
              </h2>
              <p>
                These terms shall be governed by and construed in accordance
                with the laws of the jurisdiction in which the website owner
                resides, without regard to its conflict of law provisions.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
