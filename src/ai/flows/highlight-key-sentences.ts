'use server';

/**
 * @fileOverview This file defines a Genkit flow to highlight key sentences in a document.
 *
 * The flow takes document content as input and returns a list of highlighted sentences.
 *
 * - highlightKeySentences - A function that triggers the highlight key sentences flow.
 * - HighlightKeySentencesInput - The input type for the highlightKeySentences function.
 * - HighlightKeySentencesOutput - The return type for the highlightKeySentences function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HighlightKeySentencesInputSchema = z.object({
  documentContent: z
    .string()
    .describe('The content of the document to be analyzed.'),
});
export type HighlightKeySentencesInput = z.infer<
  typeof HighlightKeySentencesInputSchema
>;

const HighlightKeySentencesOutputSchema = z.object({
  highlightedSentences: z
    .array(z.string())
    .describe('An array of the most important sentences in the document.'),
});
export type HighlightKeySentencesOutput = z.infer<
  typeof HighlightKeySentencesOutputSchema
>;

export async function highlightKeySentences(
  input: HighlightKeySentencesInput
): Promise<HighlightKeySentencesOutput> {
  return highlightKeySentencesFlow(input);
}

const highlightKeySentencesPrompt = ai.definePrompt({
  name: 'highlightKeySentencesPrompt',
  input: {schema: HighlightKeySentencesInputSchema},
  output: {schema: HighlightKeySentencesOutputSchema},
  prompt: `You are an expert document analyzer. Your task is to identify and extract the most important sentences from the given document content.

Document Content:
{{documentContent}}

Identify the key sentences that best represent the main ideas and overall meaning of the document. Return these sentences in array.`,
});

const highlightKeySentencesFlow = ai.defineFlow(
  {
    name: 'highlightKeySentencesFlow',
    inputSchema: HighlightKeySentencesInputSchema,
    outputSchema: HighlightKeySentencesOutputSchema,
  },
  async input => {
    const {output} = await highlightKeySentencesPrompt(input);
    return output!;
  }
);
