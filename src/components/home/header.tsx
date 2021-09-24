import { FaRegEnvelope, FaLinkedinIn, FaGithub, FaRegFilePdf } from 'react-icons/fa';
import cx from 'classnames';


export const Header = () => (
    <header className={cx(
        "h-16 w-full px-8",
        "fixed flex justify-between items-center",
        "bg-gray-900",
        "font-bold tracking-widest"
    )} >
        <Nav />
        <ContactLinks />
    </header>
);

const Nav = () => (
    <nav className="flex space-x-6">
        <StyledLink href="#about">ABOUT</StyledLink>
        <StyledLink href="#experience">EXPERIENCE</StyledLink>
        <StyledLink href="#skills">SKILLS</StyledLink>
    </nav>
);

const ContactLinks = () => (
    <div className="flex space-x-6">
        <StyledLink href="mailto:jchitel@gmail.com" target="_blank">
            <FaRegEnvelope />
        </StyledLink>
        <StyledLink href="https://www.linkedin.com/in/jacob-chitel-4a395858/" target="_blank">
            <FaLinkedinIn />
        </StyledLink>
        <StyledLink href="https://github.com/jchitel" target="_blank">
            <FaGithub />
        </StyledLink>
        <StyledLink href="https://docs.google.com/document/d/1yx4TLATyxiUnakSEEV8YIxDzMhkWoyS8Pag9IhqBdrs/export?format=pdf">
            <FaRegFilePdf />
        </StyledLink>
    </div>
);

const StyledLink = ({
    href, target, children
}: {
    href: string;
    target?: string;
    children: React.ReactNode;
}) => (
    <a className="hover:text-gray-400 active:text-gray-600" href={href} target={target}>{children}</a>
)
