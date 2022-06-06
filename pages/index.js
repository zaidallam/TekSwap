import Head from 'next/head';
import ExchangeForm from '../components/ExchangeForm';

export default function Home() {

    return (
        <>
            <Head>
                <title>TekSwap</title>
                <meta name="description" content="A Decentralized Exchange" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='px-96'>
                <div className='w-min m-auto'>
                    <h2 className='text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-300 w-fit'>
                        Ready. Set. Swap!
                    </h2>
                    <ExchangeForm />
                </div>
            </div>
        </>
    )
}
