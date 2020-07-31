import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import InlineLink from '../styles/InlineLink';

export default function Home() {
    return (
        <Layout>
            <Main>
                <Title>
                    Welcome to <InlineLink href="https://nextjs.org">Next.js!</InlineLink>
                </Title>

                <Description>
                    Get started by editing{' '}
                    <Code>pages/index.js</Code>
                </Description>

                <Grid>
                    <Card href="https://nextjs.org/docs">
                        <h3>Documentation &rarr;</h3>
                        <p>Find in-depth information about Next.js features and API.</p>
                    </Card>

                    <Card href="https://nextjs.org/learn">
                        <h3>Learn &rarr;</h3>
                        <p>Learn about Next.js in an interactive course with quizzes!</p>
                    </Card>

                    <Card href="https://github.com/vercel/next.js/tree/master/examples">
                        <h3>Examples &rarr;</h3>
                        <p>Discover and deploy boilerplate example Next.js projects.</p>
                    </Card>

                    <Card
                        href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    >
                        <h3>Deploy &rarr;</h3>
                        <p>
                            Instantly deploy your Next.js site to a public URL with Vercel.
                        </p>
                    </Card>
                </Grid>
            </Main>
        </Layout>
    );
}

const Main = styled.main`
    padding: 5rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    margin: 0;
    line-height: 1.15;
    font-size: 4rem;
    text-align: center;
`;

const Description = styled.p`
    line-height: 1.5;
    font-size: 1.5rem;
    text-align: center;
`;

const Code = styled.code`
    background: ${_ => _.theme.background.light};
    border-radius: 5px;
    padding: 0.75rem;
    font-size: 1.1rem;
    font-family: ${_ => _.theme.font.mono};
`;

const Grid = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    max-width: 800px;
    margin-top: 3rem;

    @media (max-width: 600px) {
        width: 100%;
        flex-direction: column;
    }
`;

const Card = styled.a`
    margin: 1rem;
    flex-basis: 45%;
    padding: 1.5rem;
    text-align: left;
    color: inherit;
    text-decoration: none;
    border: 1px solid ${_ => _.theme.gray.light};
    border-radius: 10px;
    transition: color 0.15s ease, border-color 0.15s ease;

    &:hover, &:focus, &:active {
        color: ${_ => _.theme.accent.normal};
        border-color: ${_ => _.theme.accent.normal};
    }

    h3 {
        margin: 0 0 1rem 0;
        font-size: 1.5rem;
    }

    p {
        margin: 0;
        font-size: 1.25rem;
        line-height: 1.5;
    }
`;
