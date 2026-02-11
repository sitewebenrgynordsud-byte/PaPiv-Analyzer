'use server';

/**
 * @fileOverview Sentiment analysis flow for analyzing the sentiment of a document.
 *
 * - analyzeDocumentSentiment - Analyzes the sentiment of a document.
 * - AnalyzeDocumentSentimentInput - The input type for the analyzeDocumentSentiment function.
 * - AnalyzeDocumentSentimentOutput - The return type for the analyzeDocumentSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeDocumentSentimentInputSchema = z.object({
  documentContent: z.string().describe('The content of the document to analyze.'),
});
export type AnalyzeDocumentSentimentInput = z.infer<
  typeof AnalyzeDocumentSentimentInputSchema
>;

const AnalyzeDocumentSentimentOutputSchema = z.object({
  sentiment: z
    .enum(['positive', 'negative', 'neutral'])
    .describe('The sentiment of the document.'),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .describe('The confidence score of the sentiment analysis.'),
});
export type AnalyzeDocumentSentimentOutput = z.infer<
  typeof AnalyzeDocumentSentimentOutputSchema
>;

export async function analyzeDocumentSentiment(
  input: AnalyzeDocumentSentimentInput
): Promise<AnalyzeDocumentSentimentOutput> {
  return analyzeDocumentSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeDocumentSentimentPrompt',
  input: {schema: AnalyzeDocumentSentimentInputSchema},
  output: {schema: AnalyzeDocumentSentimentOutputSchema},
  prompt: `Analyze the sentiment of the following document content. Determine if the sentiment is positive, negative, or neutral.

Document Content: {{{documentContent}}}

Respond in a JSON format with 'sentiment' (positive, negative, or neutral) and 'confidence' (a number between 0 and 1). `,
});

const analyzeDocumentSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeDocumentSentimentFlow',
    inputSchema: AnalyzeDocumentSentimentInputSchema,
    outputSchema: AnalyzeDocumentSentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
