import { clsx } from "clsx";
import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import { NavHeader } from "@/nav/header";

import "./globals.css";

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
                    "text-slate-900 bg-indigo-200",
                    "dark:text-slate-50 dark:bg-indigo-950",
                    "flex flex-col justify-between",
                )}
            >
                <NavHeader />
                <main
                    className={clsx(
                        "flex-grow flex flex-col",
                        "mt-20",
                        "mx-8 md:mx-[unset]",
                    )}
                >
                    {children}
                </main>
                <footer
                    className={clsx(
                        "pb-2 pt-6",
                        "bg-gradient-to-t from-indigo-300 to-indigo-300/0",
                        "dark:from-indigo-900 dark:to-indigo-900/0",
                        "text-center text-sm text-slate-600 dark:text-slate-400",
                    )}
                >
                    Jake Chitel &copy; 2011 - {new Date().getFullYear()}
                </footer>
            </body>
        </html>
    );
}
