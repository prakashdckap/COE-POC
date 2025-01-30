import Link from "next/link";

import { navigation } from "../../helper";
import FooterNavDesktop from "./elements/footer-nav-desktop";
import FooterNavMobile from "./elements/footer-nav-mobile";

function FooterLinks() {
  return (
    <footer className="bg-white px-0 md:px-[10px]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container mx-auto pt-[10px] md:pt-[36px] pb-[10px] px-0">
        <FooterNavDesktop navigation={navigation} />

        <FooterNavMobile navigation={navigation} />

        <div className="mt-[38.5px] text-skin-footer text-xs md:px-[5px] pb-0 md:pb-[12px]">
          Not for Sale for Minors - Products sold on this site may contain nicotine which is a
          highly addictive substance. California Proposition 65 - WARNING: This product can expose
          you to chemicals including nicotine, which is known to the State of California to cause
          birth defects or other reproductive harm. For more information, go to{" "}
          <Link href="https://www.p65warnings.ca.gov/">
            <a target="_blank" className="text-skin-secondary font-medium hover:underline">
              Proposition 65 Warnings Website.
            </a>
          </Link>{" "}
          Products sold on this site is intended for adult smokers. You must be of legal smoking age
          in your territory to purchase products. Please consult your physician before use. E-Juice
          on our site may contain Propylene Glycol and/or Vegetable Glycerin, Nicotine and
          Flavorings. Our products may be poisonous if orally ingested. FDA DISCLAIMER: The
          statements made regarding these products have not been evaluated by the Food and Drug
          Administration. The efficacy of these products has not been confirmed by FDA-approved
          research. These products are not intended to diagnose, treat, cure or prevent any disease.
          All information presented here is not meant as a substitute for or alternative to
          information from health care practitioners. For their protection, please keep out of reach
          of children and pets. Read our terms and conditions page before purchasing our products.
          Use All Products On This Site At Your Own Risk!
        </div>
      </div>
    </footer>
  );
}

export default FooterLinks;
