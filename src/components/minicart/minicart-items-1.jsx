import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ExclamationIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";
import SubHeading from "../../theme-files/sub-heading";
import ImageTag from "../../theme-files/image";
import ListItem from "../../theme-files/list-item";
import Paragraph from "../../theme-files/paragraph";
import PageLink from "../../theme-files/link";
import useUpdateCartItem from "../../helper/hooks/cart/use-update-cart-item";
import DeleteItemModal from "../cart/delete-item-modal";
import { SET_NOTIFICATION } from "../../redux/actions";
import { removeCache } from "../../helper/removeCache";
import { Gtag_RemoveCartItemEvent } from "../../utils/google-tags/events";

export default function MinicartItems1({
  image,
  url,
  quantity,
  price,
  name,
  productId,
  customOptions,
  rowTotal,
  toggleCart,
  cartItem,
  allowCheckout,
}) {
  const dispatch = useDispatch();

  const [show, setshow] = useState(false);
  const [seeDetails, setseeDetails] = useState(false);
  const [qty, setQty] = useState(quantity);
  const [maxSaleQty, setMaxQty] = useState(quantity);

  const { updateCartItem, updateProductInCartLoading } = useUpdateCartItem();

  //  to get/validate max saleable qty
  useEffect(() => {
    if (Array.isArray(customOptions) && customOptions?.length) {
      if (Array.isArray(cartItem?.product?.options)) {
        // spread array to get all slected options
        let qtyArray = [];
        if (cartItem?.product?.productType === "bundle") {
          /** to get slectedOption from customOptions for @bundle products */
          if (Array.isArray(cartItem?.product?.bundleProductOptions?.bundleItems?.[0]?.options))
            cartItem?.product?.bundleProductOptions?.bundleItems?.[0]?.options?.map((item) => {
              // to get selected option from customSelected
              let customSelected = {};
              cartItem?.customOptions?.find((option) => {
                if (option?.value === item?.uid) customSelected = item;
                else return null;
              });
              // to get slectedOption from customSelected
              if (customSelected?.uid) {
                qtyArray.push({
                  ...customSelected,
                  saleQty: customSelected?.product?.sale_qty / customSelected?.quantity,
                });
              }
            });
        } else {
          /** to get slectedOption from customOptions for @config and @simple products */
          cartItem?.product?.options?.map((item) => {
            // to get selected parent option
            const customSelected = cartItem?.customOptions?.find(
              (option) => option?.code === item?.attributeCode
            );

            // to get slectedOption from customOptions
            const selectedOption =
              customSelected &&
              item?.attributeOptions?.find(
                (optionSelected) => optionSelected?.optionCode === customSelected?.value
              );
            if (customSelected && selectedOption) {
              qtyArray.push(selectedOption);
            }
          });
        }
        const maxSaleQty = Math.max(...qtyArray.map((opt) => opt.saleQty));
        const minSaleQty = Math.min(...qtyArray.map((opt) => opt.saleQty));
        setMaxQty(minSaleQty);
      }
    } else {
      setMaxQty(cartItem?.product?.saleQty);
    }
    setQty(cartItem?.quantity);
  }, [cartItem]);

  const showErrorMessage = (message) => {
    dispatch(
      SET_NOTIFICATION({
        status: true,
        message: message || "The requested qty is not available",
        type: "warning",
      })
    );
    setTimeout(() => setQty(quantity), 1000);
  };

  const handleUpdateItem = (updatedQty, productId) => {
    if (qty >= 40) {
      showErrorMessage(
        qty >= 40 ? "The requested qty exceeds the maximum qty allowed in shopping cart" : ""
      );
      return;
    }

    if (qty !== quantity && qty) {
      if (qty <= maxSaleQty && productId) {
        updateCartItem([
          {
            productUid: productId,
            quantity: parseInt(qty || quantity, 10),
          },
        ]);
      } else {
        showErrorMessage(
          qty >= 40 ? "The requested qty exceeds the maximum qty allowed in shopping cart" : ""
        );
      }
    }
  };

  const updateQty = (e) => {
    let updatedQty = parseInt(e.target.value, 10);
    updatedQty = isNaN(updatedQty) ? "" : updatedQty;
    setQty(updatedQty);
  };

  const hadnleSeeDetails = () => {
    setseeDetails((seeDetailss) => !seeDetailss);
  };

  const handleCloseMinicart = () => {
    setTimeout(() => {
      toggleCart();
    }, 250);
  };

  return (
    <>
      <ListItem
        className={`py-3 flex cursor-pointer ${
          updateProductInCartLoading ? "opacity-40 pointer-events-none" : null
        }`}
      >
        <div className="relative">
          {image ? (
            <ImageTag
              src={image && removeCache(JSON?.parse(image))}
              alt={name}
              className="flex-none w-16 h-16 rounded-md border border-gray-200"
              height={75}
              width={75}
            />
          ) : null}
          <button
            type="button"
            onClick={() => {
              setshow(true);
              Gtag_RemoveCartItemEvent(cartItem?.product);
            }}
            tabIndex={"-1"}
          >
            <i
              type="button"
              className="absolute h-4 w-4 top-0 right-0 border border-skin-secondary bg-[#a80f16] hover:bg-skin-inverted hover:border-[#a80f16]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[100%] w-[100%] text-skin-inverted hover:text-orange-600 focus:bg-[#fff] focus:text-[#000]"
                viewBox="0 0 20 20"
                fill="currentColor"
                tabIndex={"0"}
                aria-label="Remove"
                role="link"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </i>
          </button>
        </div>

        <div className="flex justify-between flex-auto ml-4 w-[75%]">
          <div className="font-medium text-xs text-[#282828] hover:text-skin-primary w-[75%]">
            <div className="w-[80%]">
              <PageLink
                className="text-[12px]"
                href={{ pathname: `/${url}` }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " " || e.keyCode === 13 || e.keyCode === 32) {
                    handleCloseMinicart();
                  }
                }}
              >
                <span onClick={handleCloseMinicart}>{name}</span>
              </PageLink>
            </div>
            {customOptions?.length ? (
              <div className="font-normal flex text-center text-[13px] mt-2.5 mb-[3px] text-[#282828]">
                <span onClick={hadnleSeeDetails} className="select-none">
                  {" "}
                  See Details{" "}
                </span>
                <button
                  onClick={() => hadnleSeeDetails()}
                  type="button"
                  aria-label="Press enter to see details"
                >
                  {!seeDetails ? (
                    <svg
                      className="h-[10px] w-[10px] ml-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                  ) : (
                    <svg
                      className="h-[10px] w-[10px] ml-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
                    </svg>
                  )}
                </button>
              </div>
            ) : (
              ""
            )}
            {seeDetails && customOptions?.length
              ? customOptions.map((option) => {
                  // Regular expression to match numbers followed by "-pack"
                  const packMatch = name?.match(/(\d+)-pack/i);
                  const packSize = packMatch ? packMatch[1] : null;
                  // Adjusting the value name if pack size is found
                  const adjustedValueName = packSize
                    ? `${packSize} x ${option?.valueName}`
                    : option?.valueName;

                  return (
                    <React.Fragment key={option?.code}>
                      <p className="font-bold text-[13px] mb-[5px]">{option?.name}</p>
                      <p className="w-[90%]">{adjustedValueName || ""}</p>
                    </React.Fragment>
                  );
                })
              : null}
          </div>
          <div className="whitespace-nowrap relative w-[25%] md:w-[17%]">
            <Paragraph
              className="text-xs md:text-sm text-skin-secondary font-bold text-gray-500"
              role="link"
              tabIndex="0"
            >
              &#x24;{(rowTotal / quantity)?.toFixed(2)}
            </Paragraph>
            <div className="absolute right-[5px]  md:right-[15px]">
              <span className=" text-[#636363] font-semibold text-xs justify-center mr-1.5">
                QTY:
              </span>
              <input
                type="number"
                id="quantity-0"
                name="quantity-0"
                value={qty}
                onBlur={(e) => handleUpdateItem(qty, productId)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " " || e.keyCode === 13 || e.keyCode === 32) {
                    e.preventDefault(); // Prevent default behavior for space in input
                    handleUpdateItem(qty, productId);
                  }
                }}
                style={{ maxWidth: 40 }}
                onChange={updateQty}
                className="mt-4 appearance-none rounded-none border border-gray-300 py-1 px-1 indent-[0.6px] text-center text-xs leading-5 font-medium text-gray-700 shadow-sm focus:border-[1px] focus:border-[#000]"
              />
            </div>
          </div>
        </div>

        <DeleteItemModal show={show} setshow={setshow} productId={productId} />
      </ListItem>
      {cartItem?.quantity > maxSaleQty ? (
        <Paragraph className="flex items-center text-xs md:text-sm bg-[#fdf0d5] text-[#6f4400] py-[10px] px-[20px] leading-[1.2em]">
          <ExclamationIcon className="w-5 h-5 bg-[#fef0d5] mr-5" fill="#c07600" /> The requested qty
          is not available
        </Paragraph>
      ) : (
        ""
      )}
    </>
  );
}

MinicartItems1.defaultProps = {
  image: "",
  url: "",
  quantity: 0,
  price: 0,
  name: "",
  productId: "",
  customOptions: {},
};

MinicartItems1.propTypes = {
  image: PropTypes.string,
  url: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
  name: PropTypes.string,
  productId: PropTypes.string,
  customOptions: PropTypes.shape(),
};
