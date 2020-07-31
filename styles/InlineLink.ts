import styled from 'styled-components';

const InlineLink = styled.a`
    color: ${_ => _.theme.accent.normal};
    text-decoration: none;

    &:hover, &:focus, &:active {
        text-decoration: underline;
    }
`;

export default InlineLink;
