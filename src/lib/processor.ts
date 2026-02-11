
export function processText(toolSlug: string, input: string): string {
  switch (toolSlug) {
    case 'word-counter': {
      if (!input) return 'Words: 0, Chars: 0';
      const wordCount = input.trim().split(/\s+/).filter(Boolean).length;
      const charCount = input.length;
      return `Words: ${wordCount}, Chars: ${charCount}`;
    }
    case 'text-to-lowercase': {
      return input.toLowerCase();
    }
    case 'json-to-csv': {
      try {
        const data = JSON.parse(input);
        if (!Array.isArray(data) || data.length === 0) {
          return 'Error: Input must be a non-empty array of JSON objects.';
        }

        // Extract headers from the first object
        const headers = Object.keys(data[0]);
        const csvHeader = headers.join(',');

        // Convert each object to a CSV row
        const csvRows = data.map(obj => {
          return headers
            .map(header => {
              let value = obj[header];
              if (value === null || value === undefined) {
                return '';
              }
              value = String(value);
              // Escape quotes and wrap in quotes if it contains a comma
              if (value.includes('"')) {
                value = value.replace(/"/g, '""');
              }
              if (value.includes(',')) {
                value = `"${value}"`;
              }
              return value;
            })
            .join(',');
        });

        return [csvHeader, ...csvRows].join('\n');
      } catch (error) {
        if (error instanceof SyntaxError) {
          return 'Error: Invalid JSON format.';
        }
        return `Error: ${error instanceof Error ? error.message : 'An unknown error occurred.'}`;
      }
    }
    default:
      return `Error: Tool with slug '${toolSlug}' not found.`;
  }
}
