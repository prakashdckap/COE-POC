import { useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { PencilIcon, XIcon } from "@heroicons/react/solid";
import _debounce from "lodash/debounce";

import ImageTag from "../../theme-files/image";
import LoadingSpinner from "../../helper/loading-spinner";
import useAddWishlistItemToCart from "../../helper/hooks/customer/use-add-wishlist-item-to-cart";
import useUpdateWishlistItem from "../../helper/hooks/customer/use-update-wishlist-item";
import SubHeading from "../../theme-files/sub-heading";
import { removeCache } from "../../helper/removeCache";
import Review from "../review";
import { useMemo } from "react";

export default function MyWishlistProduct({
  product,
  productId,
  qtyObj,
  setqtyObj,
  customOptions,
  handleRemoveProductFromWishlist,
  removeProductFromWishlistLoading,
  customerWishlistResponse,
  handleUpdateWishlist,
  qtyStockError,
  setQtyStockError,
  customerWishlistRefetch,
}) {
  const history = useRouter();
  const myRef = useRef();

  const [seeDetails, setseeDetails] = useState(false);
  const { handleAddWishlistItemToCart, addWishlistItemToCartLoading } = useAddWishlistItemToCart();
  const { handleUpdateWishlistProduct, updateProductInWishlistLoading } = useUpdateWishlistItem();

  const {
    product: {
      name,
      image: { url },
      stockStatus,
      priceRange: {
        minPrice: { finalPrice, regularPrice },
      },
      customUrl,
      id,
    },
  } = product;

  const addOnPrice = useMemo(() => {
    const allOptions = [...product?.product?.productOptions, ...product?.product?.options]
      .map((a) => a.attributeOptions)
      .flat(Infinity);
    if (!allOptions) return 0;
    let price = 0;
    customOptions.map((option) => {
      const selected = allOptions?.find((opt) => opt?.optionCode === option?.value);
      if (selected) {
        price += selected?.optionPrice?.value;
      }
    });
    return price;
  }, [customOptions, product?.product?.options, product?.product?.productOptions]);

  const handleDebounceUpdate = useCallback(
    _debounce((productId, quantity) => {
      if (quantity && quantity < 40)
        handleUpdateWishlistProduct(
          {
            productId,
            quantity,
          },
          [productId]
        );
    }, 2000),
    []
  );

  const handleInputChange = (e, field) => {
    const updatedProduct = qtyObj?.find((item) => item?.productId === productId);
    const filteredArr = qtyObj?.filter((item) => item?.productId !== updatedProduct?.productId);
    if (field === "quantity") {
      const quantity = parseInt(e.target.value, 10);
      filteredArr.push({
        productId,
        product,
        quantity,
        customOptions,
        comments: updatedProduct?.comments,
      });
      setqtyObj(filteredArr);
      handleDebounceUpdate(productId, quantity);
      if (quantity > 40) {
        setQtyStockError((prevItems) => [...prevItems, productId]);
      } else if (qtyStockError.includes(productId)) {
        setQtyStockError(qtyStockError.filter((error) => error !== productId));
      }
    } else {
      filteredArr.push({
        productId,
        product,
        quantity: updatedProduct?.quantity,
        customOptions,
        comments: e.target.value,
      });

      setqtyObj(filteredArr);
    }
  };

  const handleAddToCart = () => {
    handleAddWishlistItemToCart([productId], customerWishlistResponse, customerWishlistRefetch);
  };

  const redirectQuery = (redirectto) => {
    const query = {
      qty: qtyObj?.find((item) => item?.productId === productId)?.quantity,
      id: productId,
    };
    query[redirectto] = true;
    customOptions?.forEach((e) => {
      query[e.name] = e.value;
    });
    const redirectUrl = {
      pathname: `/${customUrl?.split(".")[0]}`,
      query,
    };
    return redirectUrl;
  };

  const redirectToPdp = () => {
    history.push(redirectQuery("isWishlist"));
  };

  const redirectToSelectPdpOptions = () => {
    history.push(redirectQuery("selectOptions"));
  };

  const allCustomOptions =
    product?.product?.productType === "bundle"
      ? customOptions
      : customOptions?.map((opt) => opt).reverse();

  const price = useMemo(() => {
    return (
      product?.product?.productType === "bundle"
        ? finalPrice?.value + Number(addOnPrice)
        : Number(addOnPrice) || finalPrice?.value
    )?.toFixed(2);
  }, [product, addOnPrice, finalPrice]);

  return (
    <div
      className={`${
        removeProductFromWishlistLoading ||
        addWishlistItemToCartLoading ||
        updateProductInWishlistLoading
          ? "opacity-30 pointer-events-none "
          : null
      } w-full sm:w-6/12 md:w-4/12 xl:w-3/12 px-2 rounded mb-8 relative`}
    >
      <div
        className="border rounded max-w-sm mx-auto cursor-pointer"
        onClick={redirectToSelectPdpOptions}
        onKeyUp={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            redirectToSelectPdpOptions(event);
          }
        }}
        role="link"
        tabIndex="0"
      >
        <ImageTag
          title={name}
          src={
            url
              ? removeCache(url)
              : "https://admin.elementvape.com/media/logo/stores/1/logo_ev_01.png"
          }
          width={500}
          height={500}
          alt={name + "Price $ " + price}
        />
      </div>
      <div>
        {customUrl ? (
          <div
            className="mt-2 text-[#282828] hover:text-skin-secondary ease-in duration-200 hover:underline text-sm uppercase text-center font-medium line-clamp-2 cursor-pointer"
            onClick={redirectToSelectPdpOptions}
            onKeyUp={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                redirectToSelectPdpOptions(event);
              }
            }}
            role="link"
            tabIndex="0"
          >
            {name || ""}
          </div>
        ) : (
          ""
        )}

        <div className="flex justify-center items-center">
          <SubHeading className="sr-only text-sm font-medium">Reviews</SubHeading>
          <Review myRef={myRef} pdp productId={id} />
        </div>

        <h4 className="text-[#282828] text-sm text-center font-semibold">
          $
          {(product?.product?.productType === "bundle"
            ? finalPrice?.value + Number(addOnPrice)
            : Number(addOnPrice) || finalPrice?.value
          )?.toFixed(2)}
        </h4>

        {allCustomOptions?.length ? (
          <p
            className="text-sm text-center cursor-default w-full relative"
            onMouseEnter={() => setseeDetails(true)}
            onMouseLeave={() => setseeDetails(false)}
          >
            <span className="select-none cursor-pointer">See Details</span>
            {seeDetails ? (
              <div className="absolute bg-white py-4 px-4 text-left text-[#282828] font-sans border border-gray-400 right-16 md:right-[-20px] cursor-default top-6 z-10 md:min-w-[200px]">
                <p className="text-[16px] mb-[15px] font-medium">Option Details</p>
                {allCustomOptions?.map((option) => (
                  <div key={option?.code} className="pb-[10px]">
                    <p className="font-bold my-[5px] capitalize">{option?.name}</p>
                    <p className="text-[14px] capitalize">{option?.valueName}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </p>
        ) : null}

        <textarea
          className="border w-full px-2 mt-2 text-sm disabled:cursor-not-allowed"
          cols={30}
          rows={2}
          disabled={stockStatus === "OUT_OF_STOCK"}
          value={qtyObj?.find((item) => item?.productId === productId)?.comments}
          placeholder="comments"
          onChange={(e) => {
            handleInputChange(e, "comments");
          }}
        />
        <div className="sm:m-0 sm:float-none">
          {/* <div className="flex items-center justify-between w-full"> */}
          <div className="flex flex-wrap items-center gap-[10px] justify-center mb-[20px]">
            <div className="m-0 md:table-cell flex md:pr-[10px]">
              <label
                htmlFor="quantity"
                className="md:w-auto sm:float-left text-skin-base md:clear-both md:text-left  md:m-0 inline-block h-[30px] pr-[10px] leading-[1.35] pt-[7px]  text-[13px]  font-semibold "
              >
                Qty
              </label>

              <div
                className={`sm:float-left w-auto ${
                  qtyStockError?.length && qtyStockError.includes(productId) ? "md:text-center" : ""
                }`}
              >
                <input
                  type="number"
                  className="w-[40px] border-[1px] border-[#ebebeb] h-[32px]  text-center text-[#9c9c9c] text-[12px] leading-[1.35] px-0"
                  disabled={stockStatus === "OUT_OF_STOCK"}
                  value={qtyObj?.find((item) => item?.productId === productId)?.quantity}
                  onChange={(e) => {
                    handleInputChange(e, "quantity");
                  }}
                  min={1}
                  max={40}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUpdateWishlist();
                    }
                  }}
                />
                {
                  qtyStockError?.length && qtyStockError.includes(productId) ? (
                    <div className="text-[13px] leading-[1.35] text-center mt-[7px] text-[#e02b27]">
                      The maximum you may purchase is 40.
                    </div>
                  ) : null // Content to render when the condition is false
                }
              </div>
            </div>
            <div className="m-0 table-cell align-bottom wishlist-addtocart-btn">
              <div className="md:m-0 sm:table-cell">
                <button
                  onClick={() => handleAddToCart()}
                  type="button"
                  disabled={stockStatus === "OUT_OF_STOCK"}
                  className="w-full h-[30px] px-[15px] py-[7px] m-0 bg-skin-secondary uppercase border border-transparent disabled:opacity-75 disabled:cursor-not-allowed  text-[12px] font-normal leading-[1.35] inline-block text-skin-inverted hover:text-skin-muted hover:border-skin-dark hover:bg-skin-inverted ease-in duration-200"
                >
                  {addWishlistItemToCartLoading ? (
                    <LoadingSpinner message="adding" />
                  ) : (
                    "Add To Cart"
                  )}
                </button>
              </div>
            </div>

            <div className="product-item-actions m-0 wishlist-addtocart-icon">
              <div className="actions-primary">
                <button
                  type="button"
                  data-role="tocart"
                  data-post='{"action":"https:\/\/staging.elementvape.com\/wishlist\/index\/cart\/","data":{"item":"965401","qty":"2.0000","uenc":""}}'
                  title="Add to Cart"
                  data-item-id="965402"
                  className="action tocart primary"
                  onClick={() => handleAddToCart()}
                  disabled={stockStatus === "OUT_OF_STOCK"}
                >
                  <img src="/assets/cart.svg" className="w-[16px] h-[16px]" alt="cart" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap flex-col absolute top-0">
          <button
            type="button"
            title="Remove Item"
            className="h-4 w-4 pt-px text-md cursor-pointer bg-skin-secondary hover:bg-skin-inverted text-skin-inverted hover:text-skin-secondary border border-[#a80f16] ease-in duration-200 ml-1 mt-1 p-[1px] mb-1"
            onClick={() => handleRemoveProductFromWishlist([productId])}
            aria-label="Remove Item"
          >
            <XIcon />
          </button>

          <button
            onClick={redirectToPdp}
            type="button"
            aria-label="Edit Item"
            className="h-4 w-4 pt-px text-md cursor-pointer bg-skin-secondary hover:bg-skin-inverted text-skin-inverted hover:text-skin-secondary border border-[#a80f16] ease-in duration-200 ml-1 p-[1px]"
          >
            <PencilIcon />
          </button>
        </div>
        {stockStatus === "OUT_OF_STOCK" ? (
          <p className="text-sm text-center font-medium w-full relative mt-2">Out of stock</p>
        ) : null}
      </div>
    </div>
  );
}

