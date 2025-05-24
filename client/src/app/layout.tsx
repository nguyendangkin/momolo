// app/layout.tsx (nếu chưa có)
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "User Management App",
    description: "Quản lý người dùng với Next.js 15",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="vi">
            <body className="antialiased">{children}</body>
        </html>
    );
}
