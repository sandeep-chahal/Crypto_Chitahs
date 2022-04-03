import "../styles/globals.css";
import Layout from "../components/layout";
import { ContextProvider } from "../store";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}

export default MyApp;
