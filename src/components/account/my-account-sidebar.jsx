import { useRouter } from "next/router";
import Link from "../../theme-files/link";
import SideNavigationConstant from "./constant";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AccountSideBar() {
  const { pathname } = useRouter();
  return (
    <aside className="py-6 lg:col-span-3 lg:pr-12 md:col-span-4 md:pr-12">
      <nav className="space-y-1">
        {SideNavigationConstant.SideNavigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={classNames(
              item.href === pathname
                ? "text-skin-primary font-semibold border-slate-100 border-b-2"
                : "border-slate-100 border-b-2 ] text-[#282828] transition-all ease-in-out duration-350 hover:duration-700 hover:text-skin-primary hover:pl-4 font-medium hover:font-semibold",
              "group py-3 flex items-center border-dashed border-[#ebebeb text-sm "
            )}
            aria-current={item.href === pathname ? "page" : undefined}
          >
            <span className="truncate md:text-[13px]">{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
