import Document, { Html, Head, Main, NextScript } from "next/document";
import { ADS_ID } from "../lib/constants";

class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx);
  //   return { ...initialProps };
  // }

  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_ID}`}
            crossOrigin="anonymous"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body className="bg-gradient-to-br from-emerald-700 to-emerald-900 bg-fixed">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
