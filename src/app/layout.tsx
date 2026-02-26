import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Sipster - Bartender in Your Pocket',
  description: 'Explore cocktail recipes, manage your back bar, and invent new drinks with your AI mixologist.',
  openGraph: {
    title: 'Sipster - Bartender in Your Pocket',
    description: 'Explore cocktail recipes, manage your back bar, and invent new drinks with your AI mixologist.',
    url: 'https://sipster.app',
    siteName: 'Sipster',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Sipster Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sipster - Bartender in Your Pocket',
    description: 'Explore cocktail recipes, manage your back bar, and invent new drinks with your AI mixologist.',
    images: ['/logo.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Sipster',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-[var(--color-dark-bg)] text-white font-sans antialiased overflow-x-hidden">
        <AuthProvider>
          <Navigation />

          {/* Main Content Area */}
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">

            {/* Subtle Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-neon-pink)]/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
            <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[var(--color-neon-blue)]/10 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

            {children}
          </main>

          {/* Footer */}
          <footer className="w-full border-t border-white/10 mt-auto py-6 text-center text-sm text-gray-400">
            <p>Sipster — Shake, stir, and sip your way through the night.</p>
          </footer>
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: '#1A1A1A',
                color: '#fff',
                border: '1px solid rgba(255,0,255,0.2)',
                boxShadow: '0 0 20px rgba(255,0,255,0.1)'
              }
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
