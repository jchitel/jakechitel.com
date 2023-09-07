import Link from "next/link";

export function Nav() {
    return (
        <nav className="fixed top-4 left-8 space-x-6 text-lg">
            <Link className="hover:underline" href="/">
                Home
            </Link>
            <Link className="hover:underline" href="/about">
                About
            </Link>
        </nav>
    );
}
