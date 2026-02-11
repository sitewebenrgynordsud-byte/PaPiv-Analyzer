import Link from 'next/link';
import Header from '@/components/header';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { ALL_TOOLS } from '@/config/tools';
import { ArrowRight, BrainCircuit } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto py-12 px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
              PaPiv Suite
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              A collection of AI-powered and utility tools to streamline your
              workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/analyzer" className="block">
              <Card className="h-full flex flex-col hover:border-accent hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <BrainCircuit className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-xl">
                      Document Analyzer
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>
                    Upload or paste text to get AI-powered insights, summaries,
                    and sentiment analysis.
                  </CardDescription>
                </CardContent>
                <div className="p-6 pt-0 flex justify-end">
                  <div className="font-semibold text-accent inline-flex items-center gap-1">
                    Launch Analyzer <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Card>
            </Link>

            {ALL_TOOLS.map((tool) => (
              <Link
                href={`/tool/${tool.slug}`}
                key={tool.slug}
                className="block"
              >
                <Card className="h-full flex flex-col hover:border-accent hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">
                      {tool.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription>{tool.description}</CardDescription>
                  </CardContent>
                  <div className="p-6 pt-0 flex justify-end">
                    <div className="font-semibold text-accent inline-flex items-center gap-1">
                      Use Tool <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
