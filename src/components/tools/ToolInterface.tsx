'use client';

import { useState, useEffect } from 'react';
import {
  Copy,
  Trash,
  Terminal,
  Check,
  Share2,
  ArrowRight,
  History,
  Clock,
  Link2,
  Download,
  ArrowUp,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { formatDistanceToNow } from 'date-fns';
import { sendGAEvent } from '@next/third-parties/google';

import { ALL_TOOLS, type ToolConfig } from '@/config/tools';
import { processText } from '@/lib/processor';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface ToolInterfaceProps {
  tool: ToolConfig;
}

interface HistoryItem {
  id: string;
  toolSlug: string;
  input: string;
  output: string | { [key: string]: string | number };
  timestamp: number;
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card>
      <CardHeader className="p-4">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl md:text-3xl">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default function ToolInterface({ tool }: ToolInterfaceProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [stats, setStats] = useState<{ [key: string]: string | number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const { toast } = useToast();
  const [relatedTools, setRelatedTools] = useState<ToolConfig[]>([]);
  const [currentUrl, setCurrentUrl] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkScrollTop = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);

    if (window.location.hash) {
      try {
        const hash = window.location.hash.substring(1);
        const decoded = atob(decodeURIComponent(hash));
        const data = JSON.parse(decoded);
        if (data.input && data.toolSlug === tool.slug) {
          setInput(data.input);
          toast({ title: 'Content loaded from shared link!' });
        }
      } catch (e) {
        console.error('Failed to parse shared link data:', e);
      } finally {
        window.history.replaceState(
          null,
          '',
          window.location.pathname + window.location.search
        );
      }
    }

    try {
      const storedHistory = localStorage.getItem('papiv-history');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error('Failed to load history from localStorage', e);
    }

    setCurrentUrl(window.location.origin + window.location.pathname);

    // Smart related tools logic
    const sameCategoryTools = ALL_TOOLS.filter(
      (t) => t.category === tool.category && t.slug !== tool.slug
    );
    const otherCategoryTools = ALL_TOOLS.filter(
      (t) => t.category !== tool.category && t.slug !== tool.slug
    );

    const shuffle = (array: ToolConfig[]) =>
      array.sort(() => 0.5 - Math.random());

    const shuffledSame = shuffle(sameCategoryTools);
    const shuffledOthers = shuffle(otherCategoryTools);

    const combinedTools = [...shuffledSame, ...shuffledOthers];
    const uniqueTools = Array.from(
      new Set(combinedTools.map((t) => t.slug))
    ).map((slug) => combinedTools.find((t) => t.slug === slug)!);

    setRelatedTools(uniqueTools.slice(0, 3));
    
    return () => window.removeEventListener('scroll', checkScrollTop);

  }, [tool.slug, tool.category, toast]);

  useEffect(() => {
    if (!mounted) return;

    // Immediately clear previous output and error states to reset to neutral.
    setError(null);
    setOutput('');
    setStats(null);

    const handler = setTimeout(() => {
      if (input.trim() === '' && tool.slug !== 'lorem-ipsum-generator' && tool.slug !== 'random-password-generator' && tool.slug !== 'uuid-generator' && tool.slug !== 'robots-txt-generator') {
        return;
      }

      try {
        const result = processText(tool.slug, input);
        if (
          result.startsWith('Error:') ||
          result.startsWith('❌') ||
          result.startsWith('⚠️') ||
          result.startsWith('Invalid JSON')
        ) {
          setError(result);
        } else {
          let processedOutput: string | object;
          if (tool.slug === 'text-statistics') {
            const parsedStats = JSON.parse(result);
            setStats(parsedStats);
            processedOutput = parsedStats;
          } else {
            setOutput(result);
            processedOutput = result;
          }

          if (input.trim() !== '') {
            const newEntry: HistoryItem = {
              id: new Date().toISOString() + Math.random(),
              toolSlug: tool.slug,
              input,
              output: processedOutput,
              timestamp: Date.now(),
            };

            sendGAEvent('tool_used', {
              tool_slug: tool.slug,
              category: tool.category,
            });

            setHistory((prevHistory) => {
              const updatedHistory = [
                newEntry,
                ...prevHistory.filter((item) => item.input !== input),
              ].slice(0, 5);
              try {
                localStorage.setItem(
                  'papiv-history',
                  JSON.stringify(updatedHistory)
                );
              } catch (e) {
                console.error('Failed to save history to localStorage', e);
              }
              return updatedHistory;
            });
          }
        }
      } catch (e) {
        const errorMessage =
          e instanceof Error ? e.message : 'An unknown processing error occurred.';
        setError(`Error processing data. ${errorMessage}`);
      }
    }, 800);

    return () => {
      clearTimeout(handler);
    };
  }, [input, tool.slug, mounted]);

  const handleCopy = () => {
    let contentToCopy = '';
    if (tool.slug === 'text-statistics') {
      if (stats) {
        contentToCopy = `Words: ${stats.words}\nCharacters: ${stats.characters}\nLines: ${stats.lines}\nReading Time: ~${stats.readingTime} min`;
      }
    } else {
      contentToCopy = output;
    }

    if (!contentToCopy || isCopied) return;

    navigator.clipboard.writeText(contentToCopy);
    toast({
      title: 'Copied to clipboard!',
    });
    setIsCopied(true);
    sendGAEvent('copy_output', {
      tool_slug: tool.slug,
      category: tool.category,
    });
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  
  const handleDownload = () => {
    let contentToDownload = '';
    let fileExtension = 'txt';
    let mimeType = 'text/plain';

    if (tool.slug === 'text-statistics') {
        if (stats) {
            contentToDownload = `Words: ${stats.words}\nCharacters: ${stats.characters}\nLines: ${stats.lines}\nReading Time: ~${stats.readingTime} min`;
        }
    } else if (tool.slug === 'json-to-csv') {
        contentToDownload = output;
        fileExtension = 'csv';
        mimeType = 'text/csv';
    } else {
        contentToDownload = output;
    }

    if (!contentToDownload) {
        toast({
            variant: 'destructive',
            title: 'Nothing to download',
            description: 'Please generate some output first.',
        });
        return;
    }

    const blob = new Blob([contentToDownload], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `papiv-${tool.slug}-${Date.now()}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
        title: 'Download started!',
    });
  };

  const handleShare = async () => {
    if (isShared || !currentUrl) return;

    const shareData = {
      title: tool.title,
      text: tool.description,
      url: currentUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: 'Tool shared!',
        });
      } else {
        throw new Error('Web Share API not supported');
      }
    } catch (err) {
      navigator.clipboard.writeText(currentUrl);
      toast({
        title: 'Link Copied!',
        description: 'Share it with your friends and colleagues.',
      });
    }

    setIsShared(true);
    setTimeout(() => {
      setIsShared(false);
    }, 2000);
  };

  const handleShareWithInput = () => {
    if (!input) {
      toast({
        variant: 'destructive',
        title: 'Input is empty',
        description: 'Please provide some input to share.',
      });
      return;
    }
    const data = { input, toolSlug: tool.slug };
    const hash = btoa(JSON.stringify(data));
    const url = `${currentUrl}#${encodeURIComponent(hash)}`;
    navigator.clipboard.writeText(url);
    toast({
      title: 'Shareable link copied!',
      description: 'The link with your input has been copied to your clipboard.',
    });
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setStats(null);
    setError(null);
  };

  const handleRestoreFromHistory = (item: HistoryItem) => {
    if (item.toolSlug === tool.slug) {
      setInput(item.input);
      toast({ title: 'Restored from history!' });
    } else {
      const data = { input: item.input, toolSlug: item.toolSlug };
      const hash = btoa(JSON.stringify(data));
      router.push(`/tool/${item.toolSlug}#${encodeURIComponent(hash)}`);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('papiv-history');
    } catch (e) {
      console.error('Failed to clear history from localStorage', e);
    }
    toast({ title: 'History cleared!' });
  };

  if (!mounted) {
    return null;
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto p-4 md:p-8">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="capitalize">Input: {tool.inputType}</CardTitle>
              {input && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClear}
                  aria-label="Clear input"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="input-textarea" className="sr-only">
                  Your {tool.inputType} input
                </Label>
                <Textarea
                  id="input-textarea"
                  placeholder={tool.slug === 'lorem-ipsum-generator' ? 'Enter number of paragraphs (e.g., 3)' : `Paste your ${tool.inputType} here...`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[300px] resize-y font-mono"
                  autoFocus
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="capitalize">
                Output: {tool.outputType}
              </CardTitle>
              <div className="flex items-center gap-1">
                <Badge variant="outline">{tool.category}</Badge>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleShareWithInput}
                      aria-label="Share with input"
                    >
                      <Link2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy link with input</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleShare}
                      aria-label="Share this tool"
                      disabled={isShared}
                    >
                      {isShared ? (
                        <Check className="h-4 w-4 text-accent" />
                      ) : (
                        <Share2 className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share tool</p>
                  </TooltipContent>
                </Tooltip>
                {(output || stats) && (
                  <>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleDownload}
                          aria-label="Download output"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Download as file</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleCopy}
                          aria-label="Copy output"
                          disabled={isCopied}
                        >
                          {isCopied ? (
                            <Check className="h-4 w-4 text-accent" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy output</p>
                      </TooltipContent>
                    </Tooltip>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {error.replace(/^(Error:|❌|⚠️)\s*/, '')}
                  </AlertDescription>
                </Alert>
              )}
              <div className="min-h-[300px]">
                {tool.slug === 'text-statistics' ? (
                  <div className="h-full">
                    {!stats && !error ? (
                      <div className="flex h-full items-center justify-center rounded-md bg-muted text-muted-foreground">
                        <p>Waiting for input...</p>
                      </div>
                    ) : (
                      stats && (
                        <div className="grid grid-cols-2 gap-4">
                          <StatCard title="Words" value={stats.words} />
                          <StatCard
                            title="Characters"
                            value={stats.characters}
                          />
                          <StatCard title="Lines" value={stats.lines} />
                          <StatCard
                            title="Reading Time"
                            value={`~${stats.readingTime} min`}
                          />
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <Textarea
                    id="output-textarea"
                    readOnly
                    value={output}
                    className="min-h-[300px] resize-y bg-muted font-mono whitespace-pre-wrap"
                    placeholder={!error ? "Waiting for input..." : ""}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-16 space-y-16">
          {history.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold font-headline text-center mb-8">
                Recent Activity
              </h2>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">History</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearHistory}
                  >
                    <Trash className="mr-2 h-4 w-4" /> Clear All
                  </Button>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {history.map((item) => (
                      <li key={item.id}>
                        <Button
                          variant="ghost"
                          className="flex h-auto w-full items-center justify-start gap-4 text-left"
                          onClick={() => handleRestoreFromHistory(item)}
                        >
                          <History className="h-5 w-5 shrink-0 text-muted-foreground" />
                          <div className="flex-grow overflow-hidden">
                            <p className="font-mono text-sm truncate">
                              {item.input}
                            </p>
                            <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                              <Badge variant="secondary">{item.toolSlug.replace(/-/g, ' ')}</Badge>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatDistanceToNow(new Date(item.timestamp), {
                                  addSuffix: true,
                                })}
                              </div>
                            </div>
                          </div>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}

          {relatedTools.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold font-headline text-center mb-8">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedTools.map((relatedTool) => (
                  <Card
                    key={relatedTool.slug}
                    className="h-full flex flex-col hover:border-accent transition-shadow duration-300 shadow-sm hover:shadow-lg"
                  >
                    <CardHeader>
                      <CardTitle className="font-headline text-lg">
                        <Link
                          href={`/tool/${relatedTool.slug}`}
                          prefetch={false}
                          title={`Try our ${relatedTool.title} tool`}
                          className="hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded-sm"
                        >
                          {relatedTool.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground">
                        {relatedTool.description}
                      </p>
                    </CardContent>
                    <div className="p-6 pt-0">
                      <Link
                        href={`/tool/${relatedTool.slug}`}
                        prefetch={false}
                        title={`Try our ${relatedTool.title} tool`}
                        className="font-semibold text-accent inline-flex items-center gap-1 group"
                      >
                        Try our {relatedTool.title}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {showScrollTop && (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="fixed bottom-8 right-8 z-50 rounded-full shadow-lg"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="h-5 w-5" />
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Scroll to top</p>
            </TooltipContent>
        </Tooltip>
    )}
    </TooltipProvider>
  );
}
