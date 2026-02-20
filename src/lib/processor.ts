export function processText(toolSlug: string, input: string): string {
  if (!input && toolSlug !== 'lorem-ipsum-generator' && toolSlug !== 'random-password-generator' && toolSlug !== 'uuid-generator') return '';
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

    case 'text-statistics': {
      const words = text === '' ? 0 : text.split(/\s+/).filter(Boolean).length;
      const characters = input.length;
      const lines = input.split('\n').length;
      const readingTime = Math.ceil(words / 200);
      return JSON.stringify({ words, characters, lines, readingTime });
    }

    case 'json-to-csv': {
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
    }

    case 'text-to-lowercase':
        return input.toLowerCase();

    case 'html-entity-converter': {
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
    }

    case 'base64-converter': {
        try {
            // Attempt to decode. If it throws, it's not valid Base64, so we encode.
            // A simple check to see if it's likely Base64.
            if (/^[A-Za-z0-9+/=]+$/.test(text) && text.length % 4 === 0) {
                return atob(text);
            }
            return btoa(text);
        } catch (e) {
            return "Invalid input for Base64 conversion";
        }
      }

    case 'lorem-ipsum-generator': {
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
    }

    case 'url-encoder-decoder':
      // Smart detection: if input has %, try to decode. Else, encode.
      if (input.includes('%')) {
        try { return decodeURIComponent(input); } catch (e) { return "Error: Invalid URL encoding"; }
      }
      return encodeURIComponent(input);

    case 'text-to-binary':
      return input.split('').map(char => {
          return char.charCodeAt(0).toString(2).padStart(8, '0');
      }).join(' ');

    case 'hex-to-rgb': {
      let hex = input.trim().replace('#', '');
      // Handle shorthand hex like #fff
      if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
      }
      if (hex.length !== 6) return "Error: Invalid Hex Code";

      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      if (isNaN(r) || isNaN(g) || isNaN(b)) return "Error: Invalid Hex Characters";
      return `rgb(${r}, ${g}, ${b})`;
    }

    case 'reverse-text':
      return input.split('').reverse().join('');

    case 'random-password-generator': {
      const length = parseInt(input) || 16; // Default to 16 chars
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
      let password = "";
      if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        const values = new Uint32Array(length);
        crypto.getRandomValues(values);
        for (let i = 0; i < length; i++) {
          password += charset[values[i] % charset.length];
        }
      } else {
        // Fallback for older browsers
        for (let i = 0, n = charset.length; i < length; ++i) {
          password += charset.charAt(Math.floor(Math.random() * n));
        }
      }
      return password;
    }

    case 'uuid-generator':
      // Simple UUID v4 implementation using crypto or Math fallback
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
         return crypto.randomUUID();
      }
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });

    case 'json-minifier':
      try {
        // Parse to validate, then stringify without spacing
        return JSON.stringify(JSON.parse(input));
      } catch (e) {
        return "Error: Invalid JSON format. Please check your syntax.";
      }

    case 'css-minifier':
      // Basic regex to remove comments and whitespace
      return input
        .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
        .replace(/\s+/g, ' ')             // Collapse whitespace
        .replace(/\s*([{:;,])\s*/g, '$1') // Remove space around separators
        .trim();

    case 'sql-minifier':
      // Basic regex to remove newlines and multiple spaces
      return input
        .replace(/--.*$/gm, '') // Remove inline comments
        .replace(/\s+/g, ' ')   // Collapse whitespace
        .trim();

    case 'jwt-decoder': {
      try {
        const parts = input.split('.');
        if (parts.length !== 3) return "Error: Invalid JWT format (must have 3 parts).";
        // Decode the payload (2nd part)
        const payload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
        const header = atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.stringify({ header: JSON.parse(header), payload: JSON.parse(payload) }, null, 2);
      } catch (e) {
        return "Error: Could not decode JWT. Check if it's valid Base64Url.";
      }
    }

    case 'rgb-to-hex': {
      // Extract numbers from string like "rgb(255, 0, 0)" or "255, 0, 0"
      const rgb = input.match(/\d+/g);
      if (!rgb || rgb.length < 3) return "Error: Invalid RGB format. Use '255, 0, 0'";
      const toHex = (c: string) => {
        const hex = parseInt(c).toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      };
      return "#" + toHex(rgb[0]) + toHex(rgb[1]) + toHex(rgb[2]);
    }

    case 'unix-timestamp-converter': {
      const timestamp = parseInt(input.trim());
      if (isNaN(timestamp)) return "Error: Invalid timestamp.";
      // Check if it's seconds (10 digits) or ms (13 digits), usually seconds for Unix
      const date = new Date(timestamp * (timestamp < 10000000000 ? 1000 : 1));
      return `📅 UTC: ${date.toUTCString()}\n🕒 Local: ${date.toString()}\nISO: ${date.toISOString()}`;
    }
    
    case 'remove-duplicate-lines': {
      // Use Set for O(n) performance to remove duplicates
      const lines = input.split(/\r?\n/);
      const uniqueLines = new Set(lines.map(l => l.trim()).filter(l => l.length > 0));
      return Array.from(uniqueLines).join('\n');
    }

    case 'sort-lines':
      // Basic alphabetical sort
      return input
        .split(/\r?\n/)
        .filter(line => line.trim() !== '')
        .sort((a, b) => a.localeCompare(b))
        .join('\n');

    case 'email-extractor': {
      // Regex to find emails
      const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
      const emails = input.match(emailRegex);
      if (!emails) return "No emails found in the text.";
      // Return unique emails only, one per line
      return Array.from(new Set(emails)).join('\n');
    }

    default:
      return `Error: Tool with slug '${slug}' not found.`;
  }
}
