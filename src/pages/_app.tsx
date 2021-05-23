import * as React from "react";
import type {AppProps} from "next/app";
import Head from 'next/head';

function App({Component, pageProps}: AppProps): JSX.Element
{
    return <>
        <Head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
            <meta name="description" content=""/>
            <title/>
        </Head>
        <Component {...pageProps}/>
    </>
}

export default App;
