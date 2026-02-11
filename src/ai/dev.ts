import { config } from 'dotenv';
config();

import '@/ai/flows/highlight-key-sentences.ts';
import '@/ai/flows/analyze-document-sentiment.ts';
import '@/ai/flows/generate-analysis-report.ts';
import '@/ai/flows/summarize-document.ts';