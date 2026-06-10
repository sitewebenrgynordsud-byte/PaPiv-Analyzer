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
  FileText,
  Code,
  Sparkles,
  RefreshCw,
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
    <Card className="relative overflow-hidden border border-border/60 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardHeader className="p-5">
        <CardDescription className="text-xs uppercase tracking-wider font-semibold text-muted-foreground/80">{title}</CardDescription>
        <CardTitle className="text-2xl md:text-3xl font-bold font-headline mt-1 text-foreground tracking-tight">{value}</CardTitle>
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
  const [isProcessing, setIsProcessing] = useState(false);

  // Live input & output statistics calculation
  const inputCharCount = input.length;
  const inputLineCount = input ? input.split('\n').length : 0;
  const outputCharCount = output.length;
  const outputLineCount = output ? output.split('\n').length : 0;

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

    const urlParams = new URLSearchParams(window.location.search);
    const textParam = urlParams.get('text');

    if (textParam) {
      try {
        const decodedText = decodeURIComponent(textParam);
        setInput(decodedText);
        toast({ title: 'Content loaded from URL!' });
      } catch (e) {
        console.error('Failed to parse URL parameter:', e);
        toast({ variant: 'destructive', title: 'Error loading from URL', description: 'The provided URL content seems to be corrupted.' });
      } finally {
        router.replace(window.location.pathname, { scroll: false });
      }
    } else if (window.location.hash) {
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
        router.replace(window.location.pathname, { scroll: false });
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

  }, [tool.slug, tool.category, toast, router]);

  useEffect(() => {
    if (!mounted) return;

    setError(null);
    setOutput('');
    setStats(null);
    setIsProcessing(true);

    const handler = setTimeout(() => {
      const currentPath = window.location.pathname;
      if (input.length > 0 && input.length < 2000) {
        const params = new URLSearchParams();
        params.set('text', input);
        router.replace(`${currentPath}?${params.toString()}`, { scroll: false });
      } else if (window.location.search) {
        router.replace(currentPath, { scroll: false });
      }

      if (input.trim() === '' && tool.slug !== 'lorem-ipsum-generator' && tool.slug !== 'random-password-generator' && tool.slug !== 'uuid-generator' && tool.slug !== 'robots-txt-generator') {
        setIsProcessing(false);
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
      } finally {
        setIsProcessing(false);
      }
    }, 800);

    return () => {
      clearTimeout(handler);
    };
  }, [input, tool.slug, mounted, router]);

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
      <div className="container mx-auto p-4 md:p-8 space-y-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* INPUT CARD */}
          <Card className="relative overflow-hidden border border-border/80 bg-card shadow-lg hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-accent/50 focus-within:border-accent">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 bg-muted/30 px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <FileText className="h-4 w-4" />
                </div>
                <CardTitle className="capitalize text-base font-bold font-headline tracking-tight text-foreground">
                  Input: {tool.inputType}
                </CardTitle>
              </div>
              <div className="flex items-center gap-1">
                {input && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleClear}
                        aria-label="Clear input"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Clear Input</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0 relative">
              <div className="relative">
                <Label htmlFor="input-textarea" className="sr-only">
                  Your {tool.inputType} input
                </Label>
                <Textarea
                  id="input-textarea"
                  placeholder={tool.slug === 'lorem-ipsum-generator' ? 'Enter number of paragraphs (e.g., 3)' : `Paste your ${tool.inputType} here...`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-[380px] w-full border-0 rounded-none bg-transparent p-6 font-mono text-sm leading-relaxed focus-visible:ring-0 focus-visible:ring-offset-0"
                  autoFocus
                />
              </div>
              {/* INPUT COUNTER FOOTER */}
              <div className="flex items-center justify-between border-t border-border/50 bg-muted/20 px-6 py-2.5 text-xs text-muted-foreground font-mono">
                <div className="flex gap-4">
                  <span>{inputCharCount.toLocaleString()} chars</span>
                  <span>{inputLineCount.toLocaleString()} lines</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span>Ready</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* OUTPUT CARD */}
          <Card className="relative overflow-hidden border border-border/80 bg-card shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 bg-muted/30 px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Code className="h-4 w-4" />
                </div>
                <CardTitle className="capitalize text-base font-bold font-headline tracking-tight text-foreground">
                  Output: {tool.outputType}
                </CardTitle>
              </div>
              <div className="flex items-center gap-1.5 bg-muted/40 p-1 rounded-lg">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleShareWithInput}
                      aria-label="Share with input"
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
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
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
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
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
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
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
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
            <CardContent className="p-0 relative">
              {error && (
                <div className="p-4 bg-destructive/5 border-b border-destructive/20">
                  <Alert variant="destructive" className="border-0 bg-transparent p-0">
                    <Terminal className="h-4 w-4 text-destructive" />
                    <AlertTitle className="font-headline font-semibold text-destructive">Error</AlertTitle>
                    <AlertDescription className="text-sm text-destructive/90">
                      {error.replace(/^(Error:|❌|⚠️)\s*/, '')}
                    </AlertDescription>
                  </Alert>
                </div>
              )}
              <div className="relative min-h-[380px]">
                {tool.slug === 'text-statistics' ? (
                  <div className="p-6 h-full min-h-[380px] flex flex-col justify-center">
                    {!stats && !error ? (
                      <div className="flex h-[330px] items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 text-muted-foreground">
                        <div className="text-center space-y-2">
                          <Sparkles className="h-8 w-8 mx-auto text-accent animate-pulse" />
                          <p className="text-sm">Waiting for input content...</p>
                        </div>
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
                    className="min-h-[380px] w-full border-0 rounded-none bg-muted/40 p-6 font-mono text-sm leading-relaxed whitespace-pre-wrap focus-visible:ring-0 focus-visible:ring-offset-0 select-text"
                    placeholder={!error ? "Waiting for input..." : ""}
                  />
                )}
              </div>
              {/* OUTPUT COUNTER FOOTER */}
              <div className="flex items-center justify-between border-t border-border/50 bg-muted/20 px-6 py-2.5 text-xs text-muted-foreground font-mono">
                <div className="flex gap-4">
                  <span>{outputCharCount.toLocaleString()} chars</span>
                  <span>{outputLineCount.toLocaleString()} lines</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {isProcessing ? (
                    <>
                      <RefreshCw className="h-3 w-3 animate-spin text-accent" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-border bg-background uppercase tracking-wider">{tool.category}</Badge>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RECENT ACTIVITY & RELATED TOOLS */}
        <div className="mt-20 space-y-20">
          {history.length > 0 && (
            <div className="space-y-6">
              <div className="text-center max-w-lg mx-auto space-y-1">
                <h2 className="text-2xl font-bold font-headline tracking-tight text-foreground">
                  Recent Activity
                </h2>
                <p className="text-sm text-muted-foreground">Restore your previously processed developer snippets instantly.</p>
              </div>
              <Card className="border border-border/60 shadow-md overflow-hidden bg-card/60 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 bg-muted/10 px-6 py-4">
                  <CardTitle className="text-sm font-semibold tracking-wide text-foreground">History Log</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearHistory}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash className="mr-2 h-4 w-4" /> Clear All
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="divide-y divide-border/40">
                    {history.map((item) => (
                      <li key={item.id} className="hover:bg-muted/30 transition-colors">
                        <button
                          className="flex h-auto w-full items-center justify-start gap-4 p-5 text-left focus:outline-none focus:bg-muted/40"
                          onClick={() => handleRestoreFromHistory(item)}
                        >
                          <History className="h-5 w-5 shrink-0 text-muted-foreground/60 group-hover:text-foreground" />
                          <div className="flex-grow overflow-hidden">
                            <p className="font-mono text-sm truncate text-foreground/80">
                              {item.input}
                            </p>
                            <div className="text-xs text-muted-foreground flex items-center gap-3 mt-1.5">
                              <Badge variant="secondary" className="capitalize text-[10px] tracking-wide font-medium">{item.toolSlug.replace(/-/g, ' ')}</Badge>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatDistanceToNow(new Date(item.timestamp), {
                                  addSuffix: true,
                                })}
                              </div>
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}

          {relatedTools.length > 0 && (
            <div className="space-y-6">
              <div className="text-center max-w-lg mx-auto space-y-1">
                <h2 className="text-2xl font-bold font-headline tracking-tight text-foreground">
                  You Might Also Like
                </h2>
                <p className="text-sm text-muted-foreground">Discover other complementary developer tools to streamline your process.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedTools.map((relatedTool) => (
                  <Card
                    key={relatedTool.slug}
                    className="h-full flex flex-col border border-border/60 bg-card shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300 rounded-xl group hover:-translate-y-1"
                  >
                    <CardHeader className="p-6 pb-4">
                      <CardTitle className="font-headline text-lg font-bold text-foreground tracking-tight">
                        <Link
                          href={`/tool/${relatedTool.slug}`}
                          prefetch={false}
                          title={`Try our ${relatedTool.title} tool`}
                          className="hover:text-accent focus:outline-none focus:ring-2 focus:ring-ring rounded-sm transition-colors"
                        >
                          {relatedTool.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow px-6 py-0">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {relatedTool.description}
                      </p>
                    </CardContent>
                    <div className="p-6 pt-5">
                      <Link
                        href={`/tool/${relatedTool.slug}`}
                        prefetch={false}
                        title={`Try our ${relatedTool.title} tool`}
                        className="font-bold text-sm text-accent inline-flex items-center gap-1.5 group"
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
                    className="fixed bottom-8 right-8 z-50 rounded-full shadow-lg bg-background hover:bg-muted border border-border hover:scale-105 active:scale-95 transition-all"
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
