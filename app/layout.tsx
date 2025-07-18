import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import Footer from '@/app/ui/footer';
import Navbar from '@/app/ui/navbar';

export const metadata = {
  title: 'Luke Bryan',
  description: 'Luke Bryan Support platform',
  icons: {
    icon: '/logo.png', 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
