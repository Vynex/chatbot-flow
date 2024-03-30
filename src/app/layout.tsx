import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chatbot Flow Builder - BiteSpeed",
  description: "Frontend Assignment for BiteSpeed",
};

interface IProps {
  children: React.ReactNode;
};

const RootLayout: React.FunctionComponent<IProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

export default RootLayout;
