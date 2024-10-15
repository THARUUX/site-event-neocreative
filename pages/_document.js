import { Html, Head, Main, NextScript } from "next/document";
import Actions from "@/components/Actions";
import { ReactLenis, useLenis } from 'lenis/react'

export default function Document() {
  const lenis = useLenis(({ scroll }) => {
  })
  return (
      <Html lang="en" Designed-and-developed-by="THARUUX">
        <Head>
          <title>DIARIES | Neo Creative</title>
          <meta name="description" content="Online store of Neo Creative. " />
          <meta name="keywords" content="neo creative, neo, neo graphics, neo ogf, neo creative hub" />
        </Head>
        <body>
          <ReactLenis root>
            <Actions />
            <Main />
            <NextScript />
          </ReactLenis>
        </body>
      </Html>
  );
}
