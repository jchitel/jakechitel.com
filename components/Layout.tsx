import React from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import Footer from './Footer';

export interface ILayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => (
    <Container>
        <Nav />

        <Content>
            {children}
            <Footer />
        </Content>
    </Container>
);

export default Layout;

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Content = styled.div`
    margin-top: ${_ => _.theme.navHeight};
`;
