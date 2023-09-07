import "./globals.css";
import { clsx } from "clsx";
import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import { Nav } from "./nav";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Jake Chitel",
    description: "The personal website of Jake Chitel",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={clsx(
                    sourceCodePro.className,
                    "min-h-screen",
                    "text-slate-900 bg-indigo-100",
                    "dark:text-slate-50 dark:bg-indigo-950",
                    "flex flex-col justify-between",
                )}
            >
                <header>
                    <Nav />
                </header>
                <main className="flex-grow flex flex-col">{children}</main>
                <footer className="text-center text-sm text-slate-500 dark:text-slate-400 pb-2">
                    Jake Chitel &copy; 2011 - {new Date().getFullYear()}
                </footer>
            </body>
        </html>
    );
}
