import { useDispatch, useSelector } from "react-redux";
import Heading from "../../theme-files/heading";
import CartList from "./cartcomponents/cart-list";
import Link from "next/link";
import { CartSummary } from "./cartcomponents/cart-summary";
import useClearShoppingCart from "../../helper/hooks/cart/use-clear-shopping-cart";
import LoadingSpinner from "../../helper/loading-spinner";
import { useState } from "react";
import DeleteItemModal from "../cart/delete-item-modal";
import { CheckIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import {
  SET_NOTIFICATION,
  SET_SUCCESS,
  UPDATE_CART_ITEMS,
  SET_ERROR,
  SET_CART_SUCCESS,
} from "../../redux/actions";
import Summary from "../cart/summary";
import constants from "../../helper/constant";
import useUpdateCartItem from "../../helper/hooks/cart/use-update-cart-item";
import CartItem from "../cart/cart-item";
import Paragraph from "../../theme-files/paragraph";
import { AxiosGraphQL } from "../../helper/axios";

export default function CartModules() {
  const { cartItems, cartDetails, customerCartId, setSuccess, setError, setCartSuccess } =
    useSelector((state) => state);

  const dispatch = useDispatch();

  const [show, setshow] = useState(false);
  const { clearAllItemsFromCart, clearShoppingCartLoading } = useClearShoppingCart();
  const layout = constants.themeObj[constants.selectedTheme].cartPage;
  const [belowPromoBanner, setBelowPromoBanner] = useState(null);
  const [abovePromoBanner, setAbovePromoBanner] = useState(null);
  const { updateCartItem, updateProductInCartLoading } = useUpdateCartItem();
  const [updatedQty, setUpdatedQty] = useState({});
  const [hostName, setHostName] = useState("");

  useEffect(() => {
    dispatch(SET_SUCCESS(""));
    dispatch(SET_ERROR([]));
    dispatch(SET_CART_SUCCESS(""));
    return () => {
      dispatch(SET_SUCCESS(""));
      dispatch(SET_ERROR([]));
      dispatch(SET_CART_SUCCESS(""));
    };
  }, []);

  // quantity enter key to update
  const handleUpdateItem = (productId, qty, maxQty) => {
    let obj = { ...updatedQty };
    obj[productId] = { qty, maxQty };
    setUpdatedQty(obj);
  };

  // quantity update api
  const handleUpdateCart = (productId, qty) => {
    updateCartItem([
      {
        productUid: productId,
        quantity: parseInt(qty, 10),
      },
    ]);
  };

  const handletyQUpdateCart = () => {
    let isQuantityAvailable = true;
    const newQtyUpdate = Object.entries(updatedQty).map(([productUid, quantity]) => {
      if (quantity?.qty && quantity?.qty <= quantity?.maxQty) {
        return { productUid, quantity: quantity?.qty };
      }
      isQuantityAvailable = false;
    });
    if (isQuantityAvailable) {
      if (newQtyUpdate?.some((e) => e > 40) && newQtyUpdate?.length) {
        dispatch(
          SET_NOTIFICATION({
            status: true,
            message: "The requested qty exceeds the maximum qty allowed in shopping cart",
            type: "warning",
          })
        );
      } else if (!newQtyUpdate?.some((e) => !e) && newQtyUpdate?.length) {
        updateCartItem(newQtyUpdate);
      }
    } else {
      dispatch(
        SET_NOTIFICATION({
          status: true,
          message: "The requested qty is not available",
          type: "warning",
        })
      );
    }
  };

  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  // UseEffect to get the hostName
  useEffect(() => {
    setHostName(`${window.location.protocol}//${window.location.host}/`);
  }, []);

  //amasty promo banners
  useEffect(() => {
    AxiosGraphQL("amasty-promo-banners").then((response) => {
      if (response) {
        const banners = response?.getAmastyBanners;

        // Filter banners based on the initial conditions
        const filteredBanners = banners?.filter((banner) => {
          return (
            banner?.banner_type === "image" &&
            banner?.is_active &&
            (banner?.to_date?.split(" ")[0] >= formattedDate || banner?.to_date === null)
          );
        });

        //  Find the minimum sort_order value from the filtered banners
        const minSortOrder = Math.min(...filteredBanners.map((banner) => banner?.sort_order));
        let aboveCartPromoBanner = [];
        let belowCartPromoBanner = [];
        filteredBanners?.forEach((banner) => {
          if (banner?.sort_order === minSortOrder && banner?.banner_img) {
            if (banner?.banner_position?.split(",").includes("8")) {
              belowCartPromoBanner.push(banner);
            }
            if (banner?.banner_position?.split(",").includes("0")) {
              aboveCartPromoBanner.push(banner);
            }
          }
        });

        // Sort function based on sort_order field
        belowCartPromoBanner?.sort((a, b) => b.sort_order - a.sort_order);
        setAbovePromoBanner(belowCartPromoBanner);

        // Sort function based on sort_order field
        aboveCartPromoBanner?.sort((a, b) => b.sort_order - a.sort_order);
        setBelowPromoBanner(aboveCartPromoBanner);
      }
    });
  }, []);

  // Function to update the banner link
  const getUpdatedBannerLink = (bannerLink) => {
    if (!bannerLink) return "";

    const currentProtocolAndHost = hostName;
    return bannerLink
      .replace(/^https:\/\/staging\.elementvape\.com/, currentProtocolAndHost)
      .replace(/^https:\/\/www\.elementvape\.com/, currentProtocolAndHost);
  };

  return (
    <div className="bg-white cart-page min-h-[60vh] container mx-auto pb-[96px]" id="main_content">
      <div className="pt-[20px]">
        <Heading className="text-2xl font-normal text-skin-base text-center mb-[30px]" id="message">
          Shopping Cart
        </Heading>
        {setSuccess ? (
          <div className="flex relative  pl-[40px] pr-[20px] py-[10px] mb-[10px] bg-[#e5efe5] text-[#006400] text-[13px] font-normal font-sans w-full leading-[1.35]">
            <CheckIcon className="w-5 h-5 absolute left-2.5" />
            <span>{setSuccess} has been moved to your wish list.</span>
          </div>
        ) : (
          ""
        )}
        {setCartSuccess?.message ? (
          <div className="flex relative   pl-[40px] pr-[20px] py-[10px] mb-[10px] bg-[#e5efe5] text-[#006400] text-[13px] font-normal font-sans w-full leading-[1.35]">
            <CheckIcon className="w-5 h-5 absolute left-2.5" />
            <span>
              <span>{setCartSuccess?.message}.</span>
            </span>
          </div>
        ) : (
          <></>
        )}
        {setError?.length
          ? setError?.map(({ message }) => {
              return (
                <div className="flex relative   pl-[40px] pr-[20px] py-[10px] mb-[10px] bg-[#fae5e5] text-[#e02b27] text-[13px] font-normal font-sans w-full leading-[1.35]">
                  <i class="fa-solid fa-triangle-exclamation text-[18px] text-[#b30000] absolute left-2.5"></i>
                  <span>{message}</span>
                </div>
              );
            })
          : ""}
        {cartDetails?.appliedRewardPoints?.earnPoints ? (
          <div className="flex relative  pl-[40px] pr-[20px] py-[10px] mb-[30px] bg-[#e5efe5] text-[#006400] text-[13px] font-normal font-sans w-full leading-[1.35]">
            <CheckIcon className="w-5 h-5 absolute left-2.5" />
            <span>
              Checkout now and earn{" "}
              <span className="font-bold">
                {cartDetails?.appliedRewardPoints?.earnPoints} Reward Points
              </span>{" "}
              for this order.
              {!customerCartId ? (
                <p className="mb-[16px]">
                  {" "}
                  Applies only to registered customers, may vary when logged in.
                </p>
              ) : (
                ""
              )}
            </span>
          </div>
        ) : (
          ""
        )}

        {abovePromoBanner?.length ? (
          abovePromoBanner?.map((banner) => (
            <div className="md:mx-[20px]">
              {banner?.banner_link ? (
                <a href={getUpdatedBannerLink(banner?.banner_link)}>
                  <img src={banner?.banner_img} className="w-[100%]" alt="banner" />
                </a>
              ) : (
                <>
                  <img src={banner?.banner_img} className="w-[100%]" alt="banner" />
                </>
              )}
            </div>
          ))
        ) : (
          <></>
        )}
        <div className="border border-[#ebebeb]">
          <div className="lg:flex justify-between block">
            <form
              className="p-[20px] lg:w-[calc(100%_-_372px)] w-[100%] "
              action="https://www.elementvape.com/checkout/cart/updatePost/"
              method="post"
              id="form-validate"
            >
              {cartItems?.length ? (
                <>
                  <table className="border-collapse w-[100%] cart-table">
                    <thead className="border-b-[1px] border-b-[#ebebeb]">
                      <tr className="">
                        <th className="pt-[20px] pb-[8px] px-[10px] text-left  col item">
                          <span className="text-[14px] leading-[1.35] font-sans text-[#282828] font-medium uppercase">
                            Item
                          </span>
                        </th>
                        <th className="leading-[1.35] pt-[20px] px-[10px] pb-[8px] text-left col price ">
                          <span className="md:text-[14px] text-[12px] leading-[1.35] font-sans text-[#282828] font-medium uppercase">
                            price
                          </span>
                        </th>
                        <th className="leading-[1.35] pt-[20px] px-[10px] pb-[8px] text-center col qty">
                          <span className="md:text-[14px] text-[12px] leading-[1.35] font-sans text-[#282828] font-medium uppercase">
                            Qty
                          </span>
                        </th>
                        <th className="leading-[1.35] pt-[20px] px-[10px] pb-[8px] text-right col subtotal">
                          <span className="md:text-[14px] text-[12px] leading-[1.35] font-sans text-[#282828] font-medium uppercase">
                            Subtotal
                          </span>
                        </th>
                      </tr>
                    </thead>
                    {cartItems?.length ? (
                      cartItems?.map(
                        (cartItem, i) =>
                          cartItem?.product && (
                            <CartList
                              key={`${cartItem?.product?.id}_${i}`}
                              cartItem={cartItem}
                              product={cartItem?.product}
                              handleUpdateItem={handleUpdateItem}
                              handleUpdateCart={handleUpdateCart}
                              updateProductInCartLoading={updateProductInCartLoading}
                            />
                          )
                      )
                    ) : (
                      <Paragraph className="text-center font-medium text-lg my-5 text-gray-500">
                        No Items Found
                      </Paragraph>
                    )}
                  </table>
                  <div className="flex justify-between flex-wrap md:flex-nowrap mt-[20px] md:mt-0">
                    <Link href="/">
                      <button
                        type="button"
                        disabled={!cartItems?.length}
                        className="w-full whitespace-no-wrap md:w-auto md:my-5 bg-skin-inverted border-transparent border border-gray-500 shadow-sm py-2 px-4 text-sm font-medium text-skin-base hover:text-skin-inverted hover:bg-skin-primary  disabled:cursor-not-allowed disabled:opacity-50 uppercase"
                      >
                        Continue Shopping
                      </button>
                    </Link>

                    <div className="w-full md:w-auto md:flex">
                      <button
                        onClick={() => setshow(true)}
                        type="button"
                        disabled={!cartItems?.length || clearShoppingCartLoading}
                        className="w-full whitespace-no-wrap flex md:w-auto my-5 md:mr-5 md:ml-5 bg-skin-inverted text-center justify-center border-transparent border border-gray-500 shadow-sm py-2 px-4 text-sm font-medium text-skin-base hover:text-skin-inverted hover:bg-skin-primary disabled:cursor-not-allowed disabled:opacity-50 uppercase disabled:pointer-events-none"
                      >
                        {clearShoppingCartLoading ? (
                          <LoadingSpinner message="clearing" />
                        ) : (
                          "Clear Shopping Cart"
                        )}
                      </button>
                      <button
                        type="button"
                        disabled={!cartItems?.length}
                        className="cart-updae-btn w-full whitespace-no-wrap flex md:w-auto my-5 md:my-5 bg-skin-inverted text-center justify-center border-transparent border border-gray-500 shadow-sm py-2 px-4 text-sm font-medium text-skin-base hover:text-skin-inverted hover:bg-skin-primary disabled:cursor-not-allowed disabled:opacity-50 uppercase disabled:pointer-events-none"
                        onClick={handletyQUpdateCart}
                      >
                        <i
                          className="fa fa-refresh pl-1 pt-[2px] transform scale-x-[-1]"
                          aria-hidden="true"
                        ></i>
                        Update Shopping Cart
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <p className="text-[13px] my-[16px] text-[#282828] font-sans leading-[1.35]">
                    You have no items in your shopping cart.
                  </p>
                  <p className="text-[13px] text-[#282828] font-sans leading-[1.35]">
                    Click{" "}
                    <span className="text-[#a80f16] mx-1 hover:underline leading-[1.35]">
                      <Link href="/">here</Link>{" "}
                    </span>
                    to continue shopping.
                  </p>
                </div>
              )}
            </form>

            <div
              className={cartItems?.length ? "lg:w-[372px] w-[100%] bg-[#f9f9f9]  p-[20px]" : ""}
            >
              <Summary promoBanner={belowPromoBanner} cartPage />
            </div>
          </div>
        </div>
        <DeleteItemModal show={show} setshow={setshow} />
      </div>
    </div>
  );
}
