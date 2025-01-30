import { useSelector } from "react-redux";
import { CheckIcon } from "@heroicons/react/solid";
import Link from "next/link";

export default function ProductNotification() {
  const { setCartSuccess, setWishlistWarning } = useSelector((state) => state);
  if (setCartSuccess?.name) {
    return (
      <div className="flex relative   pl-[40px] pr-[20px] py-[10px] mb-[10px] bg-[#e5efe5] text-[#006400] text-[13px] font-normal font-sans w-full leading-[1.35]">
        <CheckIcon className="w-5 h-5 absolute left-2.5" />
        <span>
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
  if (setWishlistWarning) {
    return (
      <div className="flex relative mt-2 pl-[40px] pr-[20px] py-[10px] mb-[10px] bg-[#fdf0d5] text-[#6f4400] text-[13px] font-normal font-sans w-full leading-[1.35]">
        <i className="fa-solid fa-triangle-exclamation text-[18px] text-[#6f4400] absolute left-2.5"></i>
        <span>{setWishlistWarning}</span>
      </div>
    );
  }
}
