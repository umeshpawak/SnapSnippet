import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import CodeBlock from '../components/CodeBlock';
import CountdownTimer from '../components/CountdownTimer';
import CopyButton from '../components/CopyButton';
import Layout from '../components/Layout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function ViewSnippet() {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/snippets/${id}`);
        setSnippet(res.data.data);
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSnippet();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="w-full max-w-3xl">
            <div className="card p-8 space-y-6">
              <div className="skeleton h-8 w-2/3"></div>
              <div className="skeleton h-4 w-1/3"></div>
              <div className="skeleton h-64 w-full"></div>
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  if (notFound) {
    return (
      <Layout>
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="animate-in text-center max-w-md">
            <div className="card p-10">
              <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">Snippet not found</h1>
              <p className="text-gray-500 mb-8 leading-relaxed">
                This snippet has either expired and been permanently deleted, or it never existed.
              </p>
              <Link
                to="/"
                className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-sm"
                id="go-home-btn"
              >
                Create New Snippet
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  const shareUrl = `${window.location.origin}/snippet/${snippet.snippetId}`;
  const createdDate = new Date(snippet.createdAt).toLocaleString();

  return (
    <Layout>
      <main className="flex-1 px-4 py-10 w-full">
        <div className="max-w-4xl mx-auto">
          <div className="animate-in">
            {/* Header */}
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              <div className="flex-1">
                <div className="badge mb-4">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                  Live Snippet
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-tight" id="snippet-title">
                  {snippet.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {createdDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    {snippet.language}
                  </span>
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className="card p-6 text-center">
                  <CountdownTimer expiresAt={snippet.expiresAt} />
                </div>
              </div>
            </div>

            {/* Share bar */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 border border-gray-200 mb-6 animate-in-delay" id="snippet-share-bar">
              <span className="text-xs text-gray-500 px-2 flex-shrink-0 font-medium">Share:</span>
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 bg-transparent text-gray-700 text-sm font-mono outline-none truncate"
              />
              <CopyButton text={shareUrl} label="Copy" />
            </div>

            {/* Code */}
            <div className="animate-in-delay">
              <CodeBlock content={snippet.content} language={snippet.language} />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-6 justify-center">
              <CopyButton text={snippet.content} label="Copy Content" />
              <a
                href={`${API_URL}/api/snippets/${snippet.snippetId}/raw`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2 px-5 py-2.5 text-sm"
                id="view-raw-btn"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Raw
              </a>
              <Link
                to="/"
                className="btn-primary flex items-center gap-2 px-5 py-2.5 text-sm"
                id="new-snippet-btn"
              >
                New Snippet
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
