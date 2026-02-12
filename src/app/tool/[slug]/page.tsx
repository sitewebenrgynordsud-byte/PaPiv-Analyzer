import type { Metadata } from 'next';
import { ALL_TOOLS } from '@/config/tools';
import Header from '@/components/header';
import ToolLoader from '@/components/tools/ToolLoader';
import Footer from '@/components/footer';

interface ToolPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return ALL_TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
  const currentSlug = decodeURIComponent(params.slug).toLowerCase();
  const tool = ALL_TOOLS.find((t) => t.slug.toLowerCase() === currentSlug);

  if (!tool) {
    return {
      title: 'Tool not found',
    };
  }

  return {
    title: `${tool.title} - Free Online Tool`,
    description: tool.description,
    alternates: {
      canonical: `https://www.papiv.com/tool/${tool.slug}`,
    },
  };
}

export default function ToolPage({ params }: ToolPageProps) {
  const currentSlug = decodeURIComponent(params.slug).toLowerCase();
  const tool = ALL_TOOLS.find((t) => t.slug.toLowerCase() === currentSlug);

  if (!tool) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1 container mx-auto py-12 px-4 md:px-6">
          <div className="p-8 text-red-500 bg-red-50 border border-red-200 rounded-lg">
            Critical Error: Tool "{params.slug}" not found in registry.
            <br />
            Current Registry Slugs: {ALL_TOOLS.map((t) => t.slug).join(', ')}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    description: tool.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Windows, macOS, Android, iOS, Linux',
    url: `https://www.papiv.com/tool/${tool.slug}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '150',
    },
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
            <h1 className="text-4xl font-bold font-headline">{`${tool.title} - Free Online Tool`}</h1>
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
                    const content = parts.slice(1).join('\n');
                    if (heading.startsWith('What') || heading.startsWith('How') || heading.startsWith('Why')) {
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
