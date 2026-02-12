'use client';

import { useState, useEffect } from 'react';
import { Copy, Trash, Terminal, Check, Share2 } from 'lucide-react';
import Link from 'next/link';

import { ALL_TOOLS, type ToolConfig } from '@/config/tools';
import { processText } from '@/lib/processor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface ToolInterfaceProps {
  tool: ToolConfig;
}

export default function ToolInterface({ tool }: ToolInterfaceProps) {
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isUrlCopied, setIsUrlCopied] = useState(false);
  const { toast } = useToast();
  const [relatedTools, setRelatedTools] = useState<ToolConfig[]>([]);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setMounted(true);
    setCurrentUrl(window.location.href);

    // Generate related tools
    const otherTools = ALL_TOOLS.filter((t) => t.slug !== tool.slug);
    const shuffled = otherTools.sort(() => 0.5 - Math.random());
    setRelatedTools(shuffled.slice(0, 3));
  }, [tool.slug]);

  // Debounced real-time processing effect
  useEffect(() => {
    if (!mounted) return;

    const handler = setTimeout(() => {
      try {
        const result = processText(tool.slug, input);
        if (result.startsWith('Error:') || result.startsWith('❌') || result.startsWith('⚠️') || result.startsWith('Invalid JSON')) {
          setError(result);
          setOutput('');
        } else {
          setOutput(result);
          setError(null);
        }
      } catch (e) {
        const errorMessage =
          e instanceof Error ? e.message : 'An unknown processing error occurred.';
        setError(`Error: ${errorMessage}`);
        setOutput('');
      }
    }, 100);

    return () => {
      clearTimeout(handler);
    };
  }, [input, tool.slug, mounted]);


  const handleCopy = () => {
    if (!output || isCopied) return;
    navigator.clipboard.writeText(output);
    toast({
      title: 'Copied to clipboard!',
    });
    setIsCopied(true);
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
              {output && (
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
            <div className="grid w-full gap-1.5 relative">
              <Label htmlFor="output-textarea" className="sr-only">
                Your {tool.outputType} output
              </Label>
              <Textarea
                id="output-textarea"
                readOnly
                value={output}
                className="min-h-[300px] resize-y bg-muted font-mono whitespace-pre-wrap"
                placeholder="Waiting for input..."
              />
            </div>
          </CardContent>
        </Card>
      </div>
      {relatedTools.length > 0 && (
        <div className="mt-16">
            <h2 className="text-2xl font-bold font-headline text-center mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedTools.map(relatedTool => (
                    <Link href={`/tool/${relatedTool.slug}`} key={relatedTool.slug} className="block">
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
