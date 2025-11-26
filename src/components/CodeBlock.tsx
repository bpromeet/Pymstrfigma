import React from 'react';
import { Button } from './ui/button';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: 'bash' | 'json' | 'javascript' | 'typescript';
  onCopy?: (code: string) => void;
  copied?: boolean;
  copyId?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language = 'json', 
  onCopy, 
  copied = false,
  copyId 
}) => {
  const highlightCode = (text: string, lang: string) => {
    // Simple syntax highlighting based on language
    if (lang === 'bash') {
      return text
        .replace(/(curl|POST|GET|PUT|DELETE|PATCH|-X|-H|-d|\\)/g, '<span class="text-[#C586C0]">$1</span>') // Keywords/commands in purple
        .replace(/(https?:\/\/[^\s"]+)/g, '<span class="text-[#4EC9B0]">$1</span>') // URLs in teal
        .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="text-[#CE9178]">$1</span>') // Strings in orange
        .replace(/(\{|\})/g, '<span class="text-[#D4D4D4]">$1</span>'); // Brackets
    } else if (lang === 'json') {
      return text
        .replace(/("(?:[^"\\]|\\.)*")(\s*:)/g, '<span class="text-[#9CDCFE]">$1</span>$2') // Keys in blue
        .replace(/:\s*("(?:[^"\\]|\\.)*")/g, ': <span class="text-[#CE9178]">$1</span>') // String values in orange
        .replace(/:\s*(\d+\.?\d*)/g, ': <span class="text-[#B5CEA8]">$1</span>') // Numbers in green
        .replace(/:\s*(true|false|null)/g, ': <span class="text-[#569CD6]">$1</span>') // Booleans in blue
        .replace(/(\{|\}|\[|\])/g, '<span class="text-[#D4D4D4]">$1</span>') // Brackets
        .replace(/(,)/g, '<span class="text-[#D4D4D4]">$1</span>'); // Commas
    } else if (lang === 'javascript' || lang === 'typescript') {
      return text
        .replace(/\b(const|let|var|function|return|if|else|for|while|async|await|import|export|from)\b/g, '<span class="text-[#C586C0]">$1</span>') // Keywords in purple
        .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, '<span class="text-[#CE9178]">$1</span>') // Strings in orange
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-[#B5CEA8]">$1</span>') // Numbers in green
        .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-[#569CD6]">$1</span>') // Booleans in blue
        .replace(/(\/\/.*$)/gm, '<span class="text-[#6A9955]">$1</span>'); // Comments in green
    }
    return text;
  };

  const highlighted = highlightCode(code, language);

  return (
    <div className="bg-[#1E1E1E] rounded-2xl p-4 relative overflow-x-auto group">
      <pre className="text-sm font-mono text-[#D4D4D4] leading-relaxed">
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
      {onCopy && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#2D2D30] hover:bg-[#3E3E42] text-white border-0 rounded-full h-8 w-8 p-0"
          onClick={() => onCopy(code)}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      )}
    </div>
  );
};

// VS Code Dark+ Color Scheme
// Background: #1E1E1E
// Foreground: #D4D4D4
// Keywords (const, function, etc.): #C586C0 (purple)
// Strings: #CE9178 (orange)
// Numbers: #B5CEA8 (light green)
// Booleans/null: #569CD6 (blue)
// Comments: #6A9955 (green)
// Property keys: #9CDCFE (light blue)
// URLs/imports: #4EC9B0 (teal)
