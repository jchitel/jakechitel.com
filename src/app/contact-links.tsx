import { FiFileText, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export function ContactLinks() {
    return (
        <div className="flex py-6 px-8 space-x-6 text-3xl">
            <a href="https://github.com/jchitel" target="_blank">
                <FiGithub />
            </a>
            <a
                href="https://www.linkedin.com/in/jake-chitel-4a395858/"
                target="_blank"
            >
                <FiLinkedin />
            </a>
            <a href="/resume.pdf" download="Jake Chitel - Resume.pdf">
                <FiFileText />
            </a>
            <a href="mailto:jchitel@gmail.com" target="_blank">
                <FiMail />
            </a>
        </div>
    );
}
