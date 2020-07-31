import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import media from '../styles/media';
import GitHubIcon from './icons/GitHubIcon';
import LinkedInIcon from './icons/LinkedInIcon';

const Nav = () => (
    <Header>
        <LogoContainer>
            <Logo>JC</Logo>
        </LogoContainer>
        <NavLinks>
            <Link href="/" passHref>
                <StyledLink>Home</StyledLink>
            </Link>
            <Link href="/blog" passHref>
                <StyledLink>Blog</StyledLink>
            </Link>
            <Link href="/projects" passHref>
                <StyledLink>Projects</StyledLink>
            </Link>
            <Link href="/tools" passHref>
                <StyledLink>Tools</StyledLink>
            </Link>
        </NavLinks>
        <ContactLinks>
            <ContactLink
                href="https://github.com/jchitel"
                target="_blank"
                rel="noopener noreferrer"
            >
                <GitHubIcon />
            </ContactLink>
            <ContactLink
                href="https://www.linkedin.com/in/jacob-chitel-4a395858/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <LinkedInIcon />
            </ContactLink>
            <ContactLink
                href="mailto:jchitel@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                @
            </ContactLink>
        </ContactLinks>
    </Header>
);

export default Nav;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: fixed;
    top: 0;
    width: 100%;
    height: ${_ => _.theme.navHeight};
    padding: 0 50px;
    ${media.desktop} { padding: 0 40px; }
    ${media.tablet} { padding: 0 25px; }

    background-color: ${_ => _.theme.background.dark};
    z-index: 10;
`;

const LogoContainer = styled.div`
    flex: 1 1 0;
`;

const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;

    width: 40px;
    height: 40px;
    border: 3px solid ${_ => _.theme.accent.normal};
    border-radius: 10px;

    color: ${_ => _.theme.accent.normal};
    font-family: ${_ => _.theme.font.mono};
`;

const NavLinks = styled.nav`
    flex: 2 1 0;

    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledLink = styled.a`
    padding: 0 20px;

    font-family: ${_ => _.theme.font.mono};
    font-size: 1rem;

    color: ${_ => _.theme.primary.normal};

    &:hover, &:active {
        color: ${_ => _.theme.accent.normal};
    }

    cursor: pointer;
`;

const ContactLinks = styled.div`
    flex: 1 1 0;

    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const ContactLink = styled.a`
    padding: 10px;

    color: ${_ => _.theme.primary.normal};

    &:hover {
        color: ${_ => _.theme.accent.normal};
    }

    svg {
        width: 18px;
        height: 18px;
        fill: currentcolor;
        vertical-align: middle;
    }

    font-size: 18px;
`;
