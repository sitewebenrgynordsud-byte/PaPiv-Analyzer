export type InputType = 'text' | 'json' | 'markdown' | 'number';
export type OutputType = 'text' | 'html' | 'csv' | 'json';

export interface ToolConfig {
  slug: string;
  title: string;
  description: string;
  category: string;
  inputType: InputType;
  outputType: OutputType;
  longDescription: string;
  externalReferences: { text: string; href: string }[];
}

export const ALL_TOOLS: ToolConfig[] = [
  {
    slug: 'text-statistics',
    title: 'Professional Text Statistics',
    description: 'Analyze word density, characters, and reading time instantly.',
    category: 'Analysis',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The Professional Text Statistics - Free Online Tool provides an instant, detailed analysis of any given text, breaking it down into key metrics. This includes word count, character count, number of lines, and an estimated reading time. By offering these insights, the tool helps you refine your writing to meet specific requirements and improve readability.

What is the Text Statistics Tool?
This utility is a powerful and free resource designed for writers, editors, students, and digital marketers. Unlike basic word counters, it offers a comprehensive suite of metrics that are crucial for content creation and analysis. It's built for speed and privacy, performing all calculations directly in your browser. This means your sensitive documents or proprietary content are never sent over the internet, guaranteeing 100% confidentiality. This free text statistics analyzer is an essential part of any content creator's toolkit, providing the data needed to make informed decisions about your writing.

How to Use It Effectively?
Using the tool is incredibly straightforward. Simply paste your text into the input area on the left. As you type or paste, the tool processes the content in real-time, and the full statistical breakdown appears instantly in the output area. For best results, analyze entire articles or sections to get a holistic view of your content's structure. You can use these text statistics to check if you are meeting the word count requirements for a blog post, an academic paper, or to gauge the overall complexity of your writing. The results are displayed in a clear, easy-to-read format, allowing you to quickly copy the information you need.

Common Use Cases
For Students and Academics, it helps ensure essays and papers meet length requirements and are structured for readability. For SEO Specialists and Marketers, it's a quick way to ensure content meets length guidelines for better search engine ranking and to optimize for user engagement. For Writers and Editors, it helps in maintaining a consistent writing style and quickly assessing the scope of a document. It's an indispensable utility for anyone who works with words.

Why is Text Analysis Essential?
In the digital age, content is king, and understanding its metrics is paramount. PaPiv's Text Statistics tool is built with privacy and speed as top priorities. For writers, it helps in maintaining a consistent writing style. For SEO specialists, it's a quick way to ensure content meets length guidelines. The instant feedback allows you to make quick adjustments, saving valuable time and effort in the editing process. By providing key data points at a glance, you can ensure your content is not just well-written, but also optimized for its intended audience and platform.`,
    externalReferences: [
        { text: "Nielsen Norman Group: Readability and Scannability", href: "https://www.nngroup.com/articles/how-users-read-on-the-web/" },
        { text: "Wikipedia: Readability", href: "https://en.wikipedia.org/wiki/Readability" }
    ],
  },
  {
    slug: 'json-to-csv',
    title: 'JSON to CSV Converter',
    description: 'Convert your JSON data into CSV format with ease.',
    category: 'Converter',
    inputType: 'json',
    outputType: 'csv',
    longDescription: `The JSON to CSV Converter - Free Online Tool is an essential utility for developers and data analysts who need to switch between data formats. It allows you to effortlessly convert structured JSON (JavaScript Object Notation) data into a tabular CSV (Comma-Separated Values) format.

What is the JSON to CSV Converter?
This tool is particularly useful when you need to import data from a web API into a spreadsheet application like Excel or Google Sheets for analysis. Our converter handles both single JSON objects and arrays of objects, making it a versatile tool for any data conversion task. It correctly parses nested structures and provides a clean, ready-to-use CSV output, saving you from writing complex scripts for simple conversion jobs.

How to Use This Converter?
To convert your data, paste your JSON content into the input field on the left. The tool immediately parses the JSON and generates the corresponding CSV output in the adjacent panel. The first row of the CSV will contain the headers, which are the keys extracted from your JSON objects. If your JSON structure is invalid, an error message will appear instantly to help you debug. The real-time nature of the tool means you get immediate feedback, streamlining your workflow significantly. There are no buttons to click or forms to submit.

Common Use Cases
Developers use this to quickly convert API responses into a format easily viewable by non-technical team members. Data Analysts use it to prepare datasets from web sources for import into analytical software. Business users can take exported JSON from various SaaS platforms and convert it for use in reports and presentations. It's a bridge between the structured data of the web and the tabular world of business analysis.

Why Use a Client-Side Converter?
Security and efficiency are at the core of PaPiv's tools. The JSON to CSV Converter processes all your data locally in your browser, so your sensitive business or personal information never leaves your machine. This commitment to client-side processing ensures complete data privacy, a critical feature when dealing with proprietary data. Plus, without server-side processing, the conversion is instantaneous.`,
    externalReferences: [
        { text: "JSON.org - Official Introduction to JSON", href: "https://www.json.org/json-en.html" },
        { text: "MDN Web Docs: Working with JSON", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON" }
    ],
  },
  {
    slug: 'text-to-lowercase',
    title: 'Lowercase Converter',
    description: 'Convert any text to lowercase.',
    category: 'Text',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The Lowercase Converter - Free Online Tool is a simple yet effective utility for converting any block of text into all lowercase letters. It handles all character sets and preserves spacing, ensuring the integrity of your original text structure.

What is the Lowercase Converter?
It's an indispensable tool for data cleaning, text normalization for natural language processing, or preparing content where a specific case format is required for consistency. Whether you're a programmer standardizing input data or a writer ensuring your headlines follow a specific style guide, this tool simplifies the task into a single step. It's a foundational text manipulation that is frequently required in data processing pipelines.

How to Use It Effectively?
Using the tool couldn't be easier. Paste any text you wish to convert into the input box on the left. The tool will instantly transform the entire text to lowercase and display it in the output box on the right. There's no need to click any buttons or wait for a server to respond. The transformation is immediate, allowing you to copy the result right away and continue with your work. This seamless experience is designed to be a frictionless part of your workflow.

Common Use Cases
Programmers use it to normalize user input or configuration values to prevent case-sensitive errors. Data scientists use it as a first step in text pre-processing before tokenization and analysis. Writers and editors use it to quickly fix blocks of text that were accidentally typed in all caps or to enforce a specific style guide.

Why is a Local Tool Better?
Like all PaPiv tools, the Lowercase Converter runs entirely on your local machine within your browser. Nothing is uploaded or stored on our servers. This client-side approach ensures your data remains completely private and the tool performs with zero delay. It provides an efficient and secure solution for basic text manipulation without the privacy risks associated with many online tools. For tasks like this, a fast, free, and private tool is always the superior choice for professionals who value their time and data security.`,
    externalReferences: [
        { text: "Wikipedia: Letter Case", href: "https://en.wikipedia.org/wiki/Letter_case" },
        { text: "MDN Web Docs: String.prototype.toLowerCase()", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase" }
    ],
  },
  {
    slug: 'text-to-camelcase',
    title: 'Camel Case Converter',
    description: 'Convert any text to camelCase format online.',
    category: 'Transform',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The Camel Case Converter - Free Online Tool transforms any string of words into camelCase format. In camelCase, the first word of a phrase is lowercase, while the first letter of every subsequent word is capitalized, with no spaces in between (e.g., "hello world" becomes "helloWorld").

What is the Camel Case Converter?
This casing convention is a cornerstone of many programming languages, most notably JavaScript, where it is the standard for naming variables and functions. Using camelCase improves code readability and maintainability by creating clear, self-documenting variable names. This developer utility correctly handles multiple spaces, existing capitalization, and even punctuation to produce a clean, ready-to-use variable name.

How to Use It?
Type or paste your text into the input area. The tool will instantly apply the camelCase transformation and display the result in the output box. The instant feedback allows you to quickly format multiple strings without interrupting your coding session, making it a highly efficient part of any developer's toolkit. It's designed to be fast, intuitive, and reliable.

Common Use Cases
This is primarily used by JavaScript, Java, and C# developers for naming variables, methods, and function parameters. It's also frequently used in JSON keys to maintain consistency across a codebase. Any scenario where programmatic identifiers need to be created from human-readable strings is a perfect use case for this tool.

Why is this Essential for Developers?
PaPiv's case converters are designed for speed, accuracy, and privacy. As a developer, you can quickly format variable names without sending any potentially proprietary code to a server. The real-time, client-side processing ensures your workflow is never interrupted and your intellectual property remains secure. This tool is more than a converter; it's a productivity booster that enforces coding standards and helps you write cleaner code faster.`,
    externalReferences: [
        { text: "Wikipedia: Camel Case", href: "https://en.wikipedia.org/wiki/Camel_case" },
        { text: "MDN Web Docs: Coding Style Guide", href: "https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide/Code_style_guide/JavaScript" }
    ],
  },
  {
    slug: 'text-to-snake-case',
    title: 'Snake Case Converter',
    description: 'Convert spaces to underscores with snake_case converter.',
    category: 'Transform',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The Snake Case Converter - Free Online Tool converts text into snake_case, a naming convention where all letters are lowercase and spaces are replaced with underscores (e.g., "Hello World" becomes "hello_world").

What is the Snake Case Converter?
This casing style is extremely common in languages like Python for variable and function names, and in SQL for naming database tables and columns. Using snake_case improves the readability of code by making multi-word identifiers easy to read at a glance. It's a fundamental convention that promotes clean, maintainable code by providing a clear visual separation between words in an identifier.

How to Use This Converter?
Simply provide your text in the input box on the left. The output box on the right will immediately show the snake_cased version of your text. The process is automatic and instantaneous, handling various inputs like mixed case and multiple spaces gracefully. You can copy the result with a single click and paste it directly into your code editor or database management tool, saving you time and preventing manual errors.

Common Use Cases
Python developers use snake_case for almost all variable and function names, as specified in the PEP 8 style guide. Database architects use it to name columns and tables for maximum readability in SQL queries. It's also used in configuration files (like YAML) and for URL parameters in some web frameworks.

Why Do Programmers Use Snake Case?
Our tool provides a fast, secure, and reliable way to format your code and data according to established conventions. Because it runs entirely in your browser, you can be sure that your input is never logged, stored, or transmitted, ensuring complete privacy. It's a developer-friendly tool designed to be a seamless part of your coding toolkit. Adhering to conventions like snake_case is not just about style; it's about writing code that is easy for others (and your future self) to understand and maintain.`,
    externalReferences: [
        { text: "Python PEP 8 -- Style Guide for Python Code", href: "https://peps.python.org/pep-0008/#function-and-variable-names" },
        { text: "Wikipedia: Snake Case", href: "https://en.wikipedia.org/wiki/Snake_case" }
    ],
  },
  {
    slug: 'text-to-pascalcase',
    title: 'Pascal Case Converter',
    description: 'Format your text into PascalCase instantly.',
    category: 'Transform',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The Pascal Case Converter - Free Online Tool formats text into PascalCase, also known as UpperCamelCase. This is a naming convention where the first letter of each word in a compound identifier is capitalized (e.g., "hello world" becomes "HelloWorld").

What is the PascalCase Converter?
This convention is a standard in many object-oriented programming languages, such as C#, Java, and TypeScript, for naming classes, interfaces, components, and types. It provides a clear visual distinction for top-level constructs in code, making the overall structure easier to parse and understand. It signals that an identifier represents a blueprint or a type, rather than an instance or a variable.

How to Use This Naming Tool?
Enter your desired text into the input area. The tool will automatically convert it to PascalCase in the output area in real-time. It intelligently handles spaces, hyphens, and existing capitalization to generate a clean, compliant identifier. The instant conversion means you can format names on the fly without breaking your concentration, which is essential for maintaining high productivity during development.

Common Use Cases
This is the standard for naming React components (e.g., \`MyComponent\`). In C# and Java, it's used for classes, interfaces, enums, and records. In TypeScript, it's used for type aliases and interfaces. Essentially, any time you are defining a "type" or a "construct," PascalCase is often the preferred convention.

Why Use PaPiv for Case Conversion?
PaPiv ensures that your text formatting tasks are quick, accurate, and private. The PascalCase Converter works entirely client-side, making it a secure choice for developers working with sensitive or proprietary information. The instant feedback loop allows for rapid and efficient work without context switching. By using this tool, you can easily maintain a consistent and professional coding style across your entire project, which is a hallmark of high-quality software engineering.`,
    externalReferences: [
        { text: "React Docs: Component Naming", href: "https://react.dev/learn/your-first-component#naming-a-component" },
        { text: "Microsoft C# Coding Conventions", href: "https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions#pascal-case" }
    ],
  },
  {
    slug: 'text-to-slug',
    title: 'URL Slug Generator',
    description: 'Transform titles into SEO-friendly URL slugs.',
    category: 'Transform',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The URL Slug Generator - Free Online Tool converts any text, typically a page title or headline, into an SEO-friendly slug. A good slug is concise, descriptive, and easy to read for both users and search engines.

What is a URL Slug Generator?
A URL slug is the part of a URL that identifies a particular page in a human-readable format. Our tool achieves SEO-friendliness by removing special characters, converting all text to lowercase, and replacing spaces with hyphens (e.g., "My Awesome Blog Post!" becomes "my-awesome-blog-post"). This is a critical step in on-page SEO and for creating a user-friendly site architecture. It ensures that your URLs are clean, predictable, and optimized for search.

How to Create SEO-Friendly Slugs?
Using the tool is simple. Paste your title or string into the input box on the left. The clean, URL-safe slug will be generated instantly in the output box, ready to be used in your CMS, e-commerce platform, or web application. You can then copy the generated slug with a single click. The tool ensures that there are no trailing hyphens or other characters that could negatively impact your search engine ranking.

Common Use Cases
Bloggers and content marketers use it to create clean URLs for their articles. E-commerce managers use it to generate product page URLs from product names. Web developers use it to programmatically create routes from dynamic content, such as user-generated profile names or page titles. It's a fundamental utility for any content-driven website.

Why are Clean URLs Important?
Creating clean URLs is crucial for both Search Engine Optimization (SEO) and user experience. Descriptive slugs help search engines understand the content of a page, which can lead to better rankings. For users, a clean URL is easier to read, remember, and share. PaPiv's Slug Generator provides a reliable, instant, and private way to do this. Because it's a client-side tool, it's incredibly fast, and you can be confident that your page titles and content strategy remain confidential.`,
    externalReferences: [
        { text: "Moz: SEO Best Practices for URL Structure", href: "https://moz.com/learn/seo/url" },
        { text: "Google Search Central: Keep a simple URL structure", href: "https://developers.google.com/search/docs/crawling-indexing/url-structure" }
    ],
  },
  {
    slug: 'html-entity-converter',
    title: 'HTML Entity Encoder/Decoder',
    description: 'Convert HTML characters to entities and vice-versa safely.',
    category: 'Dev',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The HTML Entity Encoder/Decoder is a crucial tool for web developers working with content that may contain special characters. It provides a real-time, dual-function utility to convert standard characters into their corresponding HTML entities (encoding) and vice-versa (decoding).

What is the HTML Entity Converter?
This tool helps prevent security vulnerabilities like Cross-Site Scripting (XSS) by encoding characters such as <, >, &, ", and ' into their safe HTML entity equivalents (e.g., &lt;, &gt;, &amp;). It also allows you to decode entities back into their original characters to display them correctly. The tool automatically detects whether your input text needs encoding or decoding, providing an intelligent and seamless experience.

How to Use It Effectively?
Simply paste your text or HTML snippet into the input area. If the tool detects HTML entities, it will decode them. If it detects raw special characters, it will encode them. The result appears instantly in the output panel. This is perfect for sanitizing user-generated content before rendering it on a page or for cleaning up encoded text that you need to edit.

Common Use Cases
Web developers use this daily to handle data from databases or APIs that will be displayed on a webpage. Content managers use it to fix display issues when special characters are not rendering correctly. It's an essential step for ensuring that dynamic data doesn't break your site's layout or introduce security risks.

Why is a Client-Side Tool Essential?
Security and speed are paramount. Because all processing happens in your browser, your data is never sent to a server, making it a completely private and secure way to handle potentially sensitive information. The instant processing saves you time and streamlines your development workflow.`,
    externalReferences: [
      { text: "OWASP: Cross-Site Scripting (XSS)", href: "https://owasp.org/www-community/attacks/xss/" },
      { text: "MDN Web Docs: HTML Entities", href: "https://developer.mozilla.org/en-US/docs/Glossary/Entity" }
    ],
  },
  {
    slug: 'base64-converter',
    title: 'Base64 Text Encoder/Decoder',
    description: 'Securely encode and decode text to Base64 format online.',
    category: 'Dev',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The Base64 Text Encoder/Decoder provides a fast and secure way to encode plain text into Base64 and decode Base64 strings back into their original text format. It intelligently auto-detects the input to provide the correct output.

What is the Base64 Converter?
Base64 is an encoding scheme that represents binary data in an ASCII string format. It's commonly used to transmit data over media that are designed to handle text. This tool provides a simple interface to perform this encoding and decoding without needing command-line tools or writing scripts. It's a fundamental utility for developers working with data transfer, APIs, and file embedding.

How to Use This Converter?
Paste your text into the input field. If you enter plain text, the tool will encode it into Base64. If you enter a valid Base64 string, the tool will decode it back to plain text. The conversion happens instantly in your browser. This automatic detection makes it incredibly easy to use, whether you're encoding a secret for an API header or decoding a a data URI.

Common Use Cases
Developers use Base64 to embed binary data, like images or fonts, directly into CSS or HTML files (data URIs). It's also used for basic authentication in HTTP headers and for sending attachments in emails. Any time you need to safely transmit data that might otherwise be misinterpreted as control characters, Base64 is a common solution.

Why is Privacy Important for this Tool?
When you're encoding or decoding potentially sensitive information, such as API keys or authorization tokens, you need to be sure that data isn't being logged or stored on a server. PaPiv's tool is 100% client-side, meaning your data never leaves your computer. This provides the privacy and security needed for professional development work, combined with the instant speed of in-browser processing.`,
    externalReferences: [
      { text: "MDN Web Docs: btoa() and atob()", href: "https://developer.mozilla.org/en-US/docs/Web/API/btoa" },
      { text: "RFC 4648: The Base16, Base32, and Base64 Data Encodings", href: "https://datatracker.ietf.org/doc/html/rfc4648" }
    ],
  },
  {
    slug: 'lorem-ipsum-generator',
    title: 'Lorem Ipsum Generator',
    description: 'Generate professional placeholder text for your designs and layouts.',
    category: 'Design',
    inputType: 'number',
    outputType: 'text',
    longDescription: `The Lorem Ipsum Generator is a quick and easy tool for creating placeholder text, also known as "dummy text" or "filler text." It's an indispensable resource for designers, developers, and content creators who need to visualize a layout before the final content is ready.

What is Lorem Ipsum?
Lorem Ipsum is a form of placeholder text that has been used by the printing and typesetting industry since the 1500s. It's derived from a Latin text by Cicero but is deliberately nonsensical, which prevents viewers from being distracted by the content itself. This allows them to focus on the visual elements of a design, such as typography, layout, and spacing.

How to Use the Generator?
Enter the number of paragraphs you wish to generate into the input field. The tool will instantly create that amount of well-structured Lorem Ipsum text in the output area. You can then copy the text with a single click and paste it into your design mockups, wireframes, or development projects. If you leave the input empty, it will generate a default number of paragraphs.

Common Use Cases
Web designers use it to fill out website mockups to demonstrate how a page will look with content. UI/UX designers use it in wireframes and prototypes to test layouts and user flows. Developers use it to populate a user interface during development before real data is available from an API. It's a standard part of the design and development process.

Why Use a Generator?
Manually copying and pasting placeholder text is tedious and repetitive. This generator provides a fast, reliable, and customizable way to get the exact amount of text you need. Like all PaPiv tools, it runs entirely in your browser, making it incredibly fast and completely private. It's a simple utility that saves time and helps create more professional-looking design presentations.`,
    externalReferences: [
      { text: "Lipsum.com - The original Lorem Ipsum generator", href: "https://www.lipsum.com/" },
      { text: "Wikipedia: Lorem Ipsum", href: "https://en.wikipedia.org/wiki/Lorem_ipsum" }
    ],
  },
  {
    slug: 'url-encoder-decoder',
    title: 'Smart URL Encoder & Decoder',
    description: 'Convert text to URL-safe format or decode URLs back to normal text.',
    category: 'Web',
    inputType: 'text',
    outputType: 'text',
    longDescription: `What is the Smart URL Encoder & Decoder?
Our Smart URL Encoder & Decoder is a web utility for converting strings into a URL-safe format and vice versa. URL encoding, also known as percent-encoding, ensures that data sent in a URL is correctly transmitted and interpreted. It replaces unsafe ASCII characters (like spaces, &, or +) with a '%' followed by two hexadecimal digits. Our "smart" tool automatically detects whether your input string needs to be encoded or decoded, saving you a step. If it sees a '%' character, it assumes you want to decode; otherwise, it encodes.

How to use the Smart URL Encoder & Decoder effectively?
Using this tool is designed to be effortless for developers. Paste any string or URL parameter into the input box. For example, if you paste "search?q=a&b", it will be instantly converted to "search%3Fq%3Da%26b". Conversely, pasting the encoded version will decode it back to the original text. This real-time, bidirectional conversion is crucial for debugging query strings, creating dynamic links, or inspecting data sent in API requests. There are no buttons to press, making the workflow incredibly fast and efficient for any web development task.

Why is the Smart URL Encoder & Decoder essential for developers?
Proper URL encoding is fundamental to web development for data integrity and security. Without it, special characters in a URL can be misinterpreted by browsers or servers, leading to broken links, incorrect data processing, or even security vulnerabilities. Our Smart URL Encoder & Decoder provides a quick, reliable, and privacy-focused way to handle this. Since it runs entirely in your browser, your data is never sent to a server. This is essential for developers who need a fast, secure utility for handling URL data without any risk.`,
    externalReferences: [
      { text: 'MDN Web Docs: encodeURIComponent()', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent' }
    ]
  },
  {
    slug: 'text-to-binary',
    title: 'Text to Binary Converter',
    description: 'Translate text characters into 0s and 1s (Binary code) instantly.',
    category: 'Education',
    inputType: 'text',
    outputType: 'text',
    longDescription: `What is the Text to Binary Converter?
The Text to Binary Converter is an educational and practical tool that translates human-readable text into binary code—the fundamental language of computers, represented by 0s and 1s. Each character you type is converted into its corresponding 8-bit ASCII or UTF-8 value, and then that value is represented in binary. For example, the letter "A" becomes "01000001". This tool provides a direct window into how computers store and process textual information at the most basic level, making it invaluable for students and programmers.

How to use the Text to Binary Converter effectively?
To use the converter, simply type or paste any text into the input field. The tool will instantly provide a real-time translation into binary code in the output area, with each 8-bit binary number separated by a space for readability. You can use this to learn how different characters are represented, to create encoded messages, or to understand data representation in computer science. The immediate feedback helps solidify the connection between abstract characters and their concrete binary counterparts, which is a core concept in computing.

Why is the Text to Binary Converter essential for learning?
Understanding binary is a cornerstone of computer literacy. It demystifies how computers handle everything from simple text to complex software. Our Text to Binary Converter makes this concept tangible and interactive. It's an excellent resource for computer science students, aspiring programmers, or anyone curious about the inner workings of digital technology. By seeing the direct translation, users can grasp the standardized nature of character encoding (like ASCII) and appreciate the binary system's foundational role. As a client-side tool, it's fast, private, and accessible to anyone, anywhere.`,
    externalReferences: [
      { text: 'Wikipedia: Binary Code', href: 'https://en.wikipedia.org/wiki/Binary_code' }
    ]
  },
  {
    slug: 'hex-to-rgb',
    title: 'Hex to RGB Color Converter',
    description: 'Convert Hexadecimal color codes (#FF0000) to RGB values (rgb(255, 0, 0)).',
    category: 'Design',
    inputType: 'text',
    outputType: 'text',
    longDescription: `What is the Hex to RGB Color Converter?
The Hex to RGB Color Converter is an essential utility for web developers and designers. It translates hexadecimal color codes (e.g., #FF5733) into the corresponding RGB format (e.g., rgb(255, 87, 51)). Hex and RGB are two of the most common ways to define colors in web design and CSS. This tool seamlessly bridges the gap between them, supporting both 3-digit (#F0C) and 6-digit (#FF00CC) hex codes. It provides a quick and error-free way to manage color values across different platforms and tools.

How to use the Hex to RGB Color Converter effectively?
Using the converter is simple: just paste your hex code into the input field (with or without the "#"). The corresponding RGB value will appear instantly in the output field. This is perfect for when a design tool provides a hex code, but your CSS or JavaScript framework requires an RGB value, perhaps for use with an 'rgba()' function to control opacity. The real-time conversion removes any guesswork and ensures you get the exact color you need without manual calculations, streamlining your design and development workflow.

Why is the Hex to RGB Color Converter essential for designers?
Color consistency is key to professional web design. While many modern tools support both Hex and RGB, there are still many instances where conversion is necessary. The Hex to RGB Color Converter ensures you can work with any color format you're given, maintaining brand consistency across a website or application. It’s a fundamental tool for front-end developers, UI designers, and digital artists who need to speak the language of web colors fluently. Since this tool runs entirely client-side, it's incredibly fast and guarantees that your color palettes and design information remain private.`,
    externalReferences: [
      { text: 'W3Schools: CSS Colors', href: 'https://www.w3schools.com/css/css_colors.asp' }
    ]
  },
  {
    slug: 'reverse-text',
    title: 'Reverse Text Generator',
    description: 'Flip your text backwards instantly. Great for social media fun.',
    category: 'Text',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The Reverse Text Generator is a simple and fun utility that flips any given text backward. It's a great way to create quirky social media posts, encode simple messages for puzzles, or just see how words and sentences look in mirror image. While not a form of strong cryptography, reversing text is a basic type of transposition cipher and can be a fun first step into understanding how ciphers work. The effect is similar to mirror writing, a script style famously used by Leonardo da Vinci. Use it to create funny usernames, surprise your friends, or add a twist to your online content. This tool processes everything instantly in your browser, ensuring your text remains private.`,
    externalReferences: [
      { text: 'Wikipedia: Mirror Writing', href: 'https://en.wikipedia.org/wiki/Mirror_writing' }
    ]
  },
  {
    slug: 'random-password-generator',
    title: 'Strong Random Password Generator',
    description: 'Generate secure, random passwords instantly to protect your accounts.',
    category: 'Security',
    inputType: 'number',
    outputType: 'text',
    longDescription: `The Strong Random Password Generator is a critical security tool for creating robust, unpredictable passwords to protect your online accounts. In an age of constant cyber threats, using weak or reused passwords is a significant risk. This tool generates passwords using a large character set including letters, numbers, and symbols, significantly increasing the password's entropy and making it resistant to brute-force attacks. The longer and more random the password, the harder it is to crack. Adhering to modern security standards, like those from NIST, means focusing on length and randomness over complex, hard-to-remember rules. Use this generator to create secure passwords for all your sensitive accounts. Because it runs client-side, the generated passwords are never sent over the internet.`,
    externalReferences: [
      { text: 'NIST Password Guidelines', href: 'https://www.nist.gov/itl/applied-cybersecurity/privacy-engineering/guidance-and-responsibilities/templates/password-guidelines' }
    ]
  },
  {
    slug: 'uuid-generator',
    title: 'UUID v4 Generator',
    description: 'Generate unique identifiers (UUIDs) for your database or software projects.',
    category: 'Dev',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The UUID v4 Generator creates universally unique identifiers, which are 128-bit numbers used to uniquely identify information in computer systems. Version 4 UUIDs are generated using random numbers, making them ideal for use as primary keys in databases, unique transaction IDs, or for any scenario where you need a unique identifier without relying on a central authority to issue it. The probability of a collision (two generated UUIDs being the same) is astronomically low, making them a reliable choice for distributed systems. This tool uses the browser's built-in \`crypto\` API for generating cryptographically strong random UUIDs, ensuring the highest level of randomness and uniqueness for your software projects.`,
    externalReferences: [
      { text: 'IETF RFC 4122', href: 'https://www.ietf.org/rfc/rfc4122.txt' }
    ]
  },
  {
    slug: 'json-minifier',
    title: 'JSON Minifier & Compressor',
    description: 'Compress your JSON data by removing whitespace to reduce file size.',
    category: 'Dev',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The JSON Minifier & Compressor is an essential tool for web developers looking to optimize their data transfer. It reduces the size of JSON files by removing all unnecessary whitespace, such as spaces, tabs, and newlines. This process, known as minification, results in a smaller file size, which leads to faster API response times and reduced bandwidth consumption. Smaller payloads are critical for mobile applications and users with slower internet connections. By compressing your JSON, you can significantly improve the performance of your web services. This tool validates the JSON before minifying, ensuring that the output is both compact and syntactically correct, ready for use in a production environment.`,
    externalReferences: [
      { text: 'JSON.org', href: 'https://www.json.org/json-en.html' }
    ],
  },
  {
    slug: 'css-minifier',
    title: 'CSS Minifier Online',
    description: 'Minify CSS code instantly to improve website loading speed.',
    category: 'Dev',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The CSS Minifier Online tool is a crucial utility for front-end developers focused on web performance. It compresses your CSS code by stripping out all non-essential characters, including comments, whitespace, and newlines, without affecting how the code is processed by the browser. Minifying CSS files leads to smaller file sizes, which in turn results in faster page load times. This is a key factor in improving user experience and boosting your site's Core Web Vitals scores, which can positively impact your SEO rankings. A faster website is a better website, and minifying your stylesheets is a simple yet highly effective optimization technique.`,
    externalReferences: [
      { text: 'MDN Web Docs: Minification', href: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Minification' }
    ],
  },
  {
    slug: 'sql-minifier',
    title: 'SQL Query Minifier',
    description: 'Compress SQL queries into a single line for cleaner code embedding.',
    category: 'Data',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The SQL Query Minifier is a handy tool for database administrators and developers who need to compress their SQL statements. It works by removing comments and collapsing all whitespace into single spaces, effectively converting a long, formatted query into a single, compact line. This is particularly useful when embedding SQL queries directly into application code (e.g., in a string variable), as it makes the code cleaner and less cluttered. It can also help in preparing queries for logging or transmission where newlines might cause issues. While it doesn't optimize the query's execution plan, it significantly improves the readability of the surrounding application code.`,
    externalReferences: [
      { text: 'Wikipedia: SQL Syntax', href: 'https://en.wikipedia.org/wiki/SQL_syntax' }
    ],
  },
  {
    slug: 'jwt-decoder',
    title: 'JWT Token Decoder',
    description: 'Decode JSON Web Tokens (JWT) instantly to view the header and payload.',
    category: 'Security',
    inputType: 'text',
    outputType: 'json',
    longDescription: `The JWT Token Decoder is a vital utility for developers working with modern authentication systems. It allows you to paste a JSON Web Token (JWT) and instantly see the decoded header and payload. This is essential for debugging authentication flows, verifying the contents of an ID token from an OAuth provider, or inspecting the claims (like user roles and permissions) embedded within a token. The tool does not validate the token's signature, as that requires a secret key; its purpose is to inspect the public parts of the token safely. It's a quick and secure way to look inside a JWT without sending sensitive tokens to a third-party server, as all decoding happens client-side.`,
    externalReferences: [
      { text: 'jwt.io - Introduction to JSON Web Tokens', href: 'https://jwt.io/introduction' }
    ]
  },
  {
    slug: 'rgb-to-hex',
    title: 'RGB to Hex Color Converter',
    description: 'Convert RGB values like rgb(255, 0, 0) to Hexadecimal codes (#FF0000).',
    category: 'Design',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The RGB to Hex Color Converter is a simple but essential tool for designers and front-end developers. It translates RGB color values (e.g., "rgb(255, 87, 51)") into their hexadecimal equivalent (e.g., "#FF5733"). While RGB is often more intuitive for picking colors, Hex is more compact and widely used in CSS and design systems. This converter bridges the gap, allowing you to easily switch between the two formats to maintain color consistency in your projects. Whether you're pulling a color from a design mockup or converting a color for a specific library, this tool ensures you get the exact hex code you need instantly.`,
    externalReferences: [
      { text: 'MDN Web Docs: <color>', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS/color_value' }
    ]
  },
  {
    slug: 'unix-timestamp-converter',
    title: 'Unix Timestamp to Date',
    description: 'Convert Unix Epoch timestamps to human-readable dates and UTC time.',
    category: 'Dev',
    inputType: 'number',
    outputType: 'text',
    longDescription: `The Unix Timestamp Converter is a crucial developer utility for making sense of time-based data. A Unix timestamp (or Epoch time) represents a point in time as the number of seconds that have elapsed since January 1, 1970 (UTC). This format is widely used in server logs, databases, and APIs because it's a simple, universal number. This tool converts that number into a human-readable date and time, showing both UTC and your local time zone. It's invaluable for debugging server logs, checking when an API key expires, or understanding the timestamps in a database record. The tool handles both seconds and millisecond-precision timestamps automatically.`,
    externalReferences: [
      { text: 'Wikipedia: Unix Time', href: 'https://en.wikipedia.org/wiki/Unix_time' }
    ]
  },
  {
    slug: 'remove-duplicate-lines',
    title: 'Remove Duplicate Lines',
    description: 'Instantly remove repeated lines from your text or data lists.',
    category: 'Data',
    inputType: 'text',
    outputType: 'text',
    longDescription: 'The Remove Duplicate Lines tool is a powerful utility for data cleaning and list management. It instantly processes any text input and removes all repeated lines, providing you with a clean, unique list. This is essential for SEO specialists organizing keyword lists, marketers cleaning up email subscriber lists before a campaign, or developers deduplicating log files. By ensuring every line is unique, you can prevent errors, improve data quality, and make your datasets more manageable. The tool is designed for performance, using efficient algorithms to handle large lists with ease, all within the privacy of your browser.',
    externalReferences: [
      { text: 'Data Cleansing on Wikipedia', href: 'https://en.wikipedia.org/wiki/Data_cleansing' },
    ],
  },
  {
    slug: 'sort-lines',
    title: 'Sort Lines Alphabetically',
    description: 'Organize your text lists instantly from A to Z (or Z to A).',
    category: 'Data',
    inputType: 'text',
    outputType: 'text',
    longDescription: 'The Sort Lines Alphabetically tool provides a quick and easy way to organize text-based lists. Whether you have a list of names, URLs, or any other data, this utility will sort them in ascending (A-Z) alphabetical order instantly. This is invaluable for developers working with configuration files, writers organizing notes, or anyone needing to bring order to unstructured text. The tool uses a locale-aware comparison, ensuring that sorting is accurate across different languages and character sets. It\'s a fundamental building block for any data organization task, running securely in your browser.',
    externalReferences: [
      { text: 'MDN Web Docs: Array.prototype.sort()', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort' },
    ],
  },
  {
    slug: 'email-extractor',
    title: 'Email Address Extractor',
    description: 'Extract all email addresses from a large block of text instantly.',
    category: 'Marketing',
    inputType: 'text',
    outputType: 'text',
    longDescription: 'The Email Address Extractor is a must-have tool for sales and marketing professionals. It automatically scans a large block of text—such as a document, web page source, or log file—and extracts all valid email addresses it finds. This is incredibly useful for lead generation, compiling contact lists from unstructured sources, or recovering emails from a corrupted file. The tool uses a robust regular expression to accurately identify email patterns while ignoring other text. It also ensures that the final list contains only unique email addresses, saving you the extra step of deduplication. All processing is done in your browser for maximum privacy.',
    externalReferences: [
      { text: 'Regular Expressions Info: Email Validation', href: 'https://www.regular-expressions.info/email.html' },
    ],
  },
  {
    slug: 'html-tags-remover',
    title: 'Strip HTML Tags',
    description: 'Remove all HTML tags from a text block, leaving only the plain text content.',
    category: 'Web',
    inputType: 'text',
    outputType: 'text',
    longDescription: "The HTML Tags Remover, also known as a stripper, is a powerful utility for cleaning up web content. It meticulously removes all HTML and XML tags from a block of text, leaving you with only the plain, unformatted content. This is incredibly useful for content managers who need to migrate articles from one CMS to another, for SEO analysts who want to analyze the pure text of a page without the noise of markup, or for developers who need to extract data from a web page. By stripping away the tags, you can prepare text for natural language processing, count words accurately, or simply reformat it for a different medium. This tool provides a quick, reliable, and client-side method to get clean text from complex HTML documents.",
    externalReferences: [
      { text: 'MDN Web Docs: Introduction to HTML', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' }
    ],
  },
  {
    slug: 'list-randomizer',
    title: 'Random List Shuffler',
    description: 'Randomize the order of lines in your list instantly. Perfect for raffles or sampling.',
    category: 'Data',
    inputType: 'text',
    outputType: 'text',
    longDescription: "The Random List Shuffler is a simple yet powerful tool for randomizing the order of any list of items. It uses a version of the well-regarded Fisher-Yates shuffle algorithm, a provably unbiased method for generating a random permutation of a finite sequence. This ensures that every possible ordering is equally likely. This tool is perfect for teachers creating random groups, organizers running a raffle or giveaway, or researchers needing to select a random sample from a dataset. Just paste your list (with one item per line), and the tool will instantly give you a shuffled version. Because it runs entirely in your browser, you can be sure the randomization process is both instantaneous and secure.",
    externalReferences: [
      { text: 'Wikipedia: Fisher–Yates shuffle', href: 'https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle' }
    ],
  },
  {
    slug: 'morse-code-translator',
    title: 'Text to Morse Code',
    description: 'Translate normal text into Morse Code dots and dashes (e.g., ... --- ...).',
    category: 'Education',
    inputType: 'text',
    outputType: 'text',
    longDescription: "The Text to Morse Code translator converts standard text into the historic system of dots and dashes developed by Samuel Morse in the 1830s. Morse code revolutionized long-distance communication by encoding the alphabet into a binary-like signal that could be transmitted over telegraph wires. Each character is represented by a unique sequence of short signals (dots) and long signals (dashes). Our tool provides an instant translation, making it a fun way to learn this important piece of telecommunication history, create puzzles, or send encoded messages. It's a fantastic educational utility that demonstrates the foundational principles of encoding information for transmission, a concept that is still at the heart of all modern digital communication.",
    externalReferences: [
      { text: 'Wikipedia: Samuel Morse', href: 'https://en.wikipedia.org/wiki/Samuel_Morse' }
    ],
  },
  {
    slug: 'text-to-hex',
    title: 'Text to Hex Converter',
    description: 'Convert text characters into Hexadecimal format instantly.',
    category: 'Dev',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The Text to Hex Converter is a developer utility for converting plain text into its hexadecimal representation. Each character in the input string is converted into its corresponding ASCII/UTF-8 value, which is then displayed as a two-digit hexadecimal number. This is useful for low-level programming, data analysis, or debugging, where you need to see the exact byte representation of a string. Hexadecimal is often preferred over binary because it is more compact and easier to read. Our tool makes this conversion immediate and error-free, providing a clear view of your data's underlying structure.`,
    externalReferences: [
      { text: 'Wikipedia: Hexadecimal', href: 'https://en.wikipedia.org/wiki/Hexadecimal' }
    ],
  },
  {
    slug: 'credit-card-validator',
    title: 'Credit Card Validator (Luhn Check)',
    description: 'Validate credit card numbers safely using the Luhn algorithm. 100% Client-side, no data is saved.',
    category: 'Security',
    inputType: 'number',
    outputType: 'text',
    longDescription: `The Credit Card Validator uses the Luhn algorithm (also known as the "modulus 10" or "mod 10" algorithm) to perform a checksum validation on a credit card number. It's a simple error-detection formula used to validate a variety of identification numbers. This tool is NOT a payment gateway; it does not check if a card is active or has funds. It only checks if the number is mathematically plausible. This is extremely useful for developers testing e-commerce checkout forms or validating user input to prevent simple typos. Crucially, this validation is performed 100% client-side in your browser, meaning the card number you enter is never saved, stored, or transmitted.`,
    externalReferences: [
      { text: 'Wikipedia: Luhn algorithm', href: 'https://en.wikipedia.org/wiki/Luhn_algorithm' }
    ],
  },
  {
    slug: 'url-parser',
    title: 'Advanced URL Parser',
    description: 'Extract the protocol, host, path, and query parameters from any URL.',
    category: 'Web',
    inputType: 'text',
    outputType: 'json',
    longDescription: `The Advanced URL Parser is a powerful tool for developers, marketers, and SEO analysts. It deconstructs any given URL into its constituent parts: protocol, hostname, path, and query parameters. This is incredibly useful for debugging broken links, analyzing tracking parameters in marketing campaigns (like UTM codes), or understanding the structure of a competitor's website. By breaking down the URL into a structured JSON format, the tool makes it easy to see exactly what data is being passed in the query string. This is essential for testing API endpoints, troubleshooting web applications, or simply gaining a clearer understanding of how a specific URL works.`,
    externalReferences: [
      { text: 'MDN Web Docs: URL API', href: 'https://developer.mozilla.org/en-US/docs/Web/API/URL' }
    ],
  },
  {
    slug: 'title-case-converter',
    title: 'Title Case Converter',
    description: 'Capitalize the first letter of every word instantly. Perfect for blog titles and essays.',
    category: 'Text',
    inputType: 'text',
    outputType: 'text',
    longDescription: `Title case is essential for creating professional and readable headlines for blogs, articles, and essays. Following a consistent capitalization style, such as AP Style or Chicago Manual of Style, enhances the perceived quality of your content and improves user experience. Search engines may also favor well-formatted titles, as they appear more trustworthy and clickable in search results. This Title Case Converter tool automates the process, ensuring every word is correctly capitalized according to standard rules, saving writers and editors valuable time while helping them maintain a high standard of presentation for their digital content. It's a simple yet powerful utility for anyone serious about content creation.`,
    externalReferences: [
      { text: 'APA Style: Title Case Capitalization', href: 'https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case' },
    ],
  },
  {
    slug: 'remove-extra-spaces',
    title: 'Remove Extra Spaces & Whitespace',
    description: 'Clean up messy text by removing double spaces, tabs, and empty lines.',
    category: 'Text',
    inputType: 'text',
    outputType: 'text',
    longDescription: `Raw text copied from PDFs, emails, or other sources often contains inconsistent and messy whitespace. This can include multiple spaces between words, unwanted tabs, and extra line breaks that disrupt formatting. The Remove Extra Spaces tool is a powerful data-cleaning utility that normalizes your text in a single step. It collapses multiple spaces and tabs into a single space and removes empty lines, creating clean, predictable content. This is crucial for content managers preparing text for a CMS, developers cleaning user input, or data analysts standardizing datasets. Clean text ensures consistent rendering, improves readability, and prevents formatting errors in downstream applications.`,
    externalReferences: [
        { text: 'Wikipedia: Data Cleansing', href: 'https://en.wikipedia.org/wiki/Data_cleansing' },
    ],
  },
  {
    slug: 'json-formatter',
    title: 'JSON Formatter & Beautifier',
    description: 'Format and beautify ugly, unreadable JSON code into a clean, indented structure.',
    category: 'Dev',
    inputType: 'json',
    outputType: 'json',
    longDescription: `JSON (JavaScript Object Notation) is the standard for data exchange on the web, but API responses or configuration files are often "minified"—compressed into a single line to save space. This makes them nearly impossible for a human to read and debug. The JSON Formatter & Beautifier solves this problem by parsing the minified JSON and reformatting it into a clean, indented, and hierarchical structure. This "pretty printing" is essential for developers to visually inspect the data, identify syntax errors like missing brackets or quotes, and understand the relationship between different data points. It is a fundamental debugging tool for anyone working with web APIs.`,
    externalReferences: [
        { text: 'MDN Web Docs: JSON', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON' },
    ],
  },
  {
    slug: 'extract-urls',
    title: 'Extract URLs from Text',
    description: 'Instantly find and extract all http and https web links from any messy text document.',
    category: 'Data',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The Extract URLs from Text tool is a powerful utility for data scraping and analysis. It scans any block of text and pulls out all http and https links, presenting them in a clean, deduplicated list. This is invaluable for SEO specialists performing backlink audits, marketers gathering resource links from articles, or developers needing to extract all linked assets from a document. The tool uses a reliable regular expression to ensure it captures valid URLs without grabbing surrounding punctuation. By running entirely in your browser, it offers a secure and incredibly fast way to parse large documents for web links without sending any data to an external server.`,
    externalReferences: [
      { text: 'Stack Overflow: What is a good regular expression to match a URL?', href: 'https://stackoverflow.com/questions/1500260/what-is-a-good-regular-expression-to-match-a-url' }
    ],
  },
  {
    slug: 'remove-empty-lines',
    title: 'Remove Empty Lines',
    description: 'Clean up your text by removing all blank lines and extra line breaks instantly.',
    category: 'Text',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The Remove Empty Lines tool is a simple but essential text-cleaning utility. It instantly removes all blank lines from a document, which is particularly useful when dealing with content copied from PDFs, websites, or other sources that add inconsistent line breaks. By eliminating extra vertical whitespace, you can create a more compact and readable text file. This is crucial for developers cleaning up configuration files, writers reformatting manuscripts, or anyone needing to standardize a document's line spacing. This tool ensures your text is clean and consistently formatted, ready for its next use, all while operating securely within your browser.`,
    externalReferences: [
      { text: 'Wikipedia: Newline', href: 'https://en.wikipedia.org/wiki/Newline' }
    ],
  },
  {
    slug: 'rot13-cipher',
    title: 'ROT13 Encoder & Decoder',
    description: 'Encrypt or decrypt your text using the classic ROT13 substitution cipher.',
    category: 'Security',
    inputType: 'text',
    outputType: 'text',
    longDescription: `ROT13 ("rotate by 13 places") is a simple letter substitution cipher that replaces a letter with the letter 13 places after it in the alphabet. Applying ROT13 to a piece of text a second time restores the original text; this is its own inverse. It's a classic example of a Caesar cipher. Made famous on early internet forums like Usenet in the 1980s, ROT13 was used to hide spoilers, punchlines, or potentially offensive material from a casual glance. It offers no real cryptographic security and should not be used for anything sensitive. Our tool provides a quick and fun way to both encode and decode ROT13 messages, offering a glimpse into early internet culture and basic cryptography.`,
    externalReferences: [
      { text: 'Wikipedia: ROT13', href: 'https://en.wikipedia.org/wiki/ROT13' }
    ],
  },
  {
    slug: 'list-to-comma-separator',
    title: 'List to Comma Separated String',
    description: 'Convert a vertical column of text into a single comma-separated line instantly.',
    category: 'Data',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The 'List to Comma Separated String' tool is a massive time-saver for data professionals. It instantly converts vertical columns of text, like those copied from Excel or a text file, into a single, clean, comma-separated line. This is incredibly useful for developers who need to format a list of IDs for a SQL 'IN' clause, or for marketers compiling keywords into a single tag string. It eliminates the tedious manual work of adding commas and removing line breaks, preventing syntax errors and improving workflow efficiency. By handling data formatting in a single click, it's an essential utility for anyone working with list-based data for databases, programming, or content management systems.`,
    externalReferences: [
      { text: 'MDN Web Docs: Array.prototype.join()', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join' }
    ],
  },
  {
    slug: 'string-escaper',
    title: 'Text String Escaper',
    description: 'Safely escape quotes, backslashes, and newlines in your text for JSON or code strings.',
    category: 'Dev',
    inputType: 'text',
    outputType: 'text',
    longDescription: `Safely embedding user-generated or external text into a code string is a common challenge for developers. The Text String Escaper solves this by correctly handling special characters like quotes, backslashes, and newlines that can break your code. It uses the robust logic of \`JSON.stringify\` to ensure that any string can be safely placed within a JavaScript variable or a JSON payload without causing syntax errors. This is critical for preventing security issues like injection attacks and for ensuring data integrity when building dynamic applications. It's a must-have tool for any developer working with APIs, dynamic content, or generating code on the fly.`,
    externalReferences: [
      { text: 'MDN Web Docs: JSON.stringify()', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify' }
    ],
  },
  {
    slug: 'ascii-to-text',
    title: 'ASCII to Text Decoder',
    description: 'Convert ASCII decimal numbers back into readable text format.',
    category: 'Education',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The ASCII to Text Decoder translates a sequence of ASCII decimal numbers back into human-readable characters. ASCII, the American Standard Code for Information Interchange, is a character encoding standard that assigns a unique number to every letter, digit, and symbol. This tool allows you to convert a series of these numbers back into readable text. It's an excellent resource for students learning about computer fundamentals, developers debugging low-level data protocols, or puzzle enthusiasts decoding messages. By seeing how a sequence of numbers becomes a coherent sentence, users can gain a deeper appreciation for the foundational principles of computing and data representation.`,
    externalReferences: [
      { text: 'Wikipedia: ASCII', href: 'https://en.wikipedia.org/wiki/ASCII' }
    ],
  },
  {
    slug: 'extract-hashtags',
    title: 'Hashtag Extractor',
    description: 'Instantly find and extract all #hashtags from any messy text or social media caption.',
    category: 'Marketing',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The Hashtag Extractor is an essential tool for social media managers and marketers. It instantly scans any text, such as an Instagram or Twitter caption, and pulls out all hashtags into a clean, deduplicated list. This is invaluable for analyzing competitors' strategies, compiling lists of relevant tags for a campaign, or understanding which topics are trending in your niche. By organizing hashtags, you can refine your content strategy, increase visibility, and engage more effectively with your target audience. Our tool supports Unicode, allowing it to correctly identify hashtags in multiple languages, making it a globally effective marketing utility.`,
    externalReferences: [
      { text: 'HubSpot: How to Use Hashtags', href: 'https://blog.hubspot.com/marketing/how-to-use-hashtags-ht' }
    ],
  },
  {
    slug: 'slug-to-text',
    title: 'URL Slug to Text Converter',
    description: 'Convert URL slugs (like "my-post-title") back into readable, capitalized text.',
    category: 'SEO',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The URL Slug to Text Converter is a handy utility for SEO professionals, content managers, and web developers. It reverse-engineers a URL-friendly slug (e.g., 'how-to-bake-a-cake') back into a human-readable, capitalized title (e.g., 'How To Bake A Cake'). This is perfect for automatically generating breadcrumb navigation text, creating page titles from the URL path, or quickly understanding the topic of a link without visiting the page. It cleans up URL segments by replacing hyphens and underscores with spaces, then applies title case capitalization for a professional and readable result, saving valuable time in content management workflows.`,
    externalReferences: [
      { text: 'Google Search Central: URL Structure', href: 'https://developers.google.com/search/docs/crawling-indexing/url-structure' }
    ],
  },
  {
    slug: 'word-frequency-counter',
    title: 'Word Frequency & Keyword Density',
    description: 'Analyze your text to see which words are used the most. Essential for SEO optimization.',
    category: 'Analysis',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The Word Frequency & Keyword Density tool is a powerful analyzer for SEO specialists and writers. It dissects your text to reveal which words and phrases appear most often, providing a clear keyword density report. This analysis is critical for on-page SEO, helping you ensure your content is focused on the right keywords without 'keyword stuffing'—a practice search engines penalize. By understanding the lexical patterns of your text, you can refine your writing to better match user search intent, improve topical relevance, and ultimately enhance your search engine rankings. This tool provides the data needed to make informed content strategy decisions, all while operating securely in your browser.`,
    externalReferences: [
      { text: 'Moz: Keyword Density', href: 'https://moz.com/learn/seo/keyword-density' }
    ],
  },
  {
    slug: 'csv-to-json',
    title: 'CSV to JSON Converter',
    description: 'Instantly convert Comma-Separated Values (CSV) data into clean, formatted JSON arrays.',
    category: 'Data',
    inputType: 'text',
    outputType: 'json',
    longDescription: `Data migration between systems often requires converting formats, and moving from a spreadsheet (like Excel) to a web application is a common task. The CSV to JSON Converter is an essential tool for this job. It takes your Comma-Separated Value (CSV) data, which can be easily exported from Excel or Google Sheets, and transforms it into a structured JSON array. This API-ready format is perfect for developers who need to import data into their applications or databases. Our tool is built for speed and privacy, performing all conversions instantly in your browser. This means your sensitive business data is never uploaded to a server, ensuring 100% security and efficiency.`,
    externalReferences: [
      { text: 'MDN Web Docs: Working with JSON', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON' }
    ],
  },
  {
    slug: 'binary-to-text',
    title: 'Binary to Text Translator',
    description: 'Decode binary code (0s and 1s) back into readable English text instantly.',
    category: 'Education',
    inputType: 'text',
    outputType: 'text',
    longDescription: `Binary code is the fundamental language of computers, representing all data as a series of 0s and 1s. The Binary to Text Translator demystifies this process by decoding binary strings back into human-readable text. This tool is invaluable for computer science students learning about data representation and character encoding schemes like ASCII. By pasting a sequence of 8-bit binary numbers, you can instantly see the corresponding letters, numbers, or symbols they represent. It's a hands-on way to understand how low-level machine code translates into the text we see every day, reinforcing core concepts of computer science in a practical and interactive way.`,
    externalReferences: [
      { text: 'Wikipedia: ASCII', href: 'https://en.wikipedia.org/wiki/ASCII' }
    ],
  },
  {
    slug: 'extract-ip-addresses',
    title: 'IP Address Extractor',
    description: 'Extract all IPv4 addresses from messy server logs, texts, or code snippets.',
    category: 'Security',
    inputType: 'text',
    outputType: 'text',
    longDescription: `For network administrators and cybersecurity professionals, parsing server logs for malicious activity is a daily task. The IP Address Extractor is a powerful utility designed to simplify this process. It scans large blocks of unstructured text—like access logs, security reports, or raw data dumps—and pulls out all valid IPv4 addresses. The tool uses a precise regular expression to identify the distinct \`x.x.x.x\` pattern, filtering out noise and presenting a clean, unique list of IPs. This is essential for identifying sources of attacks, analyzing traffic patterns, or compiling blocklists. By automating the extraction process, this tool saves valuable time and helps security analysts focus on what matters most: securing their networks.`,
    externalReferences: [
      { text: 'Wikipedia: IPv4', href: 'https://en.wikipedia.org/wiki/IPv4' }
    ],
  },
  {
    slug: 'markdown-to-html',
    title: 'Markdown to HTML Converter',
    description: 'Instantly convert Markdown text into clean, valid HTML code.',
    category: 'Web',
    inputType: 'text',
    outputType: 'text',
    longDescription: `Markdown, a lightweight markup language created by John Gruber, allows people to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid HTML. This converter is essential for web writers and developers. It translates simple syntax for headers, bold, italics, and links into clean HTML, perfect for blog posts, documentation, and especially for creating well-formatted README files on platforms like GitHub. Instead of wrestling with cumbersome HTML tags, you can focus on your content. The tool provides a seamless bridge from your plain text draft to a fully-rendered web page, making it an indispensable part of any modern web publishing workflow, especially for those using content management systems like WordPress or static site generators.`,
    externalReferences: [
      { text: 'The Markdown Guide', href: 'https://www.markdownguide.org/' }
    ],
  },
  {
    slug: 'html-to-markdown',
    title: 'HTML to Markdown Converter',
    description: 'Convert raw HTML code back into clean, readable Markdown format.',
    category: 'Web',
    inputType: 'text',
    outputType: 'text',
    longDescription: `This converter is a powerful tool for reverse-engineering web content, allowing you to reclaim your articles and posts from complex HTML. It takes raw HTML source code and translates it back into clean, simple, and readable Markdown. This is invaluable for content creators migrating from a traditional WYSIWYG editor (like WordPress) to a modern, Markdown-first platform like a static site generator (e.g., Jekyll, Hugo) or a headless CMS. By stripping away extraneous tags and converting structural elements like headers and links into their Markdown equivalents, the tool simplifies your content. This makes it easier to edit, store in version control systems like Git, and ensures your content is portable and future-proof. It's the perfect utility for tidying up and taking control of your digital library.`,
    externalReferences: [
      { text: 'Turndown - An HTML to Markdown converter library', href: 'https://github.com/mixmark-io/turndown' }
    ],
  },
  {
    slug: 'keyword-match-type-wrapper',
    title: 'Google Ads Keyword Wrapper',
    description: 'Wrap your SEO keywords into Broad, Phrase, and Exact match types for Google Ads instantly.',
    category: 'Marketing',
    inputType: 'text',
    outputType: 'text',
    longDescription: `Maximize your advertising budget with this essential tool for PPC marketers. The Google Ads Keyword Wrapper takes your keyword list and instantly formats it for the three core match types: Broad, Phrase ("keyword"), and Exact ([keyword]). Using the right match type is critical for controlling ad spend and achieving a high Return On Ad Spend (ROAS). Broad match gives you reach, while Phrase and Exact matches provide precision, ensuring your ads show to the most relevant audience. Manually formatting keywords is tedious and error-prone, especially for large campaigns. This tool automates the process, letting you build highly-structured ad groups in seconds. It's an indispensable utility for anyone running Google Ads campaigns who wants to save time and improve performance.`,
    externalReferences: [
      { text: 'Google Ads Help: About keyword matching options', href: 'https://support.google.com/google-ads/answer/7478529' }
    ],
  },
  {
    slug: 'sha256-hash-generator',
    title: 'SHA-256 Hash Generator',
    description: 'Securely hash your text using the SHA-256 cryptographic algorithm instantly.',
    category: 'Security',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The SHA-256 Hash Generator is a vital security tool for creating a cryptographic fingerprint of your data. SHA-256 (Secure Hash Algorithm 256-bit) is a one-way function that converts any text input into a unique, fixed-size 256-bit (32-byte) hash. It's computationally infeasible to reverse the process, making it perfect for verifying data integrity without exposing the original data. This technology is a cornerstone of modern security and is used extensively in blockchain technology, such as Bitcoin, for verifying transactions. It's also used for digital signatures and password validation. Our tool performs all hashing securely on the client-side, meaning your sensitive data is never sent to our servers. This ensures absolute privacy and instant results, providing a safe and efficient way to generate SHA-256 hashes for any application.`,
    externalReferences: [
      { text: "Wikipedia: SHA-2", href: "https://en.wikipedia.org/wiki/SHA-2" }
    ],
  },
  {
    slug: 'md5-hash-generator',
    title: 'MD5 Hash Generator',
    description: 'Generate an MD5 checksum hash from any text string for quick data verification.',
    category: 'Security',
    inputType: 'text',
    outputType: 'text',
    longDescription: `The MD5 Hash Generator creates a 128-bit checksum for any given text. MD5 (Message-Digest algorithm 5) was once a widely used cryptographic hash function. Today, it is considered cryptographically broken and unsuitable for security purposes like password storage, as vulnerabilities (known as "collisions") have been found that allow different inputs to produce the same hash. However, MD5 is still very useful as a non-crypto checksum to verify data integrity against unintentional corruption. For example, it is often used to generate a unique value for a file to ensure it has not been altered during transfer. This tool provides a quick way to generate an MD5 hash for data verification, but it should NOT be used for security-critical applications.`,
    externalReferences: [
      { text: "Wikipedia: MD5", href: "https://en.wikipedia.org/wiki/MD5" }
    ],
  },
  {
    slug: 'json-to-yaml',
    title: 'JSON to YAML Converter',
    description: 'Convert JSON objects into clean, readable YAML format for config files (Docker, Kubernetes).',
    category: 'Dev',
    inputType: 'json',
    outputType: 'text',
    longDescription: `The JSON to YAML Converter is a crucial utility for developers and DevOps engineers working with modern configuration files. While JSON (JavaScript Object Notation) is excellent for machine-to-machine communication, YAML (YAML Ain't Markup Language) is often preferred for human-readable configuration files due to its cleaner, more minimal syntax. Platforms like Docker (docker-compose.yml), Kubernetes, and Ansible heavily rely on YAML. This tool seamlessly converts your structured JSON data into the YAML format, preserving the hierarchy and data types. This is perfect for migrating configurations, debugging CI/CD pipelines, or simply converting data into a more readable format for documentation. The conversion is done instantly and privately in your browser.`,
    externalReferences: [
      { text: "YAML Official Website", href: "https://yaml.org/" }
    ],
  },
];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  const normalizedSlug = decodeURIComponent(slug).toLowerCase();
  return ALL_TOOLS.find((tool) => tool.slug.toLowerCase() === normalizedSlug);
}
