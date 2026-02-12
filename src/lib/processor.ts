export function processText(toolSlug: string, input: string): string {
  if (!input && toolSlug !== 'lorem-ipsum-generator') return '';
  const text = input.trim();
  const slug = toolSlug.toLowerCase();

  switch (slug) {
    case 'text-to-camelcase':
      return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      ).replace(/\s+/g, '');

    case 'text-to-snake-case':
      return text.toLowerCase().replace(/\s+/g, '_');

    case 'text-to-pascalcase':
      return text.replace(/(?:\b\w)/g, (word) => word.toUpperCase()).replace(/\s+/g, '');

    case 'text-to-slug':
      return text.toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');

    case 'text-statistics':
      const words = text === '' ? 0 : text.split(/\s+/).filter(Boolean).length;
      const characters = input.length;
      const lines = input.split('\n').length;
      const readingTime = Math.ceil(words / 200);
      return JSON.stringify({ words, characters, lines, readingTime });

    case 'json-to-csv':
      try {
        const json = JSON.parse(text);
        const array = Array.isArray(json) ? json : [json];
        if (array.length === 0) {
            return '';
        }
        const keys = Object.keys(array[0] || {});
        if (keys.length === 0) {
            return '';
        }
        return [keys.join(','), ...array.map(row => keys.map(k => JSON.stringify(row[k] ?? '')).join(','))].join('\n');
      } catch (e) { return "Invalid JSON"; }

    case 'text-to-lowercase':
        return input.toLowerCase();

    case 'html-entity-converter':
      // Auto-detect: if it contains entities, decode. Otherwise, encode.
      if (/&[a-zA-Z0-9#]+;/.test(text)) {
        // Decode
        try {
            const textarea = document.createElement('textarea');
            textarea.innerHTML = text;
            return textarea.value;
        } catch (e) {
            return 'Error decoding HTML entities.';
        }
      } else {
          // Encode
          const map: { [key: string]: string } = {
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              '"': '&quot;',
              "'": '&#39;',
          };
          return input.replace(/[&<>"']/g, (m) => map[m]);
      }

    case 'base64-converter':
        try {
            // Attempt to decode. If it throws, it's not valid Base64, so we encode.
            return atob(text);
        } catch (e) {
            // It's not Base64, so let's encode it.
            try {
                return btoa(text);
            } catch (e2) {
                return "Invalid input for Base64 conversion";
            }
        }

    case 'lorem-ipsum-generator':
        const sentences = [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            'Curabitur pretium tincidunt lacus.',
            'Nulla gravida orci a odio.',
            'Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.',
            'Integer in mauris eu nibh euismod gravida.',
            'Duis ac tellus et risus vulputate vehicula.'
        ];
        let numParagraphs = parseInt(text.trim(), 10);
        if (isNaN(numParagraphs) || numParagraphs < 1) {
            numParagraphs = 3; // Default to 3 paragraphs
        }
        if (numParagraphs > 100) {
            numParagraphs = 100; // Set a reasonable limit
        }

        const paragraphs = [];
        for (let i = 0; i < numParagraphs; i++) {
            const numSentences = Math.floor(Math.random() * 3) + 3; // 3 to 5 sentences per paragraph
            let paragraphSentences = '';
            for (let j = 0; j < numSentences; j++) {
                paragraphSentences += sentences[Math.floor(Math.random() * sentences.length)] + ' ';
            }
            paragraphs.push(paragraphSentences.trim());
        }
        return paragraphs.join('\n\n');

    default:
      return `Error: Tool with slug '${slug}' not found.`;
  }
}
