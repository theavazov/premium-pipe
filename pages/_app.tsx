import "../styles/main.css";
import type { AppProps } from "next/app";
import Router from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";
import { QueryClient, QueryClientProvider } from "react-query";
import TranslationsProvider from "../store/translations";
import FormContextProvider from "../store/form";
import SiteinfoProvider from "../store/siteinfo";
import OrdersContextProvider from "../store/storage";
import ModalContextProvider from "../store/modal";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      NProgress.start();
    });

    Router.events.on("routeChangeComplete", () => {
      NProgress.done();
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TranslationsProvider>
        <FormContextProvider>
          <SiteinfoProvider>
            <OrdersContextProvider>
              <ModalContextProvider>
                <Component {...pageProps} />
              </ModalContextProvider>
            </OrdersContextProvider>
          </SiteinfoProvider>
        </FormContextProvider>
      </TranslationsProvider>
    </QueryClientProvider>
  );
}
