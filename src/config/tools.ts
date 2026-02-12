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
    slug: 'text-to-camelcase',
    title: 'Camel Case Converter',
    description: 'Convert any text to camelCase format online.',
    category: 'Transform',
    inputType: 'text',
    outputType: 'text',
  },
  {
    slug: 'text-to-snake-case',
    title: 'Snake Case Converter',
    description: 'Convert spaces to underscores with snake_case converter.',
    category: 'Transform',
    inputType: 'text',
    outputType: 'text',
  },
  {
    slug: 'text-to-pascalcase',
    title: 'Pascal Case Converter',
    description: 'Format your text into PascalCase instantly.',
    category: 'Transform',
    inputType: 'text',
    outputType: 'text',
  },
  {
    slug: 'text-to-slug',
    title: 'URL Slug Generator',
    description: 'Transform titles into SEO-friendly URL slugs.',
    category: 'Transform',
    inputType: 'text',
    outputType: 'text',
  },
];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return ALL_TOOLS.find((tool) => tool.slug === slug);
}
