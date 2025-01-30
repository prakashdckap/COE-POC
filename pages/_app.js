import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import Router from "next/router";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import store from "../src/redux/store";
import client from "../src/helper/graphql";
import { AccountHeading } from "../src/components/account/account-heading";
import { AccountHeadTag } from "../src/components/account/account-head-tag";
import "../styles/globals.scss";
import "../styles/index.css";
import { AppLayout } from "../src/layout/AppLayout";
import "nprogress/nprogress.css";
import constants from "../src/helper/constant";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  /** ###### Maintenace Mode UI ######
   * return below code for enabling @maintenace_mode
   * --NOTE--: DO_NOT_REMOVE_FROM_COMMENT
   * @return <img src="assets/maintenace.jpg" />;
   */
  
  // return <img src="assets/maintenace.jpg" />;
  
  
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppLayout>
          <GoogleTagManager gtmId={constants.googleGtmId} />
          <GoogleAnalytics gaId={constants.GA_MEASUREMENT_ID} />
          {getLayout(<Component {...pageProps} />, <AccountHeading />, <AccountHeadTag />)}
        </AppLayout>
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp;

MyApp.defaultProps = {
  pageProps: {},
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.elementType,
};
