import { useRouter } from "next/router";

import RewardsHeaderMenuConstant from "../constant";
import Link from "../../../theme-files/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RewardsMenu() {
  const { pathname } = useRouter();

  return (
    <>
      <div className="col pb-0 md:pb-5 mb-[10px] border-b-2 flex flex-wrap gap-y-[4px] h-[78px] md:h-auto">
        {RewardsHeaderMenuConstant?.Rewards?.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={classNames(
              item.href === pathname
                ? "ml-1 mr-1 border-skin-secondary shadow-sm text-skin-inverted bg-skin-secondary font-bold"
                : "ml-1 mr-1 border-black shadow-sm text-skin-inverted bg-black font-medium",
              "items-center px-[15px] py-[10px] text-[13px] border capitalize"
            )}
            aria-current={item.href === pathname ? "page" : undefined}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </>
  );
}
