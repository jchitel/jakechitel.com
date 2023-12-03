import { clsx } from "clsx";
import Bio from "./bio.mdx";

export default function Home() {
    return (
        <div
            className={clsx(
                "max-w-prose mx-auto flex-grow flex flex-col justify-center",
            )}
        >
            <h1 className="text-4xl md:text-7xl font-thin pb-4">Jake Chitel</h1>
            <Bio />
        </div>
    );
}
