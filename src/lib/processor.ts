
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
        let data = JSON.parse(trimmedInput);
        if (!Array.isArray(data)) {
          data = [data];
        }
        if (data.length === 0) {
          return '';
        }

        const firstItem = data[0];
        if (typeof firstItem !== 'object' || firstItem === null || Array.isArray(firstItem)) {
            return 'Error: JSON array must contain objects.';
        }

        const headers = Object.keys(firstItem);
        const csvHeader = headers.join(',');

        const csvRows = data.map((obj: any) => {
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
          return 'Error: Invalid JSON. Please check your syntax.';
        }
        return `Error: ${error instanceof Error ? error.message : 'An unknown error occurred.'}`;
      }
    }
    case 'document-analyzer': {
      const words = input.trim() === '' ? 0 : input.trim().split(/\s+/).length;
      const chars = input.length;
      const sentences = input.split(/[.!?]+/).filter(x => x.trim().length > 0).length;
      const paragraphs = input.split(/\n\n+/).filter(x => x.trim().length > 0).length;
      const readTime = Math.ceil(words / 200);

      return `📊 Document Analysis Report:\n\n` +
             `• Words: ${words}\n` +
             `• Characters: ${chars}\n` +
             `• Sentences: ${sentences}\n` +
             `• Paragraphs: ${paragraphs}\n` +
             `• Est. Reading Time: ${readTime} min(s)`;
    }
    default:
      return `Error: Tool with slug '${toolSlug}' not found.`;
  }
}
