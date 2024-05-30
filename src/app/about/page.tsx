import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

import { Container } from "@/components/Container";
import portraitImage from "@/images/portrait.jpg";
import AboutMe from "./about-me.mdx";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

function SocialLink({
    className,
    href,
    children,
    icon: Icon,
}: {
    className?: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
}) {
    return (
        <li className={clsx(className, "flex")}>
            <Link
                href={href}
                className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-100 dark:hover:text-teal-500"
            >
                <Icon className="h-6 w-6 flex-none fill-indigo-500 transition group-hover:fill-teal-500" />
                <span className="ml-4">{children}</span>
            </Link>
        </li>
    );
}

export const metadata: Metadata = {
    title: "About",
    description:
        "I'm Jake Chitel. I live in Milwaukee, and I build cool stuff.",
};

export default function About() {
    return (
        <Container className="mt-16 sm:mt-32">
            <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
                <div className="lg:pl-20">
                    <div className="max-w-xs px-2.5 lg:max-w-none">
                        <Image
                            src={portraitImage}
                            alt=""
                            sizes="(min-width: 1024px) 32rem, 20rem"
                            className="aspect-square rotate-3 rounded-2xl bg-indigo-100 object-cover dark:bg-indigo-800"
                        />
                    </div>
                </div>
                <div className="lg:order-first lg:row-span-2">
                    <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                        {metadata.description}
                    </h1>
                    <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-300">
                        <AboutMe />
                    </div>
                </div>
                <div className="lg:pl-20">
                    <ul role="list">
                        <SocialLink
                            href="https://github.com/jchitel"
                            icon={FaGithub}
                            className="mt-4"
                        >
                            Follow on GitHub
                        </SocialLink>
                        <SocialLink
                            href="https://www.linkedin.com/in/jake-chitel-4a395858/"
                            icon={FaLinkedin}
                            className="mt-4"
                        >
                            Follow on LinkedIn
                        </SocialLink>
                        <SocialLink
                            href="mailto:jchitel@gmail.com"
                            icon={FaEnvelope}
                            className="mt-8 border-t border-indigo-100 pt-8 dark:border-indigo-600/40"
                        >
                            jchitel@gmail.com
                        </SocialLink>
                    </ul>
                </div>
            </div>
        </Container>
    );
}
