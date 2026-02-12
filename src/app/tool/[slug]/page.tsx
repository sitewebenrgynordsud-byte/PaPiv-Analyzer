import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

import { ALL_TOOLS, getToolBySlug } from '@/config/tools';
import Header from '@/components/header';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function ToolSkeleton() {
  return (
    <div className="container mx-auto p-4 md:p-8">
        <div className="grid gap-8 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <Skeleton className="h-7 w-24" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-[300px] w-full" />
                    <Skeleton className="h-11 w-full" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <Skeleton className="h-7 w-24" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[300px] w-full" />
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

const ToolInterface = dynamic(
  () => import('@/components/tools/ToolInterface'),
  { ssr: false, loading: () => <ToolSkeleton /> }
);


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
          <ToolInterface tool={tool} />
        </section>
      </main>
    </div>
  );
}
