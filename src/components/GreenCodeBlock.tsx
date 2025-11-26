import React from 'react';
import { Button } from './ui/button';
import { Copy, Check } from 'lucide-react';

interface GreenCodeBlockProps {
  code: string;
  language?: 'bash' | 'json' | 'javascript' | 'typescript';
  onCopy?: (code: string) => void;
  copied?: boolean;
}

export const GreenCodeBlock: React.FC<GreenCodeBlockProps> = ({ 
  code, 
  language = 'json', 
  onCopy, 
  copied = false
}) => {
  const highlightCode = (text: string, lang: string) => {
    // Matrix/Terminal green theme highlighting
    if (lang === 'bash' || lang === 'shell') {
      return text
        // Commands (curl, POST, etc.)
        .replace(/^(curl|wget|npm|yarn|git|docker)\b/gm, '<span class="text-[#00FF41] font-semibold">$1</span>')
        .replace(/\s(-[A-Za-z]|--[a-z-]+)\b/g, ' <span class="text-[#39FF14]">$1</span>') // Flags
        .replace(/(POST|GET|PUT|DELETE|PATCH)\b/g, '<span class="text-[#00D9FF]">$1</span>') // HTTP methods
        .replace(/(https?:\/\/[^\s"']+)/g, '<span class="text-[#00FFFF]">$1</span>') // URLs in cyan
        .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, '<span class="text-[#7FFF00]">$1</span>') // Strings
        .replace(/(\\)$/gm, '<span class="text-[#39FF14]">$1</span>'); // Line continuation
    } else if (lang === 'json') {
      return text
        // Property keys in bright green
        .replace(/("(?:[^"\\]|\\.)*")(\s*:)/g, '<span class="text-[#39FF14] font-medium">$1</span><span class="text-[#00FF41]">$2</span>')
        // String values in chartreuse
        .replace(/:\s*("(?:[^"\\]|\\.)*")/g, ':<span class="text-[#00FF41]"> </span><span class="text-[#7FFF00]">$1</span>')
        // Numbers in lime
        .replace(/:\s*(\d+\.?\d*)/g, ':<span class="text-[#00FF41]"> </span><span class="text-[#ADFF2F]">$1</span>')
        // Booleans in cyan
        .replace(/:\s*(true|false|null)/g, ':<span class="text-[#00FF41]"> </span><span class="text-[#00D9FF]">$1</span>')
        // Brackets and structural characters
        .replace(/([{}\[\]])/g, '<span class="text-[#00FF41]">$1</span>')
        // Commas
        .replace(/(,)/g, '<span class="text-[#39FF14]">$1</span>');
    } else if (lang === 'javascript' || lang === 'typescript') {
      return text
        .replace(/\b(const|let|var|function|return|if|else|for|while|async|await|import|export|from|class|extends|new)\b/g, '<span class="text-[#00D9FF] font-semibold">$1</span>') // Keywords
        .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, '<span class="text-[#7FFF00]">$1</span>') // Strings
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-[#ADFF2F]">$1</span>') // Numbers
        .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-[#00FFFF]">$1</span>') // Booleans
        .replace(/(\/\/.*$)/gm, '<span class="text-[#39FF14] opacity-70">$1</span>'); // Comments
    }
    return text;
  };

  const highlighted = highlightCode(code, language);

  return (
    <div className="bg-black rounded-2xl p-4 relative overflow-x-auto group border border-[#00FF41]/20">
      <pre className="text-sm font-mono text-[#00FF41] leading-relaxed">
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
      {onCopy && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 hover:bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/30 rounded-full h-8 w-8 p-0"
          onClick={() => onCopy(code)}
        >
          {copied ? (
            <Check className="w-4 h-4 text-[#00FF41]" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      )}
    </div>
  );
};

// Matrix/Terminal Green Theme Color Scheme
// Background: #000000 (pure black)
// Base text: #00FF41 (matrix green)
// Keywords: #00D9FF (cyan)
// Strings: #7FFF00 (chartreuse)
// Numbers: #ADFF2F (yellow-green/lime)
// Booleans/constants: #00FFFF (cyan)
// Property names: #39FF14 (neon green)
// Flags/options: #39FF14 (neon green)
// URLs: #00FFFF (cyan)
