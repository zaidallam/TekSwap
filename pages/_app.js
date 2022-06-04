import '../styles/globals.css'
import Layout from '../components/layout'
import { BlockchainContextProvider } from '../components/BlockchainContext'

function MyApp({ Component, pageProps }) {
    return (
        <BlockchainContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </BlockchainContextProvider>
    )
}

export default MyApp
