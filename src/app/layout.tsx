import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { MeasurementProvider } from '@/contexts/MeasurementContext';
import { ChatProvider } from '@/contexts/ChatContext';
import Navigation from '@/components/Navigation';
import FloatingChat from '@/components/FloatingChat';
import OnboardingWizard from '@/components/OnboardingWizard';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Sipster - Bartender in Your Pocket',
  description: 'Explore cocktail recipes, manage your back bar, and invent new drinks with your AI mixologist.',
  manifest: '/manifest.json',
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen font-sans antialiased overflow-x-hidden transition-colors duration-500" suppressHydrationWarning>
        <ThemeProvider>
          <MeasurementProvider>
            <AuthProvider>
              <ChatProvider>
                <Navigation />

                {/* Main Content Area */}
                <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">

                  {/* Ambient Background Glows dynamically tracking theme primary/secondary */}
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--primary)]/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
                  <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[var(--secondary)]/10 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

                  {children}
                </main>

                {/* Footer */}
                <footer className="w-full border-t border-white/10 mt-auto py-6 text-center text-sm text-gray-400">
                  <p>Sipster — Shake, stir, and sip your way through the night.</p>
                </footer>

                <FloatingChat />
                <OnboardingWizard />

                <Toaster
                  position="bottom-center"
                  toastOptions={{
                    style: {
                      background: 'var(--surface)',
                      color: '#fff',
                      border: '1px solid var(--border)',
                      boxShadow: '0 0 20px var(--primary-glow)'
                    }
                  }}
                />
              </ChatProvider>
            </AuthProvider>
          </MeasurementProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
