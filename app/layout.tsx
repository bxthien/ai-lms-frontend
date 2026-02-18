import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/auth";
import { Header } from "@/components/layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI-LMS – Hệ thống học tập thông minh",
  description: "Nền tảng LMS với AI chấm bài, tạo quiz và gợi ý lộ trình học.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="font-sans">
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
