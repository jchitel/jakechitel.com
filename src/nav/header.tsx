"use client";

import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiFileText, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { HiBars3, HiXMark } from "react-icons/hi2";

const navigation = [{ title: "About", href: "/about" }];

type ContactLink = Omit<
    React.JSX.IntrinsicElements["a"],
    "className" | "children"
> & {
    icon: React.ReactNode;
    title: string;
};

const contactLinks: ContactLink[] = [
    {
        href: "https://github.com/jchitel",
        target: "_blank",
        icon: <FiGithub />,
        title: "GitHub",
    },
    {
        href: "https://www.linkedin.com/in/jake-chitel-4a395858/",
        target: "_blank",
        icon: <FiLinkedin />,
        title: "LinkedIn",
    },
    {
        href: "/resume.pdf",
        download: "Jake Chitel - Resume.pdf",
        icon: <FiFileText />,
        title: "Resume",
    },
    {
        href: "mailto:jchitel@gmail.com",
        target: "_blank",
        icon: <FiMail />,
        title: "Email",
    },
];

export function NavHeader() {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    return (
        <header
            className={clsx(
                "bg-gradient-to-b from-indigo-300 to-indigo-300/0",
                "dark:from-indigo-900 dark:to-indigo-900/0",
            )}
        >
            <nav
                className={clsx(
                    "mx-auto max-w-7xl p-6 lg:px-8",
                    "flex items-center justify-between",
                )}
                aria-label="Global"
            >
                {/* Home page link */}
                <div className="flex lg:flex-1">
                    <Logo href="/" />
                </div>
                {/* Open mobile nav button (only visible on small screens) */}
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className={clsx(
                            "-m-2.5 rounded-md p-2.5",
                            "text-indigo-700 dark:text-indigo-200",
                            "inline-flex items-center justify-center",
                        )}
                        onClick={() => setMobileNavOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <HiBars3 className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                {/* Main nav links (only visible on large screens) */}
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map(({ title, href }) => (
                        <Link
                            key={title}
                            href={href}
                            className={clsx(
                                "text-lg font-semibold leading-6",
                                "-mx-3 rounded-lg px-3 py-2",
                                "hover:bg-indigo-300",
                                "hover:dark:bg-indigo-800",
                            )}
                        >
                            {title}
                        </Link>
                    ))}
                </div>
                {/* Contact links (only visible on large screens) */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-1">
                    {contactLinks.map(({ icon, title, ...props }) => (
                        <a
                            key={title}
                            className={clsx(
                                "rounded-full p-2",
                                "hover:bg-indigo-300",
                                "hover:dark:bg-indigo-800",
                                "text-xl font-semibold leading-6",
                            )}
                            {...props}
                        >
                            {icon}
                        </a>
                    ))}
                </div>
            </nav>
            <MobileNav open={mobileNavOpen} setOpen={setMobileNavOpen} />
        </header>
    );
}

function MobileNav({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    return (
        <Dialog as="div" className="lg:hidden" open={open} onClose={setOpen}>
            {/* Backdrop */}
            <div className="fixed inset-0 z-10 bg-black/10 dark:bg-black/50" />
            <Dialog.Panel
                className={clsx(
                    "fixed inset-y-0 right-0 z-10",
                    "w-full px-6 py-6",
                    "overflow-y-auto",
                    "bg-indigo-200 dark:bg-indigo-950",
                    // TODO: fix colors?
                    "sm:max-w-sm sm-ring-1 sm:ring-gray-900/100",
                )}
            >
                {/* Header */}
                <div
                    className={clsx(
                        "-mx-6 -mt-6 px-6 pt-6",
                        "flex items-center justify-between",
                        "bg-gradient-to-b from-indigo-300 to-indigo-300/0",
                        "dark:from-indigo-950 dark:to-indigo-950/0",
                    )}
                >
                    {/* Home page link */}
                    <Logo href="/" />
                    {/* Close menu button */}
                    <button
                        type="button"
                        className={clsx(
                            "-m-2.5 rounded-md p-2.5",
                            "text-indigo-700 dark:text-indigo-300",
                        )}
                        onClick={() => setOpen(false)}
                    >
                        <span className="sr-only">Close menu</span>
                        <HiXMark className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="mt-6 flow-root">
                    {/* TODO: fix colors? */}
                    <div className="-my-6 divide-y divide-gray-500/10">
                        {/* Main nav links */}
                        <div className="space-y-2 py-6">
                            {navigation.map(({ title: name, href }) => (
                                <Link
                                    key={name}
                                    href={href}
                                    className={clsx(
                                        "-mx-3 rounded-lg px-3 py-2",
                                        "block",
                                        "text-base font-semibold leading-7",
                                        "hover:bg-indigo-300",
                                        "hover:dark:bg-indigo-800",
                                    )}
                                >
                                    {name}
                                </Link>
                            ))}
                        </div>
                        {/* Contact links */}
                        <div className="space-y-2 py-6">
                            {contactLinks.map(({ icon, title, ...props }) => (
                                <a
                                    key={title}
                                    className={clsx(
                                        "-mx-3 rounded-lg px-3 py-2",
                                        "flex items-center justify-start gap-x-3",
                                        "text-base font-semibold leading-7",
                                        "hover:bg-indigo-300",
                                        "hover:dark:bg-indigo-800",
                                    )}
                                    {...props}
                                >
                                    <div className="text-xl">{icon}</div>
                                    <span>{title}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
}

interface LogoProps {
    size?: "sm" | "md" | "lg";
    href?: string;
}

function Logo({ size = "md", href }: LogoProps) {
    const numSize = size === "sm" ? 32 : size === "md" ? 48 : 64;
    const image = (
        <Image
            src="/jake.png"
            alt="Jake Chitel"
            width={numSize}
            height={numSize}
        />
    );
    const containerClass = "rounded-full hover:ring hover:ring-indigo-50";
    return href ? (
        <a className={containerClass} href={href}>
            {image}
        </a>
    ) : (
        <div className={containerClass}>{image}</div>
    );
}
