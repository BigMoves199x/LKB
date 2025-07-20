import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import Footer from '@/app/ui/footer';
import Navbar from '@/app/ui/navbar';
import Script from 'next/script'; // ✅ import Script

export const metadata = {
  title: 'Luke Bryan',
  description: 'Luke Bryan Support platform',
  icons: {
    icon: '', 
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
        {/* ✅ Proper Tawk.to Script injection */}
        <Script id="tawkto-chat-widget" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/687be8277a63a019157256a1/1j0i05n25';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
