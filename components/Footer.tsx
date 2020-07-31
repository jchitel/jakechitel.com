import React from 'react';
import styled from 'styled-components';
import InlineLink from '../styles/InlineLink';

const Footer = () => (
    <StyledFooter>
        <InlineLink
            href="https://github.com/jchitel/jakechitel.com"
            target="_blank"
            rel="noopener noreferrer"
        >
            Built by Jake Chitel
        </InlineLink>
    </StyledFooter>
);

export default Footer;

const StyledFooter = styled.footer`
    width: 100%;
    height: 100px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-top: 1px solid ${_ => _.theme.gray.light};

    font-family: ${_ => _.theme.font.mono};
    font-size: 1rem;
`;
