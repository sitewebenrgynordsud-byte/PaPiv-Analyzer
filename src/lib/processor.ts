
export function processText(toolSlug: string, input: string): string {
  const trimmedInput = input.trim();

  switch (toolSlug) {
    case 'word-counter': {
      if (!trimmedInput) return 'Words: 0, Chars: 0';
      const wordCount = trimmedInput.split(/\s+/).filter(Boolean).length;
      const charCount = input.length;
      return `Words: ${wordCount}, Chars: ${charCount}`;
    }
    case 'text-to-lowercase': {
      return input.toLowerCase();
    }
    case 'json-to-csv': {
      if (!trimmedInput) {
        return '';
      }
      try {
        const data = JSON.parse(trimmedInput);
        if (!Array.isArray(data)) {
          return 'Error: Input must be a JSON array of objects.';
        }
        if (data.length === 0) {
          return ''; // An empty array results in an empty CSV.
        }

        const firstItem = data[0];
        if (typeof firstItem !== 'object' || firstItem === null || Array.isArray(firstItem)) {
            return 'Error: JSON array must contain objects.';
        }

        const headers = Object.keys(firstItem);
        const csvHeader = headers.join(',');

        const csvRows = data.map(obj => {
          if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
             return headers.map(() => '').join(',');
          }
          return headers
            .map(header => {
              const value = obj[header as keyof typeof obj];

              if (value === null || value === undefined) {
                return '';
              }
              
              let stringValue = String(value);

              if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                stringValue = `"${stringValue.replace(/"/g, '""')}"`;
              }
              return stringValue;
            })
            .join(',');
        });

        return [csvHeader, ...csvRows].join('\n');
      } catch (error) {
        if (error instanceof SyntaxError) {
          return 'Error: Invalid JSON format. Please check for missing commas or brackets.';
        }
        return `Error: ${error instanceof Error ? error.message : 'An unknown error occurred.'}`;
      }
    }
    default:
      return `Error: Tool with slug '${toolSlug}' not found.`;
  }
}
