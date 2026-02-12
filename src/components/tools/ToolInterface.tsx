'use client';

import { useState, useEffect } from 'react';
import { Copy, Wand2, Loader2, Trash, Terminal, Check } from 'lucide-react';

import { type ToolConfig } from '@/config/tools';
import { processText } from '@/lib/processor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ToolInterfaceProps {
  tool: ToolConfig;
}

export default function ToolInterface({ tool }: ToolInterfaceProps) {
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleProcess = () => {
    setIsLoading(true);
    setError(null);
    setOutput('');

    setTimeout(() => {
      try {
        const result = processText(tool.slug, input);
        if (result.startsWith('Error:')) {
          setError(result);
        } else {
          setOutput(result);
        }
      } catch (e) {
        const errorMessage =
          e instanceof Error ? e.message : 'An unknown processing error occurred.';
        setError(`Error: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({
      title: 'Copied to clipboard!',
      description: 'The output has been copied to your clipboard.',
    });
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  
  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  const isCodeTool = ['json', 'csv', 'markdown'].includes(tool.inputType) || ['json', 'csv', 'html'].includes(tool.outputType);

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
          <CardContent className="space-y-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="input-textarea" className="sr-only">
                Your {tool.inputType} input
              </Label>
              <Textarea
                id="input-textarea"
                placeholder={`Paste your ${tool.inputType} here...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`min-h-[300px] resize-y ${isCodeTool ? 'font-mono' : ''}`}
                disabled={isLoading}
              />
            </div>
            <Button onClick={handleProcess} className="w-full" size="lg" disabled={isLoading || !input}>
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Wand2 />
                  <span>Process</span>
                </>
              )}
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="capitalize">
              Output: {tool.outputType}
            </CardTitle>
            {output && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                aria-label="Copy output"
              >
                {isCopied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
                <Alert variant="destructive">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>Processing Error</AlertTitle>
                  <AlertDescription>{error.replace('Error: ', '')}</AlertDescription>
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
                className={`min-h-[300px] resize-y bg-muted ${isCodeTool ? 'font-mono' : ''}`}
                placeholder="Output will appear here..."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
