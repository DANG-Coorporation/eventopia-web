import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eventopia',
  description: 'Simplify event ticket management effortlessly.',
};

import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
