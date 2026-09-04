import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AppProviders from '@/components/providers/AppProviders';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import '@/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Find Healthcare Jobs Across Canada`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL('https://healthbridge.ca'),
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: SITE_NAME,
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-CA" className={geistSans.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <AppProviders>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
