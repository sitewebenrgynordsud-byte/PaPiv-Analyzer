'use server';

import { analyzeDocumentSentiment } from '@/ai/flows/analyze-document-sentiment';
import { generateAnalysisReport } from '@/ai/flows/generate-analysis-report';
import { highlightKeySentences } from '@/ai/flows/highlight-key-sentences';
import { summarizeDocument } from '@/ai/flows/summarize-document';

export interface AnalysisResult {
  summary: string;
  highlights: string[];
  sentiment: {
    sentiment: 'positive' | 'negative' | 'neutral';
    confidence: number;
  };
  report: string;
}

export async function analyzeDocumentAction(
  documentContent: string
): Promise<AnalysisResult> {
  if (!documentContent) {
    throw new Error('Document content is required.');
  }

  try {
    const [summaryResult, highlightsResult, sentimentResult] =
      await Promise.all([
        summarizeDocument({ documentContent }),
        highlightKeySentences({ documentContent }),
        analyzeDocumentSentiment({ documentContent }),
      ]);

    const keyFindings = `Summary: ${
      summaryResult.executiveSummary
    }\nKey Sentences: ${highlightsResult.highlightedSentences.join(', ')}`;
    const sentimentAnalysis = `Sentiment: ${
      sentimentResult.sentiment
    } (Confidence: ${sentimentResult.confidence.toFixed(2)})`;

    const reportResult = await generateAnalysisReport({
      documentContent,
      keyFindings,
      sentimentAnalysis,
    });

    return {
      summary: summaryResult.executiveSummary,
      highlights: highlightsResult.highlightedSentences,
      sentiment: sentimentResult,
      report: reportResult.report,
    };
  } catch (error) {
    console.error('An error occurred during document analysis:', error);
    throw new Error('Failed to analyze document. Please try again later.');
  }
}
