'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Download,
  Frown,
  Loader2,
  Meh,
  Quote,
  ScanSearch,
  Smile,
  Sparkles,
  FileText,
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { type AnalysisResult, analyzeDocumentAction } from '@/app/actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  documentContent: z
    .string()
    .min(200, { message: 'Document must be at least 200 characters.' })
    .max(50000, { message: 'Document must not exceed 50,000 characters.' }),
});

const SENTIMENT_MAP = {
  positive: {
    label: 'Positive',
    icon: Smile,
    color: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    borderColor: 'border-green-200 dark:border-green-800',
  },
  negative: {
    label: 'Negative',
    icon: Frown,
    color: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    borderColor: 'border-red-200 dark:border-red-800',
  },
  neutral: {
    label: 'Neutral',
    icon: Meh,
    color: 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300',
    borderColor: 'border-gray-200 dark:border-gray-600',
  },
};

export default function Analyzer() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      documentContent: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeDocumentAction(values.documentContent);
      setAnalysisResult(result);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description:
          error instanceof Error ? error.message : 'An unknown error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleDownloadReport = () => {
    if (!analysisResult?.report) return;

    const blob = new Blob([analysisResult.report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'papiv-analysis-report.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              Document Input
            </CardTitle>
            <CardDescription>
              Paste your document content below to begin the analysis.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="documentContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">
                        Document Content
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Paste your document content here... (min 200 characters)"
                          className="min-h-[400px] resize-y"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <ScanSearch />
                  )}
                  <span>{isLoading ? 'Analyzing...' : 'Analyze Document'}</span>
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {isLoading && <AnalysisSkeleton />}
          {!isLoading && analysisResult && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <Sparkles className="text-accent" />
                    Executive Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 leading-relaxed">
                    {analysisResult.summary}
                  </p>
                </CardContent>
              </Card>

              <div className="grid gap-8 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">
                      Sentiment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const sentimentDetails =
                        SENTIMENT_MAP[analysisResult.sentiment.sentiment];
                      const SentimentIcon = sentimentDetails.icon;
                      return (
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-full ${sentimentDetails.color}`}
                          >
                            <SentimentIcon className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-semibold text-lg">
                              {sentimentDetails.label}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Confidence:{' '}
                              {(
                                analysisResult.sentiment.confidence * 100
                              ).toFixed(0)}
                              %
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
                <Card className="flex flex-col justify-center">
                  <CardContent className="pt-6">
                    <Button
                      onClick={handleDownloadReport}
                      className="w-full"
                      variant="outline"
                    >
                      <Download />
                      Download Full Report
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">
                    Key Sentences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {analysisResult.highlights.map((sentence, index) => (
                      <li key={index} className="flex gap-3">
                        <Quote className="h-5 w-5 shrink-0 text-accent mt-1" />
                        <span className="text-foreground/80">
                          {sentence}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          )}
          {!isLoading && !analysisResult && (
            <Card className="flex flex-col items-center justify-center min-h-[400px] border-dashed">
              <CardContent className="text-center">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium text-muted-foreground">
                  Your analysis results will appear here
                </h3>
                <p className="mt-1 text-sm text-muted-foreground/80">
                  Paste your document on the left to get started.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function AnalysisSkeleton() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-1/3" />
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 flex items-center justify-center h-full">
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/3" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
