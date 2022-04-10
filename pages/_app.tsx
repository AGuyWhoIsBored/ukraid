import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../client/components/common/Header";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SessionProvider } from "next-auth/react";

// get font awesome CSS to work
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <SessionProvider session={pageProps.session}>
          <Header />
          <Component {...pageProps} />
      </SessionProvider>
    </div>

  );
}

export default MyApp;
