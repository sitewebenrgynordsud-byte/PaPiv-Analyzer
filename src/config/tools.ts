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
    longDescription: `What is the Text Statistics Tool?\nThe Professional Text Statistics tool is a powerful and free utility designed for writers, editors, students, and digital marketers. It provides an instant, detailed analysis of any given text, breaking it down into key metrics. This includes word count, character count, number of lines, and an estimated reading time. By offering these insights, the tool helps you refine your writing to meet specific requirements and improve readability, which is crucial for SEO and user engagement. This free text statistics analyzer is an essential part of any content creator's toolkit.\n\nHow to Use It Effectively?\nUsing the tool is incredibly straightforward. Simply paste your text into the input area on the left. As you type or paste, the tool processes the content in real-time, and the full statistical breakdown appears instantly in the output area. For best results, analyze entire articles or sections to get a holistic view of your content's structure. You can use these text statistics to check if you are meeting the word count requirements for a blog post or academic paper, and to gauge the overall complexity of your writing. The results are displayed in a clear, easy-to-read format, allowing you to quickly copy the information you need.\n\nWhy is Text Analysis Essential?\nIn the digital age, content is king, and understanding its metrics is paramount. PaPiv's Text Statistics tool is built with privacy and speed as top priorities. Unlike other online tools that may upload your data to a server for processing, our tool operates entirely within your browser. This means your sensitive documents are never sent over the internet, guaranteeing 100% privacy. For writers, it helps in maintaining a consistent writing style. For SEO specialists, it's a quick way to ensure content meets length guidelines. For more on readability metrics, you can refer to authoritative sources like the Wikipedia page on Readability.`,
  },
  {
    slug: 'json-to-csv',
    title: 'JSON to CSV Converter',
    description: 'Convert your JSON data into CSV format with ease.',
    category: 'Converter',
    inputType: 'json',
    outputType: 'csv',
    longDescription: `What is the JSON to CSV Converter?\nThe JSON to CSV Converter is an essential utility for developers and data analysts who need to switch between data formats. It allows you to effortlessly convert structured JSON (JavaScript Object Notation) data into a tabular CSV (Comma-Separated Values) format. This is particularly useful when you need to import data from a web API into a spreadsheet application like Excel or Google Sheets for analysis. Our converter handles both single JSON objects and arrays of objects, making it a versatile tool for any data conversion task.\n\nHow to Use This Converter?\nTo convert your data, paste your JSON content into the input field on the left. The tool immediately parses the JSON and generates the corresponding CSV output in the adjacent panel. The first row of the CSV will contain the headers, which are the keys extracted from your JSON objects. If your JSON structure is invalid, an error message will appear instantly to help you debug. The real-time nature of the tool means you get immediate feedback, streamlining your workflow significantly.\n\nWhy Use a Client-Side Converter?\nSecurity and efficiency are at the core of PaPiv's tools. The JSON to CSV Converter processes all your data locally in your browser, so your sensitive business or personal information never leaves your machine. This commitment to client-side processing ensures complete data privacy, a critical feature when dealing with proprietary data. Plus, without server-side processing, the conversion is instantaneous. For more information on the JSON format, refer to the official documentation at JSON.org.`,
  },
  {
    slug: 'text-to-lowercase',
    title: 'Lowercase Converter',
    description: 'Convert any text to lowercase.',
    category: 'Text',
    inputType: 'text',
    outputType: 'text',
    longDescription: `What is the Lowercase Converter?\nThis tool is a simple yet effective utility for converting any block of text into all lowercase letters. It's an indispensable tool for data cleaning, text normalization for natural language processing, or preparing content where a specific case format is required for consistency. Whether you're a programmer standardizing input data or a writer ensuring your headlines follow a specific style guide, this tool simplifies the task into a single step. The lowercase converter handles all character sets and preserves spacing, ensuring the integrity of your original text structure.\n\nHow to Use It Effectively?\nUsing the tool couldn't be easier. Paste any text you wish to convert into the input box on the left. The tool will instantly transform the entire text to lowercase and display it in the output box on the right. There's no need to click any buttons or wait for a server to respond. The transformation is immediate, allowing you to copy the result right away and continue with your work. This seamless experience is designed to be a frictionless part of your workflow.\n\nWhy is a Local Tool Better?\nLike all PaPiv tools, the Lowercase Converter runs entirely on your local machine within your browser. Nothing is uploaded or stored on our servers. This client-side approach ensures your data remains completely private and the tool performs with zero delay. It provides an efficient and secure solution for basic text manipulation without the privacy risks associated with many online tools. For tasks like this, a fast, free, and private tool is always the superior choice for professionals who value their time and data security.`,
  },
  {
    slug: 'text-to-camelcase',
    title: 'Camel Case Converter',
    description: 'Convert any text to camelCase format online.',
    category: 'Transform',
    inputType: 'text',
    outputType: 'text',
    longDescription: `What is the Camel Case Converter?\nThis developer utility transforms any string of words into camelCase format. In camelCase, the first word of a phrase is lowercase, while the first letter of every subsequent word is capitalized, with no spaces in between (e.g., "hello world" becomes "helloWorld"). This casing convention is a cornerstone of many programming languages, most notably JavaScript, where it is the standard for naming variables and functions. Using camelCase improves code readability and maintainability by creating clear, self-documenting variable names.\n\nHow to Use It?\nType or paste your text into the input area. The tool will instantly apply the camelCase transformation and display the result in the output box. It correctly handles multiple spaces, existing capitalization, and even punctuation to produce a clean, ready-to-use variable name. The instant feedback allows you to quickly format multiple strings without interrupting your coding session, making it a highly efficient part of any developer's toolkit.\n\nWhy is this Essential for Developers?\nPaPiv's case converters are designed for speed, accuracy, and privacy. As a developer, you can quickly format variable names without sending any potentially proprietary code to a server. The real-time, client-side processing ensures your workflow is never interrupted and your intellectual property remains secure. This tool is more than a converter; it's a productivity booster that enforces coding standards and helps you write cleaner code faster. For more on programming case conventions, see this helpful guide on Wikipedia.`,
  },
  {
    slug: 'text-to-snake-case',
    title: 'Snake Case Converter',
    description: 'Convert spaces to underscores with snake_case converter.',
    category: 'Transform',
    inputType: 'text',
    outputType: 'text',
    longDescription: `What is the Snake Case Converter?\nThis tool converts text into snake_case, a naming convention where all letters are lowercase and spaces are replaced with underscores (e.g., "Hello World" becomes "hello_world"). This casing style is extremely common in languages like Python for variable and function names, and in SQL for naming database tables and columns. Using snake_case improves the readability of code by making multi-word identifiers easy to read at a glance. It's a fundamental convention that promotes clean, maintainable code.\n\nHow to Use This Converter?\nSimply provide your text in the input box on the left. The output box on the right will immediately show the snake_cased version of your text. The process is automatic and instantaneous, handling various inputs like mixed case and multiple spaces gracefully. You can copy the result with a single click and paste it directly into your code editor or database management tool, saving you time and preventing manual errors.\n\nWhy Do Programmers Use Snake Case?\nOur tool provides a fast, secure, and reliable way to format your code and data according to established conventions. Because it runs entirely in your browser, you can be sure that your input is never logged, stored, or transmitted, ensuring complete privacy. It's a developer-friendly tool designed to be a seamless part of your coding toolkit. Adhering to conventions like snake_case is not just about style; it's about writing code that is easy for others (and your future self) to understand and maintain.`,
  },
  {
    slug: 'text-to-pascalcase',
    title: 'Pascal Case Converter',
    description: 'Format your text into PascalCase instantly.',
    category: 'Transform',
    inputType: 'text',
    outputType: 'text',
    longDescription: `What is the PascalCase Converter?\nPascalCase, also known as UpperCamelCase, is a naming convention where the first letter of each word in a compound identifier is capitalized (e.g., "hello world" becomes "HelloWorld"). This convention is a standard in many object-oriented programming languages, such as C#, Java, and TypeScript, for naming classes, interfaces, components, and types. It provides a clear visual distinction for top-level constructs in code, making the overall structure easier to parse and understand.\n\nHow to Use This Naming Tool?\nEnter your desired text into the input area. The tool will automatically convert it to PascalCase in the output area in real-time. It intelligently handles spaces, hyphens, and existing capitalization to generate a clean, compliant identifier. The instant conversion means you can format names on the fly without breaking your concentration, which is essential for maintaining high productivity during development.\n\nWhy Use PaPiv for Case Conversion?\nPaPiv ensures that your text formatting tasks are quick, accurate, and private. The PascalCase Converter works entirely client-side, making it a secure choice for developers and writers working with sensitive or proprietary information. The instant feedback loop allows for rapid and efficient work without context switching. By using this tool, you can easily maintain a consistent and professional coding style across your entire project, which is a hallmark of high-quality software engineering.`,
  },
  {
    slug: 'text-to-slug',
    title: 'URL Slug Generator',
    description: 'Transform titles into SEO-friendly URL slugs.',
    category: 'Transform',
    inputType: 'text',
    outputType: 'text',
    longDescription: `What is a URL Slug Generator?\nA URL slug is the part of a URL that identifies a particular page in a human-readable format. This tool converts any text, typically a page title or headline, into an SEO-friendly slug. A good slug is concise, descriptive, and easy to read for both users and search engines. Our tool achieves this by removing special characters, converting all text to lowercase, and replacing spaces with hyphens (e.g., "My Awesome Blog Post!" becomes "my-awesome-blog-post"). This is a critical step in on-page SEO.\n\nHow to Create SEO-Friendly Slugs?\nUsing the tool is simple. Paste your title or string into the input box on the left. The clean, URL-safe slug will be generated instantly in the output box, ready to be used in your CMS, e-commerce platform, or web application. You can then copy the generated slug with a single click. The tool ensures that there are no trailing hyphens or other characters that could negatively impact your search engine ranking.\n\nWhy are Clean URLs Important?\nCreating clean URLs is crucial for both Search Engine Optimization (SEO) and user experience. Descriptive slugs help search engines understand the content of a page, which can lead to better rankings. For users, a clean URL is easier to read, remember, and share. PaPiv's Slug Generator provides a reliable, instant, and private way to do this. Because it's a client-side tool, it's incredibly fast, and you can be confident that your page titles and content strategy remain confidential. To learn more about this topic, Moz has an excellent guide on URL structure.`,
  },
];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  const normalizedSlug = decodeURIComponent(slug).toLowerCase();
  return ALL_TOOLS.find((tool) => tool.slug.toLowerCase() === normalizedSlug);
}
