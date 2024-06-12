'use client'
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import { useEffect, useState  } from "react";
import Loader from "@/components/Common/Loader";
import { poppins } from '@/lib/fonts'
import { AuthProvider } from '@/context/AuthContext';
import "@/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 700);// Simulate loading for 0.5 second
  }, []);


  return (
    <ThemeProvider>
    <AuthProvider>
      <html lang="en">
        <body className={poppins.className}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? <Loader /> : children}
        </div>
        </body>
      </html>
    </AuthProvider>
    </ThemeProvider>
  );
}
