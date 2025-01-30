import React, { memo } from "react";
import { useRouter } from "next/router";
import SEOHead from "../../helper/SEOHeader";
import { getTitleFromPathname } from "./utility";
import constants from "../../helper/constant";

function AccountHeadTags() {
  const router = useRouter();
  const { pathname } = router;
  const title = getTitleFromPathname(pathname);

  return (
    <SEOHead
      title={title}
      description={title}
      canonicalUrl={`${constants.replaceUrl}/${router?.query?.slug?.[0]}`}
    />
  );
}

export const AccountHeadTag = memo(AccountHeadTags);
