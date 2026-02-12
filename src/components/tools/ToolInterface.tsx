'use client';

import { useState, useEffect } from 'react';
import { Copy, Trash, Terminal, Check, Share2 } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

import { ALL_TOOLS, type ToolConfig } from '@/config/tools';
import { processText } from '@/lib/processor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface ToolInterfaceProps {
  tool: ToolConfig;
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
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [stats, setStats] = useState<{[key: string]: string | number} | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const { toast } = useToast();
  const [relatedTools, setRelatedTools] = useState<ToolConfig[]>([]);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setMounted(true);
    setCurrentUrl(window.location.href);

    const otherTools = ALL_TOOLS.filter((t) => t.slug !== tool.slug);
    const shuffled = otherTools.sort(() => 0.5 - Math.random());
    setRelatedTools(shuffled.slice(0, 3));
  }, [tool.slug]);

  useEffect(() => {
    if (!mounted) return;

    const handler = setTimeout(() => {
      try {
        const result = processText(tool.slug, input);
        if (result.startsWith('Error:') || result.startsWith('❌') || result.startsWith('⚠️') || result.startsWith('Invalid JSON')) {
          setError(result);
          setOutput('');
          setStats(null);
        } else if (tool.slug === 'text-statistics' && input.trim() !== '') {
          setStats(JSON.parse(result));
          setOutput('');
          setError(null);
        } else if (tool.slug === 'text-statistics' && input.trim() === '') {
          setStats(null);
          setOutput('');
          setError(null);
        } else {
          setOutput(result);
          setStats(null);
          setError(null);
        }
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown processing error occurred.';
        setError(`Error processing data. ${errorMessage}`);
        setOutput('');
        setStats(null);
      }
    }, 100);

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
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleCopyUrl = () => {
    if (isUrlCopied || !currentUrl) return;
    navigator.clipboard.writeText(currentUrl);
    toast({
      title: 'URL Copied!',
      description: 'Link to this tool has been copied to your clipboard.',
    });
    setIsUrlCopied(true);
    setTimeout(() => {
      setIsUrlCopied(false);
    }, 2000);
  }
  
  const handleClear = () => {
    setInput('');
    setOutput('');
    setStats(null);
    setError(null);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="capitalize">Input: {tool.inputType}</CardTitle>
            {input && (
                <Button variant="ghost" size="icon" onClick={handleClear} aria-label="Clear input">
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
                placeholder={`Paste your ${tool.inputType} here...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[300px] resize-y font-mono"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="capitalize">
              Output: {tool.outputType}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{tool.category}</Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyUrl}
                aria-label="Copy tool URL"
                disabled={isUrlCopied}
              >
                {isUrlCopied ? <Check className="h-4 w-4 text-accent" /> : <Share2 className="h-4 w-4" />}
              </Button>
              {(output || stats) && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  aria-label="Copy output"
                  disabled={isCopied}
                >
                  {isCopied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
                <Alert variant="destructive">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error.replace(/^(Error:|❌|⚠️)\s*/, '')}</AlertDescription>
                </Alert>
            )}
            <div className="min-h-[300px]">
              {tool.slug === 'text-statistics' ? (
                <div className="h-full">
                  {!input.trim() ? (
                    <div className="flex h-full items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <p>Waiting for input...</p>
                    </div>
                  ) : (
                    stats && (
                      <div className="grid grid-cols-2 gap-4">
                        <StatCard title="Words" value={stats.words} />
                        <StatCard title="Characters" value={stats.characters} />
                        <StatCard title="Lines" value={stats.lines} />
                        <StatCard title="Reading Time" value={`~${stats.readingTime} min`} />
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
                  placeholder="Waiting for input..."
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      {relatedTools.length > 0 && (
        <div className="mt-16">
            <h2 className="text-2xl font-bold font-headline text-center mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedTools.map(relatedTool => (
                    <Link href={`/tool/${relatedTool.slug}`} key={relatedTool.slug} className="block" prefetch={false}>
                        <Card className="h-full hover:border-accent transition-shadow duration-300 shadow-sm hover:shadow-lg">
                            <CardHeader>
                                <CardTitle className="font-headline text-lg">{relatedTool.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{relatedTool.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}
