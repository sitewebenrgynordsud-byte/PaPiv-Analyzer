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
import { ArrowRight, Sparkles } from 'lucide-react';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto py-12 px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
              Free Developer Tools — PaPiv Suite
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              A collection of free, instant, and privacy-focused developer
              tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALL_TOOLS.map((tool) => (
              <Link
                href={`/tool/${tool.slug}`}
                key={tool.slug}
                className="block"
                prefetch={false}
                title={`Use the ${tool.title} tool`}
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

        <section className="container mx-auto py-12 px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">
              Premium Resources
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              Level up your development with professional AI toolkits.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <a
              href="https://proworkflowlab.gumroad.com/l/ai-dev-team"
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="block group"
            >
              <Card className="relative overflow-hidden transition-all duration-300 bg-card hover:shadow-2xl border-2 border-transparent hover:border-yellow-400/50">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-yellow-400/0 to-yellow-400/10 opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="p-6 relative">
                  <div className="flex items-center gap-4">
                    <div className="bg-yellow-400/20 p-3 rounded-lg">
                      <Sparkles className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <CardTitle className="font-headline text-2xl text-foreground">
                        The AI Dev-Team
                      </CardTitle>
                      <CardDescription className="text-base">
                        Get 4 Senior AI Agents to autonomously write, debug, and
                        manage your code.
                      </CardDescription>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <div className="font-bold text-lg text-yellow-500 group-hover:text-yellow-400 inline-flex items-center gap-2">
                      Learn More
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Card>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
