import Image from "next/image";
import Link from "next/link";

export function Nav() {
    return (
        <nav className="flex items-center py-6 px-8 space-x-6 text-lg">
            <Link
                className="rounded-full p-1 border-2 border-transparent hover:border-slate-50"
                href="/"
            >
                <Image
                    src="/icon.png"
                    alt="Jake Chitel"
                    width={48}
                    height={48}
                />
            </Link>
            <Link className="hover:underline" href="/about">
                About
            </Link>
        </nav>
    );
}
