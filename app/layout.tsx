import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Optimize font loading for mobile
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Vorve',
  description: 'Get a professionally designed, conversion-optimized website that drives results. Complete solution with branding, hosting, and lifetime support.',
  icons: {
    icon: [
      { url: '/fav.png', sizes: '16x16', type: 'image/png' },
      { url: '/fav.png', sizes: '32x32', type: 'image/png' }
    ],
    shortcut: [
      { url: '/fav.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [
      { url: '/fav.png', sizes: '180x180', type: 'image/png' }
    ],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',
  },
  // Add mobile-specific meta tags for better performance
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'theme-color': '#131b1c',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registration successful');
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed');
                    });
                });
              }
            `,
          }}
        />
        {process.env.NODE_ENV === 'development' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function () {
                  var script = document.createElement('script');
                  script.src = 'https://cdn.jsdelivr.net/npm/eruda@3.0.1/eruda.min.js';
                  script.onload = function () {
                    eruda.init();
                    console.log('Eruda mobile debugger loaded');
                  };
                  document.head.appendChild(script);
                })();
              `,
            }}
          />
        )}
      </head>
      <body className={inter.className}>
        {children}
        <SpeedInsights />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
