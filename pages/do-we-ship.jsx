import Doweship from "../src/components/cms/do-we-ship/index";
import constants from "../src/helper/constant";
import SEOHead from "../src/helper/SEOHeader";

export default function DoWeShip() {
  return (
    <>
      <SEOHead
        title="Do We Ship to You?"
        description="Do We Ship to You "
        canonicalUrl={`${constants.replaceUrl}/do-we-ship`}
      />
      <Doweship />
    </>
  );
}
