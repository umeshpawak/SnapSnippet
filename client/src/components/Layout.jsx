import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="w-full sticky top-0 z-50 shadow-sm" style={{ backgroundColor: '#183640' }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">SnapSnippet</span>
          </Link>
          
          {isHome ? (
            <span className="text-sm text-gray-400 hidden sm:block">Temporary snippet sharing</span>
          ) : (
            <Link
              to="/"
              className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white border border-gray-600 hover:border-gray-400 hover:bg-white/5 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to home
            </Link>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 text-center mt-auto" style={{ backgroundColor: '#f8f9fa' }}>
        <p className="text-xs text-gray-500">
          Snippets are permanently deleted after expiry. No recovery possible.
        </p>
      </footer>
    </div>
  );
}
