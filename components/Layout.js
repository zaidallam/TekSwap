import Head from 'next/head'
import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }) {
    return (
        <>
            <Head>
                <title>TekSwap</title>
                <meta name="description" content="A Decentralized Exchange" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='grid grid-rows-[min-content_1fr_min-content] h-screen'>
                <Header />
                <main>{children}</main>
                <Footer />
            </div>
        </>
    )
}