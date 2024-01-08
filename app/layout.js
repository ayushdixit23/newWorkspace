"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./redux/Providers";
import Loading from "./components/Loading";
import TokenDataWrapper from "./utils/Tokenwrap";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Workspace",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`select-none ${inter.className}`}>
        {/* <Providers>
          <Loading children={children} />
        </Providers> */}
        <Providers>
          <TokenDataWrapper>{children}</TokenDataWrapper>
        </Providers>
      </body>
    </html>
  );
}
