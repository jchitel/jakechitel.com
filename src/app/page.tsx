import { clsx } from "clsx";

export default function Home() {
    return (
        <div
            className={clsx(
                "max-w-prose mx-auto flex-grow flex flex-col justify-center",
            )}
        >
            <h1 className="text-7xl font-thin pb-4">Jake Chitel</h1>

            <p>
                I&apos;m a software engineer from{" "}
                <strong>Milwaukee, Wisconsin, USA</strong>. I am currently a{" "}
                <strong>Staff Software Engineer</strong> at{" "}
                <strong>
                    <a
                        className="underline"
                        href="https://directsupply.com"
                        target="_blank"
                    >
                        Direct Supply
                    </a>
                </strong>
                , where I work in frontend (<strong>React</strong>/
                <strong>TypeScript</strong>), backend (<strong>.NET</strong>/
                <strong>Node</strong>), and iOS (<strong>Swift</strong>/
                <strong>SwiftUI</strong>). Please reach out if you&apos;d like
                to connect!
            </p>
        </div>
    );
}
