import type { Metadata } from 'next';

import { ALL_TOOLS } from '@/config/tools';
import Header from '@/components/header';
import ToolLoader from '@/components/tools/ToolLoader';

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
    title: `${tool.title} | PaPiv Tools`,
    description: tool.description,
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
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto py-8 px-4 md:px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-headline">{tool.title}</h1>
            <p className="text-lg text-muted-foreground mt-2">
              {tool.description}
            </p>
          </div>
          <ToolLoader tool={tool} />
        </section>

        <section className="container mx-auto py-12 px-4 md:px-6">
          <div className="max-w-3xl mx-auto bg-card border rounded-lg p-8">
            <h2 className="text-3xl font-bold font-headline mb-4">
              About the {tool.title}
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              The best free online {tool.title} to handle your {tool.inputType}{' '}
              tasks. Our tool is designed for developers, data analysts, and
              anyone who needs a quick and reliable way to work with{' '}
              {tool.inputType} data.
            </p>
            <h3 className="text-2xl font-bold font-headline mb-4">
              How to use?
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>
                Paste your {tool.inputType} content into the input area.
              </li>
              <li>
                The result will appear instantly as you type.
              </li>
              <li>
                Copy your generated {tool.outputType} from the output area.
              </li>
            </ol>
          </div>
        </section>
      </main>
    </div>
  );
}
