import Layout from '../app/layout'
import "../app/styles/globals.css"; // Import global styles

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;