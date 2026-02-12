import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { ALL_TOOLS, getToolBySlug } from '@/config/tools';
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
  const tool = getToolBySlug(params.slug);

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
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
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
                Click the &quot;Process&quot; button to run the transformation.
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
