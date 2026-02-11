'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a comprehensive analysis report of a document.
 *
 * generateAnalysisReport - A function that generates the analysis report.
 * GenerateAnalysisReportInput - The input type for the generateAnalysisReport function.
 * GenerateAnalysisReportOutput - The return type for the generateAnalysisReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAnalysisReportInputSchema = z.object({
  documentContent: z
    .string()
    .describe('The complete text content of the document to be analyzed.'),
  keyFindings: z.string().describe('The key findings extracted from the document.'),
  sentimentAnalysis: z.string().describe('The sentiment analysis of the document.'),
});

export type GenerateAnalysisReportInput = z.infer<
  typeof GenerateAnalysisReportInputSchema
>;

const GenerateAnalysisReportOutputSchema = z.object({
  report: z
    .string()
    .describe('A comprehensive analysis report summarizing key findings and sentiment.'),
});

export type GenerateAnalysisReportOutput = z.infer<
  typeof GenerateAnalysisReportOutputSchema
>;

export async function generateAnalysisReport(
  input: GenerateAnalysisReportInput
): Promise<GenerateAnalysisReportOutput> {
  return generateAnalysisReportFlow(input);
}

const generateAnalysisReportPrompt = ai.definePrompt({
  name: 'generateAnalysisReportPrompt',
  input: {schema: GenerateAnalysisReportInputSchema},
  output: {schema: GenerateAnalysisReportOutputSchema},
  prompt: `You are an expert document analyst. Generate a comprehensive analysis report based on the following information:\n\nDocument Content: {{{documentContent}}}\n\nKey Findings: {{{keyFindings}}}\n\nSentiment Analysis: {{{sentimentAnalysis}}}\n\nInclude an executive summary, key insights, and the overall sentiment of the document. Format the report for easy sharing and referencing.`,
});

const generateAnalysisReportFlow = ai.defineFlow(
  {
    name: 'generateAnalysisReportFlow',
    inputSchema: GenerateAnalysisReportInputSchema,
    outputSchema: GenerateAnalysisReportOutputSchema,
  },
  async input => {
    const {output} = await generateAnalysisReportPrompt(input);
    return output!;
  }
);
