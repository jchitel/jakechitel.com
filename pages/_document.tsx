import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html className="w-full p-0 bg-gray-900 text-gray-100" style={{ fontFamily: 'Jost, sans-serif' }}>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
