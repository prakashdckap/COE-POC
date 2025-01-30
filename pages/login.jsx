import Login from "../src/components/login";
import constants from "../src/helper/constant";
import SEOHead from "../src/helper/SEOHeader";

export default function Home() {
  return (
    <>
      <SEOHead
        title="SIGN IN OR CREATE ACCOUNT"
        description="SIGN IN OR CREATE ACCOUNT"
        canonicalUrl={`${constants.replaceUrl}/login`}
      />
      <Login />
    </>
  );
}
