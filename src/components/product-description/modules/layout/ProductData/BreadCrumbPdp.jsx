import Link from "next/link";
import { ChevronRight } from "heroicons-react";
import OrderedList from "../../../../../theme-files/ordered-list";
import ListItem from "../../../../../theme-files/list-item";

export default function BreadCrumbPdp({ product }) {
  return (
    <nav aria-label="Breadcrumb" className="px-4 md:px-0">
      <OrderedList role="list" className="flex md:items-center">
        <ListItem className="text-xs">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-[13px] font-normal text-[#000] hover:underline z-10">Home</a>
            </Link>
            <ChevronRight className="h-4 text-gray-500 z-10" />
          </div>
        </ListItem>
        <ListItem className="text-xs relative z-10">
          <a
            href={product?.href || "#"}
            aria-current="page"
            className="font-bold text-skin-base text-[13px]"
          >
            {product?.name || ""}
          </a>
        </ListItem>
      </OrderedList>
    </nav>
  );
}
