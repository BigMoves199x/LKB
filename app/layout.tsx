import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import Footer from '@/app/ui/footer';
import Navbar from '@/app/ui/navbar';

export const metadata = {
  title: 'Vaco',
  description: 'Vaco job application platform',
  icons: {
    icon: '/Vaco.webp', 
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
        <Navbar/>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
