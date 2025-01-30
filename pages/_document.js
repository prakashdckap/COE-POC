import Document, { Html, Head, Main, NextScript } from "next/document";
import constants from "../src/helper/constant";

class MyDocument extends Document {
  render() {
    const GA_MEASUREMENT_ID = constants.GA_MEASUREMENT_ID;
    const GTM = constants.googleGtmId;
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/assets/icons/icon-48x48.png" />
          <meta name="theme-color" content="#840203" />
          <script src="https://cdn.noibu.com/collect-core.js" />
          <script async type="text/javascript" src="/js/newrelic.js" />
          <script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <script
            src={`https://www.googletagmanager.com/gtag/js?id=${GTM}`}
            strategy="afterInteractive"
          />
          <script src="https://kit.fontawesome.com/52d2b40c3f.js" crossorigin="anonymous" />
          <script src="https://www.gstatic.com/firebasejs/7.14.1/firebase-app.js" />
          <script src="https://www.gstatic.com/firebasejs/7.14.1/firebase-messaging.js" />
          {/* Google Tag Manager */}
          <script defer>
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','${GTM}');`}
          </script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function(w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
                var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s),
                  dl = l != "dataLayer" ? "&l=" + l : "";
                j.async = true;
                j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
                f.parentNode.insertBefore(j, f);
              })(window,document,'script','dataLayer','${GTM}');
              `,
            }}
          />
          {/* End Google Tag Manager */}
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){window.dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}');
                        console.log("WELCOME-GM_ID")
                      `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: ` window.dataLayer = window.dataLayer || []; 
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GTM}',
                        console.log("WELCOME-GTM")
                        { page_path: window.location.pathname, }); 
                      `,
            }}
          />
          {/* End Google Tag Manager (noscript) */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
