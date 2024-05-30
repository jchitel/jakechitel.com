import { clsx } from "clsx";
import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import { Layout } from "@/components/Layout";
import { Providers } from "./providers";

import "./globals.css";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Jake Chitel",
    description:
        "I'm a software engineer from Milwaukee. I love building frontends and the backends that power them.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={clsx(sourceCodePro.className, "h-full antialiased")}
            suppressHydrationWarning
        >
            <body className="flex h-full bg-indigo-50 dark:bg-black">
                <Providers>
                    <div className="flex w-full">
                        <Layout>{children}</Layout>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
