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
      </main>
    </div>
  );
}
