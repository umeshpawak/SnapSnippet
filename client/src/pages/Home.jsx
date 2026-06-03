import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SnippetForm from '../components/SnippetForm';
import CopyButton from '../components/CopyButton';
import Layout from '../components/Layout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API_URL}/api/snippets`, data);
      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const shareUrl = result
    ? `${window.location.origin}/snippet/${result.snippetId}`
    : '';

  const handleCreateAnother = () => {
    setResult(null);
    setError('');
  };

  return (
    <Layout>
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl">
          {!result ? (
            <div className="animate-in">
              {/* Hero */}
              <div className="text-center mb-12">
                <div className="badge mx-auto mb-6">
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  Auto-expiring links
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight leading-tight">
                  Share snippets that<br />
                  <span className="text-teal-700">disappear.</span>
                </h1>
                <p className="text-gray-500 text-lg max-w-md mx-auto leading-relaxed">
                  Paste code, text, or links. Get a unique URL that expires in 15 to 30 minutes. No signup required.
                </p>
              </div>

              {/* Form */}
              <div className="card p-6 sm:p-8 animate-in-delay">
                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2" id="error-message">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                )}
                <SnippetForm onSubmit={handleSubmit} isLoading={isLoading} />
              </div>

              {/* Features with icons */}
              <div className="grid grid-cols-3 gap-4 mt-10">
                <div className="card p-5 text-center">
                  <div className="w-11 h-11 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">Ephemeral</h3>
                  <p className="text-xs text-gray-500">Auto-deletes from database</p>
                </div>

                <div className="card p-5 text-center">
                  <div className="w-11 h-11 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">Instant</h3>
                  <p className="text-xs text-gray-500">No account needed</p>
                </div>

                <div className="card p-5 text-center">
                  <div className="w-11 h-11 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">Highlighted</h3>
                  <p className="text-xs text-gray-500">Syntax highlighting for code</p>
                </div>
              </div>
            </div>
          ) : (
            /* Success */
            <div className="animate-in">
              <div className="card p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">Link generated</h2>
                <p className="text-gray-500 mb-6">
                  This link will expire in{' '}
                  <span className="text-teal-700 font-semibold">
                    {Math.round((new Date(result.expiresAt) - new Date()) / 60000)} minutes
                  </span>
                </p>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 border border-gray-200 mb-6" id="share-url-container">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 bg-transparent text-gray-700 text-sm font-mono outline-none truncate"
                    id="share-url-input"
                  />
                  <CopyButton text={shareUrl} label="Copy Link" />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate(`/snippet/${result.snippetId}`)}
                    className="btn-secondary flex-1 px-6 py-3 text-sm flex items-center justify-center gap-2"
                    id="view-snippet-btn"
                  >
                    View Snippet
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                  <button
                    onClick={handleCreateAnother}
                    className="btn-primary flex-1 px-6 py-3 text-sm flex items-center justify-center gap-2"
                    id="create-another-btn"
                  >
                    Create Another
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
