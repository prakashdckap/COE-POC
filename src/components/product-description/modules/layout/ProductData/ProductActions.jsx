import { HeartIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import useAddProduct from "../../../../../helper/hooks/cart/use-add-product";
import useUpdateCartItem from "../../../../../helper/hooks/cart/use-update-cart-item";
import useAddItemToWishlist from "../../../../../helper/hooks/customer/use-add-item-to-wishlist";
import useUpdateWishlistItem from "../../../../../helper/hooks/customer/use-update-wishlist-item";
import LoadingSpinner from "../../../../../helper/loading-spinner";
import useBannerUpdateLink from "../../../../../helper/notifications/useBannerUpdateLink";
import QtyInput from "../../../../../theme-files/qty-input";
import {
  Gtag_AddToCartEvent,
  Gtag_AddToWishlistEvent,
} from "../../../../../utils/google-tags/events";
import GuestLoginPopup from "../../../../guest-login-popup/guestLoginPopup";
import SocialIcons from "../../../social-icons";

export default function ProductActions({
  qty,
  setqty,
  isInstock,
  promoBanner,
  isError,
  dropdownSelectedData,
  product,
  setclicked,
}) {
  const history = useRouter();
  const { customerToken } = useSelector((state) => state);
  const [showguestpopup, setshowguestpopup] = useState(false);

  const { addToCart, addProductToCartLoading, cartLoading } = useAddProduct();
  const { handleAddProductToWishlist, addProductToWishlistLoading } = useAddItemToWishlist();
  const { updateCartItem, updateProductInCartLoading } = useUpdateCartItem();
  const { handleUpdateWishlistProduct } = useUpdateWishlistItem();
  const { getUpdatedBannerLink } = useBannerUpdateLink();

  const { id, name, sku } = product;
  const { productType, options, bundleProductOptions, productOptions } = product;

  const flattenDeep = (arr) => arr.flat(Infinity);

  const optionsSaleQty = Object.keys(dropdownSelectedData || {}).map((optionKey) => {
    const optionsArray = options.map((option) => {
      return option.attributeOptions.map((attributeOption) => {
        return attributeOption.optionName === dropdownSelectedData[optionKey].optionName
          ? {
              name: dropdownSelectedData[optionKey].optionName,
              SaleQty: dropdownSelectedData[optionKey].saleQty,
            }
          : false;
      });
    });

    return optionsArray;
  });

  const optionsSaleableQuantity = flattenDeep(optionsSaleQty).filter((value) => value !== false);

  const addOnSaleQty = Object.keys(dropdownSelectedData || {}).map((optionKey) => {
    const productOptionsArray = productOptions?.map((productOption) => {
      return productOption.attributeOptions.map((attributeOption) => {
        return attributeOption.optionName === dropdownSelectedData[optionKey].optionName
          ? {
              name: dropdownSelectedData[optionKey].optionName,
              SaleQty: dropdownSelectedData[optionKey].saleQty,
            }
          : false;
      });
    });

    return productOptionsArray;
  });

  const addOnSaleableQuantity = flattenDeep(addOnSaleQty).filter((value) => value !== false);

  const messages = [];

  optionsSaleableQuantity.forEach((item) => {
    if (qty > item.SaleQty) {
      messages.push(`The requested Qty is not available for ${item.name}`);
    }
  });

  addOnSaleableQuantity.forEach((item) => {
    if (qty > item?.SaleQty) {
      messages.push(`The requested Qty is not available for ${item.name}`);
    }
  });

  const generateCustomOptions = (ddData) => {
    const data = Object?.keys(ddData)?.map((option) => {
      if (ddData[option]?.optionCode) {
        return {
          code: option,
          value: ddData[option]?.optionCode,
        };
      } else if (ddData[option]?.id) {
        return {
          code: option,
          value: `${ddData[option]?.uid}`,
        };
      }
    });
    return data.filter((element) => element && element);
  };

  // Function to add product to cart
  const handleAddToCart = () => {
    setclicked(true);
    if (!isError) {
      let optionType = productType === "bundle" ? "bundleOptions" : "customOptions";
      let customOption = {};
      customOption[optionType] = generateCustomOptions(dropdownSelectedData);
      addToCart([
        {
          productSku: sku,
          productId: id,
          productType,
          quantity: qty,
          ...customOption,
        },
      ]);
      Gtag_AddToCartEvent(product);
    }
  };

  const handleUpdateCart = () => {
    setclicked(true);
    if (!isError) {
      //selected dropdown
      const selectedOptions = [];
      const customizableOptions = [];

      Object?.keys(dropdownSelectedData)?.map((option) => {
        if (dropdownSelectedData[option]?.skip) {
          customizableOptions.push({
            code: option,
            value: dropdownSelectedData[option]?.optionCode,
          });
          return null;
        }

        if (productType === "bundle") {
          selectedOptions.push({
            code: option,
            value: dropdownSelectedData[option]?.uid,
          });
          return null;
        }

        selectedOptions.push({
          code: option,
          value: dropdownSelectedData[option]?.optionCode,
        });

        return null;
      });

      //update cart gql
      updateCartItem(
        [
          {
            productUid: history?.query?.productUid,
            quantity: qty,
            selectedOptions,
            customizableOptions,
          },
        ],
        name
      );
    }
  };

  const handleUpdateWishList = () => {
    const changeItemsId = [history?.query?.id];
    handleUpdateWishlistProduct(
      {
        productId: history?.query?.id,
        quantity: qty,
        customOptions: generateCustomOptions(dropdownSelectedData),
      },
      changeItemsId
    );
  };

  const handleAddToWishlist = () => {
    if (customerToken) {
      let customOptions = Object?.keys(dropdownSelectedData)?.map((option) => ({
        code: option,
        value: dropdownSelectedData[option]?.optionCode,
      }));
      if (bundleProductOptions?.bundleItems?.length) {
        // for bundle products
        customOptions = Object?.keys(dropdownSelectedData)?.map((option) => {
          if (dropdownSelectedData[option]?.optionCode) {
            return {
              code: option,
              value: dropdownSelectedData[option]?.optionCode,
            };
          }
          return {
            value: dropdownSelectedData[option]?.uid,
          };
        });
      }
      handleAddProductToWishlist(
        [
          {
            productSku: sku,
            quantity: qty,
            customOptions: customOptions,
          },
        ],
        name
      );
      Gtag_AddToWishlistEvent(product);
    } else {
      setshowguestpopup(true);
    }
  };

  return (
    <div className="mt-8 md:col-span-5">
      {isInstock ? (
        <>
          <QtyInput qty={qty} setqty={setqty} />
          {qty > 40 ? (
            <small className="text-red-600 text-center flex justify-center mt-2">
              The maximum you may purchase is 40
            </small>
          ) : messages.length > 0 ? (
            messages?.map((message, index) => (
              <div key={index}>
                <small className="text-red-600 text-center flex justify-center mt-2">
                  {message}
                </small>
              </div>
            ))
          ) : null}

          <button
            type="submit"
            disabled={qty > 40 || messages.length > 0}
            className="text-xs h-[40px] mt-8 w-full bg-skin-secondary hover:bg-skin-button-accent-hover border font-semibold border-transparent py-3 px-8 flex items-center justify-center text-white  uppercase disabled:cursor-not-allowed disabled:pointer-events-none"
            onClick={() => (!history?.query?.isEditCart ? handleAddToCart() : handleUpdateCart())}
          >
            {cartLoading || addProductToCartLoading || updateProductInCartLoading ? (
              <LoadingSpinner message={!history?.query?.isEditCart ? "adding" : "updating"} />
            ) : !history?.query?.isEditCart ? (
              "Add to cart"
            ) : (
              "Update cart"
            )}
          </button>
        </>
      ) : (
        ""
      )}
      {promoBanner?.length ? (
        <div className="mt-[25px]">
          {promoBanner?.map((banner) => (
            <div className="">
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
          ))}
        </div>
      ) : (
        <></>
      )}
      <div
        className={`${
          addProductToWishlistLoading ? "opacity-40 pointer-events-none cursor-not-allowed" : null
        } w-full ${promoBanner?.length ? "border-0" : "border-t border-[#ebebeb]  my-7"}  py-7 `}
      >
        <button
          type="button"
          className="mx-auto flex justify-center items-center"
          onClick={() => {
            if (history?.query?.isWishlist) {
              handleUpdateWishList();
            } else {
              handleAddToWishlist();
            }
          }}
        >
          <HeartIcon className="h-4 w-4 bg-gray-50 text-gray-600 hidden md:block" />
          <span className="ml-2 hidden md:block font-medium hover:underline text-[12px] text-gray-500 uppercase md:text-[14px]">
            {!history?.query?.isWishlist ? "ADD TO WISH LIST" : "UPDATE WISHLIST"}
          </span>
          <span className="ml-2 block md:hidden font-bold underline text-[12px] text-gray-500 uppercase md:text-[14px]">
            {!history?.query?.isWishlist ? "ADD TO WISH LIST" : "UPDATE WISHLIST"}
          </span>
        </button>
        <SocialIcons />
      </div>

      {showguestpopup && (
        <GuestLoginPopup showguestpopup={showguestpopup} setshowguestpopup={setshowguestpopup} />
      )}
    </div>
  );
}
