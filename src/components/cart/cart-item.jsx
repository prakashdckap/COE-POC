import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { HeartIcon, PencilIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import SubHeading from "../../theme-files/sub-heading";
import ImageTag from "../../theme-files/image";
import Paragraph from "../../theme-files/paragraph";
import PageLink from "../../theme-files/link";
import useUpdateCartItem from "../../helper/hooks/cart/use-update-cart-item";
import DeleteItemModal from "./delete-item-modal";
import useAddCartItemToWishlist from "../../helper/hooks/customer/use-add-cart-item-to-wishlist";
import { removeCache } from "../../helper/removeCache";
import { Gtag_AddToWishlistEvent, Gtag_RemoveCartItemEvent } from "../../utils/google-tags/events";

export default function CartItem({
  name,
  quantity,
  price,
  url,
  image,
  productId,
  isCheckout,
  rowTotal,
  customOptions,
  product,
}) {
  const maxQty = 40;
  const qtyArr = [];

  for (let i = 1; i <= maxQty; i += 1) {
    qtyArr.push(i);
  }

  const [show, setshow] = useState(false);
  const history = useRouter();

  const customerToken = useSelector((state) => state.customerToken);
  const { updateCartItem, updateProductInCartLoading } = useUpdateCartItem();
  const { handleAddCartItemToWishlist, addCartItemToWishlistLoading } = useAddCartItemToWishlist();

  const { customUrl } = product || {};

  const handleUpdateItem = (e) => {
    updateCartItem([
      {
        productUid: productId,
        quantity: parseInt(e.target.value, 10),
      },
    ]);
  };

  const handleAddToWishlist = () => {
    const id = { productId: productId };
    handleAddCartItemToWishlist(id);
    Gtag_AddToWishlistEvent(product);
  };

  const optionChange = (optionCode, optionId) => {
    updateCartItem(
      [
        {
          productUid: productId,
          quantity,
          selectedOptions: [{ code: optionId, value: optionCode }],
        },
      ],
      product?.name
    );
  };

  // Add query for edit cart
  const handleEditCartItem = () => {
    const query = {
      isEditCart: true,
      qty: quantity,
      productUid: productId,
    };
    customOptions?.forEach((data) => {
      query[data?.code] = data?.value;
    });
    const editCart = {
      pathname: `/${customUrl?.split(".")[0]}`,
      query,
    };
    history.push(editCart);
  };

  const disableTriggerKey = "saleQty";
  const options =
    product?.options[0]?.attributeOptions ||
    product?.bundleProductOptions?.bundleItems?.[0]?.options ||
    [];

  const sortedData = options?.sort((a, b) => {
    if (product?.productType === "bundle") {
      disableTriggerKey = "sale_qty";
    }
    const aDisableKey =
      product?.productType === "bundle" ? a.product[disableTriggerKey] : a[disableTriggerKey];
    const bDisableKey =
      product?.productType === "bundle" ? b.product[disableTriggerKey] : b[disableTriggerKey];
    const aIsOutOfStock = aDisableKey < 1;
    const bIsOutOfStock = bDisableKey < 1;
    return aIsOutOfStock - bIsOutOfStock;
  });

  if (product)
    return (
      <tbody
        className={` checkout-summary__product shopping-cart__wrapper ${
          updateProductInCartLoading || addCartItemToWishlistLoading
            ? "opacity-40 pointer-events-none"
            : null
        } ${isCheckout ? "block" : null}`}
      >
        <tr className={`${isCheckout ? "flex justify-between" : "shopping-cart__tr"}`}>
          <td className="px-2 md:px-0 text-left align-top">
            <div className="flex my-5 shopping-cart__product">
              <div className="flex-shrink-0">
                {image ? (
                  <ImageTag
                    src={image && removeCache(JSON?.parse(image))}
                    alt={name}
                    className="w-24 h-24 rounded-md object-center object-contain sm:w-32 sm:h-32"
                    layout="fill"
                    width={!isCheckout ? 140 : 50}
                    height={!isCheckout ? 140 : 50}
                  />
                ) : null}
              </div>
              <div className={`${isCheckout ? "w-[200px] pl-3" : "min-w-[260px] md:min-w-auto"}`}>
                <div className={`${isCheckout ? "text-left" : "pl-5"} flex justify-between `}>
                  <div className={`${isCheckout ? "w-[210px] lg:w-[175px]" : ""} text-md`}>
                    {isCheckout ? (
                      <div className="text-[14px] font-semibold text-skin-base">{name}</div>
                    ) : (
                      <PageLink
                        href={{ pathname: url }}
                        className="text-[13px] font-semibold text-skin-base hover:text-skin-secondary"
                      >
                        {name}
                      </PageLink>
                    )}

                    {isCheckout ? (
                      <Paragraph>
                        <span className="font-normal text-[12px] text-skin-base">
                          Qty: {quantity}
                        </span>
                      </Paragraph>
                    ) : null}

                    {isCheckout
                      ? null
                      : customOptions?.length
                      ? customOptions?.map((option) => (
                          <div key={option?.code} className="flex mt-2 items-start">
                            <p className="font-bold text-xs">
                              {option?.name}
                              {option?.valueName ? ":" : null}
                            </p>
                            <span className="font-normal text-xs ml-1">
                              {option?.valueName ? `${option?.valueName}` : null}
                            </span>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </td>

          {!isCheckout ? (
            <td data-th="Price" className="px-2 md:px-0 text-center align-top">
              <Paragraph className="text-sm font-bold text-skin-base md:my-5">
                &#x24;{(rowTotal / quantity)?.toFixed(2)}
              </Paragraph>
            </td>
          ) : null}

          <td data-th="Qty" className="px-2 md:px-0 text-center align-top">
            {!isCheckout ? (
              <select
                id="quantity-0"
                name="quantity-0"
                value={quantity}
                onChange={(e) => handleUpdateItem(e, productId)}
                className="md:my-4 max-w-full w-14 border-1 border pl-[15px] border-[#aaa] py-1.5 text-base leading-5 font-medium text-gray-700 text-left focus:border-[#aaa]  sm:text-sm"
              >
                {qtyArr?.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            ) : (
              ""
            )}
          </td>

          <td
            data-th="Subtotal"
            className={`${
              isCheckout ? "w-[50px] md:pt-[0px] pt-[20px] " : null
            } px-2 md:px-0 text-center align-top`}
          >
            <Paragraph
              className={`${
                isCheckout ? "float-right text-[14px] font-medium pl-2" : null
              } md:my-5 text-sm font-bold text-skin-base md:text-right`}
            >
              &#x24;{rowTotal?.toFixed(2)}
            </Paragraph>
          </td>
        </tr>
        <tr className="md:border-b">
          <td className="hidden md:table-cell" />
          <td className="hidden md:table-cell" />
          <td className="hidden md:table-cell" />
          <td>
            {!isCheckout ? (
              <div className="flex justify-end items-center pb-5 shopping-cart__icon">
                {customerToken ? (
                  <button
                    title="Move to Wishlist"
                    type="button"
                    className="flex items-center justify-center"
                    onClick={() => handleAddToWishlist()}
                  >
                    {/* <HeartIcon className="bg-skin-button-accent-hover w-6 h-6 text-skin-inverted hover:bg-skin-inverted hover:text-skin-base hover:border hover:border-skin-dark rounded-full p-1" /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="bg-skin-button-accent-hover h-[20px] w-[20px] text-skin-inverted hover:bg-skin-inverted hover:text-skin-base hover:border hover:border-skin-dark transition-all duration-300 ease-in-out rounded-full p-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>
                ) : null}

                {customerToken ? (
                  <button
                    title="Edit item parameters"
                    type="button"
                    className="ml-3 flex items-center justify-center"
                    onClick={handleEditCartItem}
                  >
                    <PencilIcon className="bg-skin-button-accent-hover h-[20px] w-[20px] text-skin-inverted hover:bg-skin-inverted hover:text-skin-base hover:border hover:border-skin-dark duration-300 rounded-full p-1" />
                  </button>
                ) : null}

                <button
                  title="Remove item"
                  type="button"
                  className=" ml-3 rounded-full hover:fill-[#000] fill-[#fff]"
                  onClick={() => {
                    setshow(true);
                    Gtag_RemoveCartItemEvent(product);
                  }}
                >
                  <svg
                    className="bg-skin-button-accent-hover h-[20px] w-[20px] text-skin-inverted hover:bg-skin-inverted hover:text-skin-base hover:border hover:border-skin-dark transition-all duration-300 ease-in-out rounded-full p-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                  >
                    <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                  </svg>
                </button>
              </div>
            ) : null}
          </td>
        </tr>
        {isCheckout ? (
          <div className="w-full flex flex-col md:pl-[62px] pl-[68px] custom-select-order-summary ">
            {customOptions?.length
              ? customOptions?.map((option) => {
                  //  for bundle options
                  if (product?.productType === "bundle") {
                    const packMatch = product?.name?.match(/(\d+)-pack/i);
                    const packSize = packMatch ? packMatch[1] : null;

                    // Adjusting the value name if pack size is found
                    const adjustedValueName = packSize
                      ? `${packSize} x ${option.valueName}`
                      : option.valueName;
                    return (
                      <div key={option?.code} className="mt-2">
                        <label className="text-skin-base font-normal text-[12px] mb-1" htmlFor="#">
                          {option?.name}&#58;
                          <br />
                          <div className="cursor-pointer">{adjustedValueName}</div>
                        </label>
                      </div>
                    );
                  }
                  return (
                    <div key={option?.code} className="">
                      <label className="text-skin-base font-semibold text-[13px] mb-1" htmlFor="#">
                        {option?.name}

                        <select
                          onChange={(e) => optionChange(e?.target.value, option?.code)}
                          className="focus:ring-1 focus:ring-[#bd1121] focus:outline-none checkout-order-summary-select"
                          value={option?.value}
                          disabled={updateProductInCartLoading || false}
                        >
                          {sortedData?.length
                            ? sortedData?.map((attributeOption) => {
                                const label = attributeOption?.optionName || attributeOption?.label;
                                const qty =
                                  attributeOption?.saleQty || attributeOption?.product?.sale_qty;
                                const key = attributeOption?.optionCode || attributeOption?.uid;

                                return (
                                  <option
                                    key={key}
                                    value={key}
                                    className="cursor-pointer"
                                    disabled={qty > 0 ? false : true}
                                  >
                                    {label}
                                    {qty > 0 ? "" : "(out of stock)"}
                                  </option>
                                );
                              })
                            : null}
                        </select>
                      </label>
                    </div>
                  );
                })
              : null}
          </div>
        ) : null}
        <DeleteItemModal show={show} setshow={setshow} productId={productId} />
      </tbody>
    );
}

CartItem.defaultProps = {
  image: "",
  url: "",
  quantity: 0,
  price: 0,
  name: "",
  productId: "",
  isCheckout: false,
  rowTotal: 0,
  customOptions: [],
};

CartItem.propTypes = {
  image: PropTypes.string,
  url: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
  name: PropTypes.string,
  productId: PropTypes.string,
  isCheckout: PropTypes.bool,
  rowTotal: PropTypes.number,
  customOptions: PropTypes.arrayOf(),
  product: PropTypes.shape.isRequired,
};
