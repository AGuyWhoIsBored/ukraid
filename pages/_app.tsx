import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../client/components/common/Header";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// get font awesome CSS to work
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
