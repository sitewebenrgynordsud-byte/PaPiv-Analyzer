import type { Metadata } from 'next';
import { ALL_TOOLS } from '@/config/tools';
import Header from '@/components/header';
import ToolLoader from '@/components/tools/ToolLoader';
import Footer from '@/components/footer';
import { notFound, permanentRedirect } from 'next/navigation';

interface ToolPageProps {
  params: {
    slug: string;
  };
}

const LEGACY_REDIRECTS: Record<string, string> = {
  'open-graph-generator': 'og-meta-generator',
};

export async function generateStaticParams() {
  return ALL_TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const currentSlug = decodeURIComponent(params.slug).toLowerCase();
  
  const redirectSlug = LEGACY_REDIRECTS[currentSlug];
  if (redirectSlug) {
    permanentRedirect(`/tool/${redirectSlug}`);
  }

  const tool = ALL_TOOLS.find((t) => t.slug.toLowerCase() === currentSlug);

  if (!tool) {
    notFound();
  }

  const templateLength = 14;
  let title = `${tool.title} - Free Online Tool`;
  if (title.length + templateLength > 60) {
    title = `${tool.title} - Free Tool`;
  }
  if (title.length + templateLength > 60) {
    title = tool.title;
  }

  return {
    title: title,
    description: `Free online ${tool.title.toLowerCase()} — paste your ${tool.inputType} and get instant ${tool.outputType} output. No upload, no server, 100% private.`,
    alternates: {
      canonical: `https://www.papiv.com/tool/${tool.slug}`,
    },
    openGraph: {
      title: `${title} | PaPiv Suite`,
      description: tool.description,
      url: `https://www.papiv.com/tool/${tool.slug}`,
      siteName: 'PaPiv Suite',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://www.papiv.com/og-image.png',
          width: 1200,
          height: 630,
          alt: `${tool.title} on PaPiv Suite`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | PaPiv Suite`,
      description: tool.description,
      images: ['https://www.papiv.com/og-image.png'],
    },
  };
}

export default function ToolPage({ params }: ToolPageProps) {
  const currentSlug = decodeURIComponent(params.slug).toLowerCase();

  const redirectSlug = LEGACY_REDIRECTS[currentSlug];
  if (redirectSlug) {
    permanentRedirect(`/tool/${redirectSlug}`);
  }

  const tool = ALL_TOOLS.find((t) => t.slug.toLowerCase() === currentSlug);

  if (!tool) {
    notFound();
  }

  const title = `${tool.title} - Free Online Tool`;

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: title,
    description: tool.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Windows, macOS, Android, iOS, Linux',
    url: `https://www.papiv.com/tool/${tool.slug}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How does the ${tool.title} work?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Using the ${tool.title} is simple. Just paste your ${tool.inputType} content into the input area provided. The tool will instantly process your data in real-time, and the converted ${tool.outputType} result will appear in the output box. No clicks needed!`,
        },
      },
      {
        '@type': 'Question',
        name: 'Is this tool free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, the ${tool.title} is completely free to use. PaPiv is committed to providing a suite of powerful, open-source tools for developers and professionals without any cost or subscriptions.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Is my data secure when using this tool?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Absolutely. Your privacy and security are our top priorities. All data processing for the ${tool.title} happens entirely within your browser (client-side). Your information is never sent to or stored on our servers, ensuring it remains 100% private.`,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <section className="container mx-auto py-8 px-4 md:px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-headline">{title}</h1>
            <p className="text-lg text-muted-foreground mt-2">
              {tool.description}
            </p>
          </div>
          <ToolLoader tool={tool} />
        </section>

        <section className="container mx-auto py-12 px-4 md:px-6">
          <div className="max-w-3xl mx-auto bg-card border rounded-lg p-8">
            <div className="prose prose-stone dark:prose-invert max-w-none text-foreground/80 leading-relaxed space-y-4">
                {tool.longDescription.split('\n\n').map((paragraph, index) => {
                    const parts = paragraph.split('\n');
                    const heading = parts[0];
                    if (heading.startsWith('What') || heading.startsWith('How') || heading.startsWith('Why') || heading.startsWith('Common')) {
                       const content = parts.slice(1).join('\n');
                       return (
                         <div key={index}>
                           <h2 className="text-2xl font-bold font-headline mt-6 mb-2 text-foreground">{heading}</h2>
                           <p>{content}</p>
                         </div>
                       )
                    }
                    return <p key={index}>{paragraph}</p>
                })}
            </div>
            {tool.externalReferences && tool.externalReferences.length > 0 && (
                <div className="mt-8 pt-6 border-t">
                    <h3 className="text-xl font-bold font-headline mb-4 text-foreground">Technical References</h3>
                    <ul className="list-disc list-inside space-y-2 text-foreground/80">
                        {tool.externalReferences.map((ref, i) => (
                            <li key={i}>
                                <a href={ref.href} target="_blank" rel="noopener noreferrer" className="text-accent underline hover:no-underline">
                                    {ref.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* BRAND ALIGNMENT FOOTNOTE */}
            <div className="mt-8 pt-6 border-t border-border/60 text-sm text-muted-foreground">
              <p>
                This <strong>{tool.title}</strong> is a <strong>free online tool</strong> hosted on <strong>PaPiv Suite</strong>. 
                Like all utilities in our developer portal, this converter executes 100% client-side in your browser. 
                No inputs or parameters are sent to external servers, providing an instant, private, and secure experience for all your development tasks.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
