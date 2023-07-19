import Layout from "@/components/layout";
import { store } from "@/store";
import "@/styles/globals.css";
import { Provider, useStore } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
