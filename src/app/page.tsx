import { clsx } from "clsx";
import Link from "next/link";

export default function Home() {
    return (
        <div
            className={clsx(
                "max-w-prose mx-auto flex-grow flex flex-col justify-center",
            )}
        >
            <h1 className="text-7xl font-thin pb-4">Jake Chitel</h1>

            <p>
                I&apos;m a <strong>Staff Software Engineer</strong> from{" "}
                <strong>Milwaukee, Wisconsin, USA</strong>. I love building{" "}
                <strong>frontends</strong> and the <strong>backends</strong>{" "}
                that power them. I have an unhealthy obsession with{" "}
                <strong>improving</strong> things. I deeply enjoy{" "}
                <strong>learning</strong> and teaching. Please reach out if
                you&apos;d like to connect!
            </p>
        </div>
    );
}
