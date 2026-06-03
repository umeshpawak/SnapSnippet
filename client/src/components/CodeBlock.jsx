import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import java from 'highlight.js/lib/languages/java';
import cpp from 'highlight.js/lib/languages/cpp';
import typescript from 'highlight.js/lib/languages/typescript';
import sql from 'highlight.js/lib/languages/sql';
import markdown from 'highlight.js/lib/languages/markdown';
import php from 'highlight.js/lib/languages/php';
import 'highlight.js/styles/github.css';
import CopyButton from './CopyButton';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('java', java);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('php', php);

export default function CodeBlock({ content, language = 'text' }) {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current && language !== 'text') {
      hljs.highlightElement(codeRef.current);
    }
  }, [content, language]);

  const lineCount = content.split('\n').length;

  return (
    <div className="card overflow-hidden" id="code-block">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-gray-200"></span>
            <span className="w-3 h-3 rounded-full bg-gray-200"></span>
            <span className="w-3 h-3 rounded-full bg-gray-200"></span>
          </div>
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
            {language}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">{lineCount} lines</span>
          <CopyButton text={content} label="Copy" />
        </div>
      </div>

      {/* Code area */}
      <div className="overflow-auto max-h-[500px]">
        <div className="flex">
          <div className="flex-shrink-0 py-4 pr-4 pl-5 text-right select-none border-r border-gray-100">
            {content.split('\n').map((_, i) => (
              <div key={i} className="text-xs leading-[1.7] text-gray-300 font-mono">
                {i + 1}
              </div>
            ))}
          </div>
          <pre className="flex-1 py-4 px-5 overflow-x-auto">
            <code
              ref={codeRef}
              className={language !== 'text' ? `language-${language}` : ''}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#374151',
              }}
            >
              {content}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
