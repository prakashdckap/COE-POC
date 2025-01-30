import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import useOnClickOutside from "../../helper/hooks/use-detect-outside-click";
import { SHOW_CART, GET_COUNTRIES_LIST } from "../../redux/actions";
import COUNTRIES_LIST from "../../helper/graphql/query/countries-list";
import constants from "../../helper/constant";
import Notification from "../../helper/notifications/notification";
import ImageTag from "../../theme-files/image";
import LoadingSpinner from "../../helper/loading-spinner";

const Minicart2 = dynamic(() => import("./minicart-2"), {
  ssr: false,
});
const Minicart1 = dynamic(() => import("./minicart-1"), {
  ssr: false,
});

export default function Minicart() {
  const dispatch = useDispatch();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const { ref, showMenu, setShowMenu } = useOnClickOutside(false, "dislayCart");
  const displayCart = useSelector((state) => state.displayCart);
  const cartItems = useSelector((state) => state?.cartItems);
  const customerCartId = useSelector((state) => state.customerCartId);
  const notification = useSelector((state) => state.notification);
  const countries = useSelector((state) => state.countries);
  const [notify, setNotify] = useState({});
  const layout = constants.themeObj[constants.selectedTheme].minicart;

  // Function to display/hide minicart
  const toggleCart = () => {
    dispatch(SHOW_CART(!displayCart));
    setShowMenu(!showMenu);
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNotify(notification);
  }, [notification]);

  useEffect(() => {
    // Calculating the total quantity
    setTotalQuantity(
      cartItems?.length ? cartItems?.reduce((total, item) => total + item.quantity, 0) : 0
    );
  }, [cartItems]);

  // Query to fetch all countries
  const { data: countryList } = useQuery(COUNTRIES_LIST, { skip: !!countries?.length });

  // Storing all the countries in redux
  useEffect(() => {
    if (countryList?.countries) {
      try {
        let countries = [...countryList?.countries];
        let country = countries?.sort((a, b) => {
          let textA = a.name.toUpperCase();
          let textB = b.name.toUpperCase();
          return textA.localeCompare(textB);
        });
        dispatch(GET_COUNTRIES_LIST(country));
      } catch (error) {
        console.error("countryList", error, countryList);
        dispatch(GET_COUNTRIES_LIST(countryList?.countries));
      }
    }
  }, [countryList]);

  useEffect(() => {
    if (!cartItems?.length) {
      setLoading(true);
    } else setLoading(false);
  }, [cartItems]);

  return (
    <div className="flow-root text-sm lg:relative" ref={ref}>
      <button
        type="button"
        className="group flex items-center"
        aria-expanded="false"
        onClick={() => toggleCart()}
      >
        <div className="relative">
          <div
            // role="button"
            // disabled={customerCartId && !cartItems?.length > 0}
            className="relative flex items-center justify-end min-w-[32px]"
            aria-label="Mini Cart"
          >
            <ImageTag src="/icons/shopping-cart.svg" alt="mini-cart" height={20} width={20} />
          </div>

          {/* {customerCartId && loading ? (
            <LoadingSpinner className="absolute -top-2 left-5 text-skin-secondary z-50" />
          ) : (
            ""
          )} */}

          {totalQuantity > 0 ? (
            <span className="absolute -top-[10px] -right-[10px] text-[13px] font-medium text-skin-inverted bg-skin-secondary h-[16px] min-w-[16px] leading-[16px] rounded-full">
              <span className="p-1"> {totalQuantity} </span>
            </span>
          ) : (
            ""
            // <LoadingSpinner className="absolute -top-2 left-5 text-skin-secondary z-50" />
          )}
        </div>
      </button>

      {layout === "dropdown" ? (
        <Minicart1 toggleCart={toggleCart} totalQuantity={totalQuantity} />
      ) : (
        <Minicart2 toggleCart={toggleCart} />
      )}

      {notify && notify?.status ? <Notification /> : null}
    </div>
  );
}
