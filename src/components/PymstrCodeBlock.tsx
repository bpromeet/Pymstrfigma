import React from 'react';
import { Button } from './ui/button';
import { Copy, Check } from 'lucide-react';

interface PymstrCodeBlockProps {
  code: string;
  language?: 'bash' | 'json' | 'javascript' | 'typescript' | 'python' | 'php';
  onCopy?: (code: string) => void;
  copied?: boolean;
}

export const PymstrCodeBlock: React.FC<PymstrCodeBlockProps> = ({ 
  code, 
  language = 'json', 
  onCopy, 
  copied = false
}) => {
  // Simple JSON tokenizer that creates React elements
  const renderJSON = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      const parts: JSX.Element[] = [];
      
      // Match property key: "key":
      const propertyMatch = line.match(/^(\s*)("([^"]+)")(\s*)(:)/);
      if (propertyMatch) {
        parts.push(<span key="0" className="text-[#D4D4D4]">{propertyMatch[1]}</span>);
        parts.push(<span key="1" className="text-[#07D7FF]">{propertyMatch[2]}</span>);
        parts.push(<span key="2" className="text-[#D4D4D4]">{propertyMatch[4]}</span>);
        parts.push(<span key="3" className="text-[#D4D4D4]">{propertyMatch[5]}</span>);
        
        const restOfLine = line.substring(propertyMatch[0].length);
        
        // String value
        if (restOfLine.trim().startsWith('"')) {
          const valueMatch = restOfLine.match(/^(\s*)("(?:[^"\\]|\\.)*")(.*)$/);
          if (valueMatch) {
            parts.push(<span key="4" className="text-[#D4D4D4]">{valueMatch[1]}</span>);
            parts.push(<span key="5" className="text-[#CE9178]">{valueMatch[2]}</span>);
            parts.push(<span key="6" className="text-[#D4D4D4]">{valueMatch[3]}</span>);
          }
        }
        // Number value
        else if (restOfLine.match(/^\s*\d+/)) {
          const valueMatch = restOfLine.match(/^(\s*)(\d+\.?\d*)(.*)$/);
          if (valueMatch) {
            parts.push(<span key="4" className="text-[#D4D4D4]">{valueMatch[1]}</span>);
            parts.push(<span key="5" className="text-[#B5CEA8]">{valueMatch[2]}</span>);
            parts.push(<span key="6" className="text-[#D4D4D4]">{valueMatch[3]}</span>);
          }
        }
        // Boolean/null
        else if (restOfLine.match(/^\s*(true|false|null)/)) {
          const valueMatch = restOfLine.match(/^(\s*)(true|false|null)(.*)$/);
          if (valueMatch) {
            parts.push(<span key="4" className="text-[#D4D4D4]">{valueMatch[1]}</span>);
            parts.push(<span key="5" className="text-[#569CD6]">{valueMatch[2]}</span>);
            parts.push(<span key="6" className="text-[#D4D4D4]">{valueMatch[3]}</span>);
          }
        }
        // Array/object
        else {
          parts.push(<span key="4" className="text-[#D4D4D4]">{restOfLine}</span>);
        }
      } else {
        // Just structure (brackets, etc.)
        parts.push(<span key="0" className="text-[#D4D4D4]">{line}</span>);
      }
      
      return (
        <div key={lineIdx}>
          {parts}
        </div>
      );
    });
  };

  const renderBash = (text: string) => {
    return <span className="text-[#D4D4D4]">{text}</span>;
  };

  const renderCode = () => {
    if (language === 'json') {
      return renderJSON(code);
    } else if (language === 'bash') {
      return renderBash(code);
    } else {
      // Default: plain text
      return <span className="text-[#D4D4D4]">{code}</span>;
    }
  };

  return (
    <div className="bg-[#1E1E1E] rounded-2xl p-4 relative overflow-x-auto group border border-[#43586C]/30">
      <pre className="text-sm font-mono leading-relaxed">
        <code>
          {renderCode()}
        </code>
      </pre>
      {onCopy && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#2D2D30] hover:bg-[#3E3E42] text-[#D4D4D4] border-0 rounded-lg h-8 w-8 p-0"
          onClick={() => onCopy(code)}
        >
          {copied ? (
            <Check className="w-4 h-4 text-[#7DD069]" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      )}
    </div>
  );
};
