import React, { memo } from "react";
import { useRouter } from "next/router";

import { getHeadingFromPathname } from "./utility/index";

function AccountHeadings() {
  const router = useRouter();
  const { pathname } = router;
  const heading = getHeadingFromPathname(pathname);

  return <div>{heading}</div>;
}

export const AccountHeading = memo(AccountHeadings);
