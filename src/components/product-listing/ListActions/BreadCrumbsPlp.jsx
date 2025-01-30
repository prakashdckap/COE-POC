import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ChevronRight } from "heroicons-react";
import { CheckIcon } from "@heroicons/react/solid";
import ListItem from "../../../theme-files/list-item";
import OrderedList from "../../../theme-files/ordered-list";

export default function BreadCrumbsPlp({ category }) {
  const history = useRouter();

  return (
    <nav aria-label="Breadcrumb" className="pb-[20px]">
      <OrderedList role="list" className="flex items-center w-full flex-wrap">
        <ListItem>
          <div className="flex items-center">
            <Link href="/">
              <a className="text-[13px] font-medium text-[#282828] hover:underline">Home</a>
            </Link>
            <ChevronRight className="h-4 font-medium text-[#282828] " />
          </div>
        </ListItem>
        {category?.breadcrumbs?.length ? (
          category?.breadcrumbs?.map((bread) => (
            <ListItem className="text-[13px] flex items-center" key={bread.name}>
              <Link href={`/${bread.urlKey}`}>
                <a className="text-[13px] font-medium text-[#282828] hover:underline capitalize">
                  {bread?.name}
                </a>
              </Link>
              <ChevronRight className="h-4 font-medium text-[#282828] " />
            </ListItem>
          ))
        ) : history.query.q ? (
          <div className="flex items-center text-[13px] font-bold text-[#282828] capitalize">
            Search results for: {history.query.q}
          </div>
        ) : null}
        <ListItem>
          <div className="flex items-center text-[13px] font-bold text-[#282828] capitalize">
            {category?.name}
          </div>
        </ListItem>
      </OrderedList>
    </nav>
  );
}

export function PlpHeaderNotification({}) {
  const { setCartSuccess } = useSelector((state) => state);
  if (setCartSuccess?.name) {
    return (
      <div className="flex relative   pl-[40px] pr-[20px] py-[10px] mb-[10px] bg-[#e5efe5] text-[#006400] text-[13px] font-normal font-sans w-full leading-[1.35]">
        <CheckIcon className="w-5 h-5 absolute left-2.5" />
        <span aria-live="polite" role="alert">
          <span>
            You added {setCartSuccess?.name} to your{" "}
            <Link
              className="border-b-[1px] border-b-[#006400] text-[#006400] shopping-cart-color"
              href={"/shoppingcart"}
            >
              <span className="text-[#006400] shopping-cart-color cursor-pointer hover:text-[#282828]">
                shopping cart
              </span>
            </Link>
            .
          </span>
        </span>
      </div>
    );
  }
}
