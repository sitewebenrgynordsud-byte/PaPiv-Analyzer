
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
        if (!trimmedInput) {
            const report = [
                `Word Count: 0`,
                `Character Count: 0`,
                `Sentence Count: 0`,
                `Paragraph Count: 0`,
                `Reading Time: ~0 minute(s)`
            ].join('\n');
            return report;
        }
        const wordCount = trimmedInput.split(/\s+/).filter(Boolean).length;
        const charCount = trimmedInput.length;
        const sentenceCount = trimmedInput.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
        const paragraphCount = trimmedInput.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
        const readingTime = Math.ceil(wordCount / 200);

        const report = [
            `Word Count: ${wordCount}`,
            `Character Count: ${charCount}`,
            `Sentence Count: ${sentenceCount}`,
            `Paragraph Count: ${paragraphCount}`,
            `Reading Time: ~${readingTime} minute(s)`
        ].join('\n');
        return report;
    }
    default:
      return `Error: Tool with slug '${toolSlug}' not found.`;
  }
}
