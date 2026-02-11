'use client';

import { useState, useEffect } from 'react';
import { Copy, Wand2 } from 'lucide-react';

import { type ToolConfig } from '@/config/tools';
import { processText } from '@/lib/processor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ToolInterfaceProps {
  tool: ToolConfig;
}

export default function ToolInterface({ tool }: ToolInterfaceProps) {
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleProcess = () => {
    const result = processText(tool.slug, input);
    setOutput(result);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({
      title: 'Copied to clipboard!',
      description: 'The output has been copied to your clipboard.',
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="capitalize">Input: {tool.inputType}</CardTitle>
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
                className="min-h-[300px] resize-y"
              />
            </div>
            <Button onClick={handleProcess} className="w-full" size="lg">
              <Wand2 />
              <span>Process</span>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="capitalize">
              Output: {tool.outputType}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full gap-1.5 relative">
              <Label htmlFor="output-textarea" className="sr-only">
                Your {tool.outputType} output
              </Label>
              <Textarea
                id="output-textarea"
                readOnly
                value={output}
                className="min-h-[300px] resize-y bg-muted"
                placeholder="Output will appear here..."
              />
              {output && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-0 right-0 mt-1 mr-1 h-8 w-8"
                  onClick={handleCopy}
                  aria-label="Copy output"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
