export function processText(toolSlug: string, input: string): string {
  if (!input && toolSlug !== 'lorem-ipsum-generator' && toolSlug !== 'random-password-generator' && toolSlug !== 'uuid-generator' && toolSlug !== 'robots-txt-generator') return '';
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

    case 'url-encoder-decoder': {
      // Smart detection: if input has %, try to decode. Else, encode.
      if (input.includes('%')) {
        try { return decodeURIComponent(input); } catch (e) { return "Error: Invalid URL encoding"; }
      }
      return encodeURIComponent(input);
    }

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

    case 'uuid-generator': {
      // Simple UUID v4 implementation using crypto or Math fallback
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
         return crypto.randomUUID();
      }
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

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
      const lines = input.split(/\r?\n/);
      const uniqueLines = new Set(lines.map(l => l.trim()).filter(l => l.length > 0));
      return Array.from(uniqueLines).join('\n');
    }

    case 'sort-lines': {
      const lines = input
        .split(/\r?\n/)
        .filter(line => line.trim() !== '')
        .sort((a, b) => a.localeCompare(b));
      return lines.join('\n');
    }

    case 'email-extractor': {
      const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
      const emails = input.match(emailRegex);
      if (!emails) return "No emails found in the text.";
      return Array.from(new Set(emails)).join('\n');
    }

    case 'html-tags-remover': {
      // Regex to replace any HTML tag with empty string
      return input.replace(/<[^>]*>?/gm, '');
    }

    case 'list-randomizer': {
      // Fisher-Yates Shuffle Algorithm
      const arr = input.split(/\r?\n/).filter(line => line.trim() !== '');
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr.join('\n');
    }

    case 'morse-code-translator': {
      const morseMap: Record<string, string> = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
        '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
        '9': '----.', '0': '-----', ' ': ' / '
      };
      return input.toUpperCase().split('').map(char => morseMap[char] || char).join(' ');
    }

    case 'text-to-hex': {
        return input.split('').map(char => {
            return char.charCodeAt(0).toString(16).padStart(2, '0');
        }).join(' ').toUpperCase();
    }

    case 'credit-card-validator': {
        const sanitized = input.replace(/\D/g, '');
        if (!sanitized) return 'Please enter a valid numeric string.';
        let sum = 0;
        let shouldDouble = false;
        for (let i = sanitized.length - 1; i >= 0; i--) {
            let digit = parseInt(sanitized.charAt(i), 10);
            if (shouldDouble) {
            if ((digit *= 2) > 9) digit -= 9;
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        const isValid = (sum % 10 === 0);
        return isValid ? '✅ Valid Card Number (Luhn Check Passed)' : '❌ Invalid Card Number';
    }

    case 'url-parser': {
        try {
            const urlObj = new URL(input.trim());
            let params: Record<string, string> = {};
            urlObj.searchParams.forEach((value, key) => { params[key] = value; });
            
            return JSON.stringify({
                Protocol: urlObj.protocol,
                Host: urlObj.host,
                Pathname: urlObj.pathname,
                Search: urlObj.search,
                Hash: urlObj.hash,
                QueryParams: params
            }, null, 2);
        } catch (e) {
            return "❌ Error: Invalid URL format. Please include http:// or https://";
        }
    }

    case 'title-case-converter': {
      if (!input) return '';
      return input.toLowerCase().split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(' ');
    }

    case 'remove-extra-spaces': {
      if (!input) return '';
      // Replace multiple spaces/tabs with a single space, and remove empty blank lines
      return input.replace(/[ \t]+/g, ' ').replace(/\n\s*\n/g, '\n').trim();
    }

    case 'json-formatter': {
      if (!input) return '';
      try {
        const parsedData = JSON.parse(input);
        // Format with 2 spaces indentation
        return JSON.stringify(parsedData, null, 2);
      } catch (error) {
        return "❌ Error: Invalid JSON format. Please check for missing brackets or quotes.";
      }
    }

    case 'extract-urls': {
      if (!input) return '';
      // Regex to find http/https links safely
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const urls = input.match(urlRegex);
      if (!urls) return "❌ No URLs found in the provided text.";
      // Return unique URLs, one per line
      return Array.from(new Set(urls)).join('\n');
    }

    case 'remove-empty-lines': {
      if (!input) return '';
      // Split by newline, filter out empty/whitespace-only lines, and rejoin
      return input.split(/\r?\n/).filter(line => line.trim() !== '').join('\n');
    }

    case 'rot13-cipher': {
      if (!input) return '';
      // Replace only alphabetical characters, shifting by 13
      return input.replace(/[a-zA-Z]/g, function(c) {
        return String.fromCharCode(
          (c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
        );
      });
    }

    case 'list-to-comma-separator': {
      if (!input) return '';
      // Split by newline, remove empty lines, and join with comma and space
      const items = input.split(/\r?\n/).map(line => line.trim()).filter(line => line !== '');
      return items.join(', ');
    }

    case 'string-escaper': {
      if (!input) return '';
      // Use JSON.stringify to safely escape the string, then remove the surrounding quotes it adds
      const escaped = JSON.stringify(input);
      return escaped.substring(1, escaped.length - 1);
    }

    case 'ascii-to-text': {
      if (!input) return '';
      // Match all numbers, convert them to characters
      const asciiNumbers = input.match(/\d+/g);
      if (!asciiNumbers) return "❌ Error: No valid ASCII numbers found in the input.";
      return asciiNumbers.map(num => String.fromCharCode(parseInt(num, 10))).join('');
    }

    case 'extract-hashtags': {
      if (!input) return '';
      // Support unicode for multiple languages (e.g., Arabic hashtags)
      const hashtags = input.match(/#[\p{L}\d_]+/gu);
      if (!hashtags) return "❌ No hashtags found in the text.";
      // Return unique hashtags
      return Array.from(new Set(hashtags)).join('\n');
    }

    case 'slug-to-text': {
      if (!input) return '';
      // Replace hyphens and underscores with spaces, then capitalize each word
      const unslugged = input.replace(/[-_]/g, ' ');
      return unslugged.replace(/\b\w/g, char => char.toUpperCase());
    }

    case 'word-frequency-counter': {
      if (!input) return '';
      const wordsArray = input.toLowerCase().match(/\b[\p{L}\d_]+\b/gu);
      if (!wordsArray) return "❌ No words found to analyze.";
      
      const wordCounts: Record<string, number> = {};
      wordsArray.forEach(word => {
        // Exclude extremely common stop words if desired, or count everything
        if(word.length > 2) { // Only count words longer than 2 letters
          wordCounts[word] = (wordCounts[word] || 0) + 1;
        }
      });
      
      // Sort by frequency (highest first)
      const sortedWords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]);
      
      return `📊 Keyword Density Report (Words > 2 chars):\n\n` + 
             sortedWords.map(([word, count]) => `${count}x : ${word}`).join('\n');
    }

    case 'csv-to-json': {
      if (!input) return '';
      try {
        const lines = input.split(/\r?\n/).filter(line => line.trim() !== '');
        if (lines.length < 2) return "❌ Error: CSV must have at least a header row and one data row.";
        const headers = lines[0].split(',').map(h => h.trim());
        const result = lines.slice(1).map(line => {
          const obj: Record<string, string> = {};
          const currentline = line.split(',');
          headers.forEach((header, i) => {
            obj[header] = currentline[i] ? currentline[i].trim() : '';
          });
          return obj;
        });
        return JSON.stringify(result, null, 2);
      } catch (e) {
        return "❌ Error: Invalid CSV format.";
      }
    }

    case 'binary-to-text': {
      if (!input) return '';
      try {
        // Match groups of 8 binary digits
        const binaries = input.match(/[01]{8}/g);
        if (!binaries) return "❌ Error: Please enter valid 8-bit binary strings separated by spaces.";
        return binaries.map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
      } catch (e) {
        return "❌ Error: Could not decode binary string.";
      }
    }

    case 'extract-ip-addresses': {
      if (!input) return '';
      // Regex for standard IPv4 addresses
      const ipv4Regex = /\b(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g;
      const ips = input.match(ipv4Regex);
      if (!ips) return "❌ No IPv4 addresses found in the text.";
      // Return unique IPs
      return Array.from(new Set(ips)).join('\n');
    }

    case 'markdown-to-html': {
      if (!input) return '';
      let html = input
        // Headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Bold & Italic
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        // Links
        .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
        // Paragraphs (basic newline to <p>)
        .replace(/^\s*(\n)?(.+)/gim, function(m) {
          return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p>'+m.trim()+'</p>';
        });
      return html;
    }

    case 'html-to-markdown': {
      if (!input) return '';
      let md = input
        // Headers
        .replace(/<h[1-6]>(.*?)<\/h[1-6]>/gim, '# $1\n')
        // Bold & Italic
        .replace(/<(strong|b)>(.*?)<\/(strong|b)>/gim, '**$2**')
        .replace(/<(em|i)>(.*?)<\/(em|i)>/gim, '*$2*')
        // Links
        .replace(/<a href="(.*?)">(.*?)<\/a>/gim, '[$2]($1)')
        // Paragraphs and breaks
        .replace(/<p>(.*?)<\/p>/gim, '$1\n\n')
        .replace(/<br\s*[\/]?>/gim, '\n')
        // Remove remaining tags
        .replace(/<[^>]*>?/gm, '');
      return md.trim();
    }

    case 'keyword-match-type-wrapper': {
      if (!input) return '';
      const kwLines = input.split(/\r?\n/).map(k => k.trim()).filter(k => k !== '');
      if (kwLines.length === 0) return '';
      
      let wrapperOutput = "=== Broad Match ===\n";
      wrapperOutput += kwLines.join('\n') + "\n\n";
      
      wrapperOutput += "=== Phrase Match ===\n";
      wrapperOutput += kwLines.map(k => `"${k}"`).join('\n') + "\n\n";
      
      wrapperOutput += "=== Exact Match ===\n";
      wrapperOutput += kwLines.map(k => `[${k}]`).join('\n');
      
      return wrapperOutput;
    }

    case 'sha256-hash-generator':
       if (!input) return '';
       return "Please implement SHA-256 via async Crypto API in the component, or add a pure JS SHA-256 script. For now, returning a mock hash to test UI:[SHA-256 HASH REQUIRES ASYNC]";

    case 'md5-hash-generator':
       if (!input) return '';
       return "Please implement MD5 via a pure JS library. For now, returning a mock hash to test UI:[MD5 HASH REQUIRES EXTERNAL LOGIC]";

    case 'json-to-yaml': {
      if (!input) return '';
      try {
        const obj = JSON.parse(input);
        
        // Very basic JSON to YAML recursive converter (Pure JS, no external lib)
        const toYaml = (data: any, indent = 0): string => {
          let yaml = '';
          const spaces = '  '.repeat(indent);
          
          if (Array.isArray(data)) {
            data.forEach(item => {
              if (typeof item === 'object' && item !== null) {
                yaml += `${spaces}- \n${toYaml(item, indent + 1)}`;
              } else {
                yaml += `${spaces}- ${item}\n`;
              }
            });
          } else if (typeof data === 'object' && data !== null) {
            for (const [key, value] of Object.entries(data)) {
              if (typeof value === 'object' && value !== null) {
                yaml += `${spaces}${key}:\n${toYaml(value, indent + 1)}`;
              } else {
                yaml += `${spaces}${key}: ${value}\n`;
              }
            }
          } else {
            yaml += `${spaces}${data}\n`;
          }
          return yaml;
        };
        return toYaml(obj);
      } catch (e) {
         return "❌ Error: Invalid JSON format.";
      }
    }
    
    case 'meta-tag-generator': {
      if (!input) return '';
      const title = input.length > 60 ? input.substring(0, 57) + '...' : input;
      const desc = input.length > 160 ? input.substring(0, 157) + '...' : input;
      return `<title>${title}</title>\n<meta name="description" content="${desc}">`;
    }

    case 'canonical-url-generator': {
      if (!input) return '';
      // Ensure it starts with http
      const url = input.startsWith('http') ? input : 'https://' + input;
      return `<link rel="canonical" href="${url}" />`;
    }

    case 'robots-txt-generator': {
      const sitemap = input.startsWith('http') ? input : 'https://' + input + '/sitemap.xml';
      return `User-agent: *\nDisallow: /admin\nSitemap: ${sitemap}`;
    }

    case 'og-meta-generator': {
      if (!input) return '';
      return `<meta property="og:title" content="${input}" />\n<meta property="og:type" content="website" />\n<meta property="og:url" content="https://www.yourdomain.com/" />\n<meta property="og:image" content="https://www.yourdomain.com/image.jpg" />`;
    }

    case 'twitter-card-generator': {
      if (!input) return '';
      return `<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:title" content="${input}" />\n<meta name="twitter:description" content="Click to learn more!" />`;
    }

    case 'json-ld-generator': {
      if (!input) return '';
      const schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": input,
        "description": "Content description for " + input
      };
      return JSON.stringify(schema, null, 2);
    }

    case 'csv-to-html-table': {
      if (!input) return '';
      const lines = input.split(/\r?\n/).filter(l => l.trim() !== '');
      if (lines.length === 0) return '❌ Error: No valid data found.';
      let html = '<table border="1">\n  <thead>\n    <tr>\n';
      const headers = lines[0].split(',');
      headers.forEach(h => html += `      <th>${h.trim()}</th>\n`);
      html += '    </tr>\n  </thead>\n  <tbody>\n';
      for(let i = 1; i < lines.length; i++) {
        html += '    <tr>\n';
        const cols = lines[i].split(',');
        cols.forEach(c => html += `      <td>${c.trim()}</td>\n`);
        html += '    </tr>\n';
      }
      html += '  </tbody>\n</table>';
      return html;
    }

    case 'urls-to-xml-sitemap': {
      if (!input) return '';
      const urls = input.split(/\r?\n/).map(u => u.trim()).filter(u => u !== '' && u.startsWith('http'));
      if (urls.length === 0) return '❌ Error: Please provide a list of valid URLs starting with http:// or https://';
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
      urls.forEach(u => {
        xml += `  <url>\n    <loc>${u}</loc>\n  </url>\n`;
      });
      xml += '</urlset>';
      return xml;
    }

    case 'url-cleaner-tracking-stripper': {
      if (!input) return '';
      try {
        const urlObj = new URL(input.trim());
        // Common tracking parameters to strip
        const trackers =['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid', '_ga', 'mc_cid', 'igshid', 'ref'];
        trackers.forEach(param => urlObj.searchParams.delete(param));
        return urlObj.toString();
      } catch(e) {
        return "❌ Error: Please enter a valid URL starting with http:// or https://";
      }
    }

    case 'binary-text-translator':
      if (!input || input.trim() === '') return '';
      const isBinary = /^[01\s]+$/.test(input.trim());
      if (isBinary) {
        // Decode Binary to Text
        try {
          return input.split(/\s+/).map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
        } catch (e) {
          return '❌ Error: Invalid binary input.';
        }
      } else {
        // Encode Text to Binary
        return input.split('').map(char => {
          const bin = char.charCodeAt(0).toString(2);
          return '00000000'.slice(bin.length) + bin;
        }).join(' ');
      }

    case 'markdown-to-html-converter':
      if (!input) return '';
      let htmlOutput = input
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
        .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
        .replace(/\n$/gim, '<br />');
      return htmlOutput.trim() === '' ? '❌ Error: Could not parse Markdown.' : htmlOutput;

    case 'extract-urls-from-text':
      if (!input) return '';
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const extractedUrls = input.match(urlRegex);
      if (!extractedUrls || extractedUrls.length === 0) {
        return '❌ No URLs found in the provided text.';
      }
      // Return unique URLs separated by a new line
      return [...new Set(extractedUrls)].join('\n');
    
    case 'htaccess-redirect-generator':
      if (!input || input.trim() === '') {
        return '💡 Hint: Enter URLs separated by a comma or space, one per line.\nExample:\n/old-page.html, https://domain.com/new-page\n/old-category/, https://domain.com/new-category/';
      }
      const redirectLines = input.split(/\r?\n/).filter(l => l.trim() !== '');
      let htaccessOutput = '# 301 Redirects generated by PaPiv\n<IfModule mod_rewrite.c>\nRewriteEngine On\n\n';
      redirectLines.forEach(line => {
        const parts = line.split(/[,\s]+/).filter(p => p.trim() !== '');
        if (parts.length >= 2) {
          const oldPath = parts[0].startsWith('/') ? parts[0] : `/${parts[0]}`;
          htaccessOutput += `Redirect 301 ${oldPath} ${parts[1]}\n`;
        }
      });
      htaccessOutput += '\n</IfModule>';
      return htaccessOutput;

    case 'keyword-typo-generator':
      if (!input) return '';
      const word = input.trim().toLowerCase();
      if (word.length < 3) return '❌ Error: Please enter a keyword with at least 3 characters.';
      if (word.split(/\s+/).length > 2) return '❌ Error: Please enter a single word or short two-word phrase for best results.';
      
      let typos = new Set<string>();
      // Skip letters
      for(let i=0; i<word.length; i++) {
        if (word[i] !== ' ') typos.add(word.slice(0,i) + word.slice(i+1));
      }
      // Double letters
      for(let i=0; i<word.length; i++) {
        if (word[i] !== ' ') typos.add(word.slice(0,i) + word[i] + word[i] + word.slice(i+1));
      }
      // Swapped adjacent letters
      for(let i=0; i<word.length-1; i++) {
        if (word[i] !== ' ' && word[i+1] !== ' ') {
          typos.add(word.slice(0,i) + word[i+1] + word[i] + word.slice(i+2));
        }
      }
      return `Generated Typos for "${word}":\n\n` + Array.from(typos).join('\n');

    case 'svg-to-data-uri':
      if (!input) return '';
      let svg = input.trim();
      if(!svg.toLowerCase().startsWith('<svg')) {
        return '❌ Error: Input does not appear to be valid SVG code. It must start with <svg...>';
      }
      // Clean formatting
      svg = svg.replace(/\r?\n/g, ' ').replace(/\t/g, ' ').replace(/\s+/g, ' ').trim();
      
      // URL Encoded (Best for CSS)
      const encodedSvg = encodeURIComponent(svg)
        .replace(/'/g, '%27')
        .replace(/"/g, '%22')
        .replace(/%20/g, ' ') // Keep spaces as spaces to save bytes
        .replace(/%3D/g, '=')
        .replace(/%3A/g, ':')
        .replace(/%2F/g, '/');
        
      // Base64 Encoded (Fallback)
      let base64Svg = '';
      try {
        base64Svg = btoa(unescape(encodeURIComponent(svg)));
      } catch (e) {
        base64Svg = 'Error converting to Base64';
      }

      let outputURI = `/* 1. Optimized CSS Background-Image (Recommended) */\n`;
      outputURI += `background-image: url("data:image/svg+xml,${encodedSvg}");\n\n`;
      outputURI += `/* 2. Base64 Format (Alternative) */\n`;
      outputURI += `data:image/svg+xml;base64,${base64Svg}`;
      
      return outputURI;

    default:
      return `Error: Tool with slug '${slug}' not found.`;
  }
}
