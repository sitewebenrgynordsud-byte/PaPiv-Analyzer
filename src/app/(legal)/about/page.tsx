import { type Metadata } from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'About PaPiv',
  description:
    'Learn about the mission and vision behind PaPiv, your free suite of online tools for developers and data analysts.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto py-16 px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight mb-4 text-center">
              About PaPiv
            </h1>
            <p className="text-xl text-muted-foreground mb-12 text-center">
              Pivot your paper. Transform your text.
            </p>
            <div className="text-lg text-foreground/80 leading-relaxed space-y-6">
              <p>
                The name "PaPiv" is short for "Paper Pivot". Our mission is
                simple: to provide a powerful, free, and instantly accessible
                suite of online tools for developers, data analysts, writers,
                and anyone who works with digital text and data. In a world of
                bloated software and expensive subscriptions, we believe
                fundamental utilities should be fast, reliable, and available
                to everyone.
              </p>
              <p>
                Every tool on this platform is built with three core principles
                in mind:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>
                  <strong className="font-semibold">Speed:</strong> Our tools
                  run entirely in your browser. There are no server uploads, no
                  waiting times. Your data is processed instantly, as you type.
                </li>
                <li>
                  <strong className="font-semibold">Privacy:</strong> We respect
                  your data. Since everything is processed on your machine
                  (client-side), your information never touches our servers. What
                  you paste is your business, and your business alone.
                </li>
                <li>
                  <strong className="font-semibold">Simplicity:</strong> We
                  focus on clean, intuitive interfaces that do one job and do it
                  well. No clutter, no distractions—just the functionality you
                  need.
                </li>
              </ul>
              <p>
                Whether you're converting JSON to CSV, generating URL slugs, or
                analyzing text statistics, PaPiv is designed to be a seamless
                part of your workflow. We're constantly working on improving our
                existing tools and adding new ones based on user feedback.
              </p>
              <p>
                Thank you for using PaPiv. We hope our tools help you work a
                little smarter and a little faster.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
