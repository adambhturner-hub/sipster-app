'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("JOURNAL ROUTE ERROR:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-red-900 text-white p-8">
      <h2 className="text-2xl font-bold mb-4">Journal Render Crash</h2>
      <p className="mb-4">Message: {error?.message || String(error)}</p>
      <div className="bg-black/50 p-4 rounded text-left overflow-auto max-w-4xl w-full font-mono text-sm leading-relaxed whitespace-pre-wrap">
        {error?.stack || 'No stack trace available'}
      </div>
      <button
        onClick={() => reset()}
        className="mt-6 bg-white text-red-900 px-6 py-2 rounded font-bold"
      >
        Try again
      </button>
    </div>
  );
}
