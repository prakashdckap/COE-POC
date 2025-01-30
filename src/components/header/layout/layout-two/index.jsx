import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import HeaderFallBackUi, { HeaderCategorySckeleton } from "../../../FallBackUI/headerLayout";

const Header = dynamic(() => import("./layout-two-header"), {
  ssr: false,
  loading: () => <HeaderFallBackUi />,
});

const MainMemu = dynamic(() => import("./layout-two-navbar"), {
  ssr: false,
  loading: () => <HeaderCategorySckeleton />,
});

function HeaderLayoutTwo() {
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollPos(window.pageYOffset);
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const headerClasses = `${
    scrollPos > 230 ? "sticky header-animation shadow-md" : ""
  } top-0 bg-white z-20`;

  return (
    <div className={headerClasses}>
      <Header scrollPos={scrollPos} />
      <div className="relative -z[1px]">
        <MainMemu scrollPos={scrollPos} />
      </div>
    </div>
  );
}

export default HeaderLayoutTwo;
