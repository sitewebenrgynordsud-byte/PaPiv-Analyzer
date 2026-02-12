export type InputType = 'text' | 'json' | 'markdown';
export type OutputType = 'text' | 'html' | 'csv' | 'json';

export interface ToolConfig {
  slug: string;
  title: string;
  description: string;
  category: string;
  inputType: InputType;
  outputType: OutputType;
}

export const ALL_TOOLS: ToolConfig[] = [
  {
    slug: 'word-counter',
    title: 'Word Counter',
    description: 'A simple tool to count words, characters, and sentences in your text.',
    category: 'Text',
    inputType: 'text',
    outputType: 'text',
  },
  {
    slug: 'json-to-csv',
    title: 'JSON to CSV Converter',
    description: 'Convert your JSON data into CSV format with ease.',
    category: 'Converter',
    inputType: 'json',
    outputType: 'csv',
  },
  {
    slug: 'text-to-lowercase',
    title: 'Lowercase Converter',
    description: 'Convert any text to lowercase.',
    category: 'Text',
    inputType: 'text',
    outputType: 'text',
  },
  {
    slug: 'document-analyzer',
    title: 'Document Analyzer',
    description: 'Get detailed statistics about your document, including word count, reading time, and more.',
    category: 'Text',
    inputType: 'text',
    outputType: 'text',
  }
];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return ALL_TOOLS.find((tool) => tool.slug === slug);
}