MyWishlistProduct.defaultProps = {
  product: {},
  productId: "",
  qtyObj: [],
  customOptions: [],
  removeProductFromWishlistLoading: false,
  addWishlistItemToCartLoading: false,
};

MyWishlistProduct.propTypes = {
  product: PropTypes.shape({
    product: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
      image: PropTypes.shape({ url: PropTypes.string }),
      stockStatus: PropTypes.string,
      priceRange: PropTypes.shape({
        minPrice: PropTypes.shape({
          finalPrice: PropTypes.shape({ value: PropTypes.number }),
          regularPrice: PropTypes.shape({ value: PropTypes.number }),
        }),
        regularPrice: PropTypes.shape({
          finalPrice: PropTypes.shape({ value: PropTypes.number }),
          regularPrice: PropTypes.shape({ value: PropTypes.number }),
        }),
      }),
      customUrl: PropTypes.string,
      sku: PropTypes.string,
    }),
    quantity: PropTypes.number,
  }),
  productId: PropTypes.string,
  qtyObj: PropTypes.arrayOf(
    PropTypes.shape({ productId: PropTypes.string, quantity: PropTypes.number })
  ),
  setqtyObj: PropTypes.func.isRequired,
  customOptions: PropTypes.arrayOf(
    PropTypes.shape({ code: PropTypes.string, value: PropTypes.string })
  ),
  handleRemoveProductFromWishlist: PropTypes.func.isRequired,
  removeProductFromWishlistLoading: PropTypes.bool,
  handleAddWishlistItemToCart: PropTypes.func.isRequired,
  addWishlistItemToCartLoading: PropTypes.bool,
  customerWishlistRefetch: PropTypes.func.isRequired,
};
