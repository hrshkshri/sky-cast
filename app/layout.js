import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sky Cast",
  description: "all about sky you wanna know",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex justify-center items-center h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
