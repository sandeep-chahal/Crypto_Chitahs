import "../styles/globals.css";
import Layout from "../components/layout";
import { ContextProvider } from "../store";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <AnimatePresence>
        <AnimateSharedLayout>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AnimateSharedLayout>
      </AnimatePresence>
    </ContextProvider>
  );
}

export default MyApp;
