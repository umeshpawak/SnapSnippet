import React, { useState } from 'react';

const LANGUAGES = [
  { value: 'text', label: 'Plain Text' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C / C++' },
  { value: 'sql', label: 'SQL' },
  { value: 'php', label: 'PHP' },
];

export default function SnippetForm({ onSubmit, isLoading }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('text');
  const [expiryMinutes, setExpiryMinutes] = useState(15);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit({ title: title.trim(), content, language, expiryMinutes });
  };

  const charCount = content.length;
  const maxChars = 50000;

  return (
    <form onSubmit={handleSubmit} className="space-y-6" id="snippet-form">
      {/* Title */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., API Response, Meeting Notes, code "
          className="input w-full px-4 py-3 text-sm"
          maxLength={100}
          required
          id="snippet-title-input"
        />
      </div>

      {/* Language and Expiry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="select w-full px-4 py-3 text-sm pr-10"
            id="snippet-language-select"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Expires in <span className="font-bold text-gray-900">{expiryMinutes} min</span>
          </label>
          <div className="pt-2 px-1">
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={expiryMinutes}
              onChange={(e) => setExpiryMinutes(parseInt(e.target.value))}
              className="slider"
              id="snippet-expiry-slider"
            />
            <div className="flex justify-between mt-1.5">
              <span className="text-xs text-gray-400">5 min</span>
              <span className="text-xs text-gray-400">30 min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <span className={`text-xs ${charCount > maxChars * 0.9 ? 'text-amber-500' : 'text-gray-400'}`}>
            {charCount.toLocaleString()} / {maxChars.toLocaleString()}
          </span>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste your code, text, or link here..."
          className="textarea w-full px-4 py-4"
          rows={12}
          maxLength={maxChars}
          required
          id="snippet-content-textarea"
        />
      </div>

      {/* Submit — cyan accent button */}
      <button
        type="submit"
        disabled={isLoading || !title.trim() || !content.trim()}
        className="btn-accent w-full py-3.5 text-sm flex items-center justify-center gap-2"
        id="create-snippet-btn"
      >
        {isLoading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Creating...
          </>
        ) : (
          <>
            Generate Link
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
