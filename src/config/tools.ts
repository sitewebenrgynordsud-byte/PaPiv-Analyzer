export type InputType = 'text' | 'json' | 'markdown';
export type OutputType = 'text' | 'html' | 'csv' | 'json';

export interface ToolConfig {
  slug: string;
  title: string;
  description: string;
  category: string;
  inputType: InputType;
  outputType: OutputType;
  longDescription: string;
}

export const ALL_TOOLS: ToolConfig[] = [
  {
    slug: 'text-statistics',
    title: 'Professional Text Statistics',
    description: 'Analyze word density, characters, and reading time instantly.',
    category: 'Analysis',
    inputType: 'text',
    outputType: 'text',
    longDescription: `What is the Text Statistics Tool?\nThe Professional Text Statistics tool is a powerful and free utility designed for writers, editors, students, and digital marketers. It provides an instant, detailed analysis of any given text, breaking it down into key metrics. This includes word count, character count, number of lines, and an estimated reading time. By offering these insights, the tool helps you refine your writing to meet specific requirements and improve readability.

How to Use It?\nUsing the tool is incredibly straightforward. Simply paste your text into the input area on the left. As you type or paste, the tool processes the content in real-time, and the full statistical breakdown appears instantly in the output area. The results are displayed in a clear, easy-to-read format, allowing you to quickly copy the information you need.

Why Use PaPiv for Text Analysis?\nPaPiv's Text Statistics tool is built with privacy and speed as top priorities. Unlike other online tools that may upload your data to a server for processing, our tool operates entirely within your browser. This means your sensitive documents, articles, or personal notes are never sent over the internet, guaranteeing 100% privacy.`,
  },
  {
    slug: 'json-to-csv',
    title: 'JSON to CSV Converter',
    description: 'Convert your JSON data into CSV format with ease.',
    category: 'Converter',
    inputType: 'json',
    outputType: 'csv',
    longDescription: `What is the JSON to CSV Converter?\nThe JSON to CSV Converter is an essential utility for developers and data analysts. It allows you to effortlessly convert structured JSON (JavaScript Object Notation) data into a tabular CSV (Comma-Separated Values) format. This is particularly useful when you need to import data from a web API into a spreadsheet application like Excel or Google Sheets.

How to Use It?\nTo convert your data, paste your JSON content—which can be a single object or an array of objects—into the input field. The tool immediately parses the JSON and generates the corresponding CSV output in the adjacent panel. The first row of the CSV will contain the headers (the keys from the JSON objects). If your JSON is invalid, an error message will appear instantly.

Why Use PaPiv for Data Conversion?\nSecurity and efficiency are at the core of PaPiv's tools. The JSON to CSV Converter processes all your data locally in your browser, so your sensitive information never leaves your machine. This commitment to client-side processing ensures complete data privacy, a critical feature when dealing with proprietary or personal data.`,
  },
  {
    slug: 'text-to-lowercase',
    title: 'Lowercase Converter',
    description: 'Convert any text to lowercase.',
    category: 'Text',
    inputType: 'text',
    outputType: 'text',
    longDescription: `What is the Lowercase Converter?\nThis tool is a simple yet effective utility for converting any block of text into all lowercase letters. It's perfect for standardizing data, cleaning up text for processing, or preparing content where a specific case format is required.

How to Use It?\nPaste any text into the input box. The tool will instantly convert the entire text to lowercase in the output box. There's no need to click any buttons. The transformation is immediate, allowing you to copy the result right away.

Why Use PaPiv for Text Transformation?\nLike all PaPiv tools, the Lowercase Converter runs entirely on your local machine. Nothing is uploaded or stored on our servers. This ensures your data remains private and the tool performs with zero delay, providing an efficient and secure solution for basic text manipulation.`,
  },
  {
    slug: 'text-to-camelcase',
    title: 'Camel Case Converter',
    description: 'Convert any text to camelCase format online.',
    category: 'Transform',
    inputType: 'text',
    outputType: 'text',
    longDescription: `What is the Camel Case Converter?\nThis developer utility transforms any string of words into camelCase format, where the first word is lowercase and subsequent words are capitalized without spaces (e.g., "hello world" becomes "helloWorld"). It is widely used in programming languages like JavaScript for naming variables and functions.

How to Use It?\nType or paste your text into the input area. The tool will instantly apply the camelCase transformation and display the result in the output box. It correctly handles multiple spaces and existing capitalization to produce a clean output.

Why Use PaPiv for Case Conversion?\nPaPiv's case converters are designed for speed and privacy. As a developer, you can quickly format variable names without sending any potentially proprietary code to a server. The real-time, client-side processing ensures your workflow is never interrupted.`,
  },
  {
    slug: 'text-to-snake-case',
    title: 'Snake Case Converter',
    description: 'Convert spaces to underscores with snake_case converter.',
    category: 'Transform',
    inputType: 'text',
    outputType: 'text',
    longDescription: `What is the Snake Case Converter?\nThis tool converts text into snake_case, where all letters are lowercase and spaces are replaced with underscores (e.g., "Hello World" becomes "hello_world"). This casing is common in languages like Python and SQL for naming variables, functions, and database columns.

How to Use It?\nSimply provide your text in the input box. The output box will immediately show the snake_cased version of your text. The process is automatic and instantaneous.

Why Use PaPiv for Case Conversion?\nOur tool provides a fast, secure, and reliable way to format your code and data. Because it runs entirely in your browser, you can be sure that your input is never logged or stored. It's a developer-friendly tool designed to be a seamless part of your coding toolkit.`,
  },
  {
    slug: 'text-to-pascalcase',
    title: 'Pascal Case Converter',
    description: 'Format your text into PascalCase instantly.',
    category: 'Transform',
    inputType: 'text',
    outputType: 'text',
    longDescription: `What is the PascalCase Converter?\nPascalCase, also known as UpperCamelCase, is a naming convention where the first letter of each word in a compound word is capitalized (e.g., "hello world" becomes "HelloWorld"). It is commonly used in many programming languages for naming classes, components, or types.

How to Use It?\nEnter your desired text into the input area. The tool will automatically convert it to PascalCase in the output area in real-time.

Why Use PaPiv for Case Conversion?\nPaPiv ensures that your text formatting tasks are quick and private. The PascalCase Converter works entirely client-side, making it a secure choice for developers and writers. The instant feedback loop allows for rapid and efficient work without context switching.`,
  },
  {
    slug: 'text-to-slug',
    title: 'URL Slug Generator',
    description: 'Transform titles into SEO-friendly URL slugs.',
    category: 'Transform',
    inputType: 'text',
    outputType: 'text',
    longDescription: `What is the URL Slug Generator?\nA URL slug is the part of a URL that identifies a particular page in a human-readable format. This tool converts any text, typically a page title or headline, into an SEO-friendly slug. It removes special characters, converts text to lowercase, and replaces spaces with hyphens (e.g., "My Awesome Blog Post!" becomes "my-awesome-blog-post").

How to Use It?\nPaste your title or string into the input box. The clean, URL-safe slug will be generated instantly in the output box, ready to be used in your CMS or web application.

Why Use PaPiv for Slug Generation?\nCreating clean URLs is crucial for SEO and user experience. PaPiv's Slug Generator provides a reliable, instant, and private way to do this. Because it's a client-side tool, it's incredibly fast and you can be confident that your page titles and content strategy remain confidential.`,
  },
];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  const normalizedSlug = decodeURIComponent(slug).toLowerCase();
  return ALL_TOOLS.find((tool) => tool.slug.toLowerCase() === normalizedSlug);
}
