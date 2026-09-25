import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Simple, lightweight markdown-like parser for conversational AI responses
  const lines = content.split('\n');

  const formattedElements: React.ReactNode[] = [];
  let inList = false;
  let listItems: string[] = [];

  const flushList = (keyPrefix: number) => {
    if (inList && listItems.length > 0) {
      formattedElements.push(
        <ul key={`list-${keyPrefix}`} className="space-y-1.5 my-2 pl-2">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-stone-800 text-[15px] leading-relaxed">
              <span className="text-amber-600 font-bold text-base leading-none mt-1 select-none">•</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            </li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  const formatInline = (text: string): string => {
    return text
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-stone-900">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em class="italic text-stone-700">$1</em>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-amber-100/70 text-amber-900 font-mono text-xs">$1</code>');
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Check headings
    if (trimmed.startsWith('### ')) {
      flushList(index);
      formattedElements.push(
        <h4 key={`h4-${index}`} className="text-base font-bold text-stone-900 mt-3 mb-1.5 flex items-center gap-1.5">
          {trimmed.replace('### ', '')}
        </h4>
      );
    } else if (trimmed.startsWith('## ')) {
      flushList(index);
      formattedElements.push(
        <h3 key={`h3-${index}`} className="text-lg font-bold text-amber-950 mt-3.5 mb-1.5 flex items-center gap-1.5 border-b border-amber-200/60 pb-1">
          {trimmed.replace('## ', '')}
        </h3>
      );
    } else if (trimmed.startsWith('# ')) {
      flushList(index);
      formattedElements.push(
        <h2 key={`h2-${index}`} className="text-xl font-extrabold text-amber-950 mt-4 mb-2">
          {trimmed.replace('# ', '')}
        </h2>
      );
    }
    // Numbered list or option item e.g. "1. " or "Option 1:"
    else if (/^(\d+[\.\)]|Option\s+\d+[:\-])/i.test(trimmed)) {
      flushList(index);
      const isOption = /^Option\s+\d+/i.test(trimmed);
      formattedElements.push(
        <div
          key={`opt-${index}`}
          className={`my-2.5 p-3 rounded-xl border ${
            isOption
              ? 'bg-amber-50/70 border-amber-200 shadow-xs'
              : 'bg-stone-50 border-stone-200/80'
          }`}
        >
          <div
            className="text-[15px] leading-relaxed text-stone-800"
            dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }}
          />
        </div>
      );
    }
    // Bullet point
    else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      inList = true;
      listItems.push(trimmed.substring(2));
    }
    // Blockquote
    else if (trimmed.startsWith('> ')) {
      flushList(index);
      formattedElements.push(
        <blockquote
          key={`quote-${index}`}
          className="border-l-4 border-amber-500 pl-3 py-1 my-2 bg-amber-50/50 rounded-r-lg italic text-stone-700 text-sm"
        >
          <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed.substring(2)) }} />
        </blockquote>
      );
    }
    // Empty line
    else if (trimmed === '') {
      flushList(index);
      if (index > 0 && index < lines.length - 1) {
        formattedElements.push(<div key={`spacer-${index}`} className="h-1.5" />);
      }
    }
    // Regular paragraph
    else {
      flushList(index);
      formattedElements.push(
        <p
          key={`p-${index}`}
          className="text-[15px] leading-relaxed text-stone-800 my-1"
          dangerouslySetInnerHTML={{ __html: formatInline(line) }}
        />
      );
    }
  });

  flushList(lines.length);

  return <div className="space-y-0.5">{formattedElements}</div>;
};
