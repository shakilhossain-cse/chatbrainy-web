import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

const ReduxProvider = dynamic(
  () => import("@/components/provider/redux-provider"),
  {
    ssr: false,
  }
);
const RootProvider = dynamic(
  () => import("@/components/provider/root-provider"),
  {
    ssr: false,
  }
);
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <RootProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </RootProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
