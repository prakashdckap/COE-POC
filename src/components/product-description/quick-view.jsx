import React, { Fragment, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import PRODUCT_DETAIL from "./graphql/query/product-detail";
import GuestPopup from "../guest-login-popup/guest";
import Paragraph from "../../theme-files/paragraph";
import SubHeading from "../../theme-files/sub-heading";
import useAddProduct from "../../helper/hooks/cart/use-add-product";
import LoadingSpinner from "../../helper/loading-spinner";
import SocialIcons from "./social-icons";
import QtyInput from "../../theme-files/qty-input";
import Review from "../review";
import useAddItemToWishlist from "../../helper/hooks/customer/use-add-item-to-wishlist";
import ImageGalary from "./modules/layout/image-slider/imageGalary";
import SelectOptionDefault from "../../theme-files/select-option-default";
import GuestLoginPopup from "../guest-login-popup/guestLoginPopup";
import sezzle from "../../../public/assets/icons/sezzle_icon.svg";
import { InformationCircleOutline } from "heroicons-react";
import SezzlePdpModel from "./SezzlePayModel";
import { Gtag_AddToCartEvent, Gtag_AddToWishlistEvent } from "../../utils/google-tags/events";

function QuickView({ show, setShow, id, url }) {
  const { data: QuickViewDeatils, loading: QuickViewDetailsLoading } = useQuery(PRODUCT_DETAIL, {
    skip: !id,
    variables: {
      productId: id,
      pageSize: 10,
      currentPage: 1,
      sort: { sortBy: "name", sortOrder: "DESC" },
    },
  });

  const history = useRouter();
  // const [selectedOption, setselectedOption] = useState([]);
  const products = QuickViewDeatils?.products?.items[0];
  const { addToCart, addProductToCartLoading, cartLoading } = useAddProduct(setShow);
  const { handleAddProductToWishlist, addProductToWishlistLoading } = useAddItemToWishlist();
  const [dropdownSelectedData, setdropdownSelectedData] = useState({});
  const [clicked, setclicked] = useState(false);
  const [isError, setisError] = useState(false);
  const [qty, setQty] = useState(1);
  const [calculatedPrice, setCalculatedPrice] = useState(
    parseFloat(products?.priceRange?.minPrice?.finalPrice?.value, 10)
  );
  const [images, setimages] = useState([]);
  const [shortDes, setshortDes] = useState("");
  const [isInstock, setIsInstock] = useState(true);
  const [showguestpopup, setshowguestpopup] = useState(false);
  const customerToken = useSelector((state) => state.customerToken);
  const [updatePrice, setUpdatePrice] = useState(calculatedPrice);
  const [selectOptionsPrice, setSelectOptionsPrice] = useState(null);

  const [selectedOptionImage, setSelectedOptionImage] = useState(null);
  const [showZipPopUp, setShowZipPopUp] = useState(false);

  const imageRef = useRef();

  const swipersRef = useRef();

  const productName = products?.name;

  const extractNumberBeforePack = (str) => {
    const match = str?.match(/(\d+)-pack/i);
    return match ? parseInt(match[1], 10) : null;
  };

  const bundleProductsMinSaleQty = extractNumberBeforePack(productName);

  const flattenDeep = (arr) => arr.flat(Infinity);

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

  const optionsSaleQty = Object.keys(dropdownSelectedData || {}).map((optionKey) => {
    const optionsArray = products.options.map((option) => {
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
    const productOptionsArray = products.productOptions.map((productOption) => {
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
    if (qty > item.SaleQty) {
      messages.push(`The requested Qty is not available for ${item.name}`);
    }
  });

  useEffect(() => {
    if (products?.mediaGallery?.length) {
      setimages(products?.mediaGallery);
    }
  }, [products?.mediaGallery]);

  useEffect(() => {
    let updatedPrice = products?.priceRange?.minPrice?.finalPrice?.value;
    // Object.keys(dropdownSelectedData).map((key) => {
    //   if (dropdownSelectedData[key]?.skip)
    //     if (dropdownSelectedData[key]?.optionPrice?.value)
    //       updatedPrice += dropdownSelectedData[key]?.optionPrice?.value;
    //   return null;
    // });
    setCalculatedPrice(parseFloat(updatedPrice?.toFixed(2)));
  }, [products?.priceRange?.minPrice?.finalPrice?.value]);

  const handleAddToCart = () => {
    setclicked(true);
    if (!isError) {
      const productType = products?.productType;
      let optionType = productType === "bundle" ? "bundleOptions" : "customOptions";
      let customOption = {};
      customOption[optionType] = generateCustomOptions(dropdownSelectedData);
      addToCart([
        {
          productSku: products?.sku,
          productId: products?.id,
          productType,
          quantity: qty,
          ...customOption,
        },
      ]);
      Gtag_AddToCartEvent(products);
    }
  };

  // Function to handle add to wishlist
  const handleAddToWishlist = () => {
    if (customerToken) {
      let customOptions = Object?.keys(dropdownSelectedData)?.map((option) => ({
        code: option,
        value: dropdownSelectedData[option]?.optionCode,
      }));
      if (products?.bundleProductOptions?.bundleItems?.length) {
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
            productSku: products?.sku,
            quantity: qty,
            customOptions: customOptions,
          },
        ],
        products?.name
      );
      Gtag_AddToWishlistEvent(products);
    } else {
      setshowguestpopup(true);
    }
  };

  useEffect(() => {
    if (products?.options?.length) {
      products?.options?.map((option) => {
        if (option?.required) {
          if (
            Object.keys(dropdownSelectedData)?.includes(option?.attributeCode) &&
            !Object.values(dropdownSelectedData).includes(null)
          ) {
            setSelectedOptionImage(dropdownSelectedData);
            return setisError(false);
          } else {
            setSelectedOptionImage(null);
            setimages(products?.mediaGallery);

            if (swipersRef?.current) {
              swipersRef?.current.swiper.slideTo(0);
            }
          }
          return setisError(true);
        }
        return null;
      });
    } else if (products?.bundleProductOptions?.bundleItems?.length) {
      products?.bundleProductOptions?.bundleItems?.map((option) => {
        if (option?.required) {
          if (
            Object.keys(dropdownSelectedData)?.includes(option?.sku) &&
            !Object.values(dropdownSelectedData).includes(null)
          ) {
            let key = Object.keys(dropdownSelectedData)[0]; // Get the first key from the array of keys

            // Get the URL from the media_gallery array
            let urlImage = dropdownSelectedData[key]?.product?.media_gallery?.[0]?.url;

            if (urlImage) {
              // Create the object with the key and urlImage
              let setObj = {
                [key]: {
                  optionImage: urlImage,
                },
              };
              setSelectedOptionImage(setObj);
            } else {
              setSelectedOptionImage(null);
              setimages(products?.mediaGallery);

              if (swipersRef?.current) {
                swipersRef?.current.swiper.slideTo(0);
              }
            }
            return setisError(false);
          } else {
            setSelectedOptionImage(null);
            setimages(products?.mediaGallery);
            if (swipersRef?.current) {
              swipersRef?.current.swiper.slideTo(0);
            }
          }
          return setisError(true);
        }
        return null;
      });
    }
  }, [dropdownSelectedData, products]);

  useEffect(() => {
    if (products) {
      setIsInstock(products?.stockStatus === "IN_STOCK" ? true : false);
    }
  }, [products]);

  // Short Description Replacing the URL
  useEffect(() => {
    if (products?.shortDescription?.value) {
      const des = ReactHtmlParser(
        products?.shortDescription?.value?.replaceAll("https://www.elementvape.com", "")
      );
      setshortDes(des);
    }
  }, [products?.shortDescription?.value]);

  const handleUrlClick = (event) => {
    if (event.ctrlKey || event.metaKey) {
      window.open(url.split(".")[0], "_blank");
    } else {
      history.push({
        pathname: url.split(".")[0],
      });
    }
  };

  useEffect(() => {
    let updatedPrice = isNaN(calculatedPrice) ? 0 : calculatedPrice;
    Object.keys(dropdownSelectedData).map((key) => {
      if (
        dropdownSelectedData[key]?.optionPrice?.value !== calculatedPrice &&
        dropdownSelectedData[key]?.optionPrice?.value &&
        !dropdownSelectedData[key]?.skip
      ) {
        //  for required options
        if (dropdownSelectedData[key]?.optionPrice?.value)
          updatedPrice = dropdownSelectedData[key]?.optionPrice?.value;
      } else if (dropdownSelectedData[key]?.skip) {
        //  for add on price
        if (dropdownSelectedData[key]?.optionPrice?.value)
          updatedPrice += dropdownSelectedData[key]?.optionPrice?.value;
      }
      return null;
    });
    setSelectOptionsPrice(updatedPrice?.toFixed(2));
  }, [updatePrice, dropdownSelectedData, calculatedPrice]);

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={setShow}>
        <div className="flex min-h-screen text-center md:block " style={{ fontSize: 0 }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="hidden fixed bg-[#3333338c] inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden md:inline-block md:align-middle md:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enterTo="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 md:scale-100"
            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          >
            <div
              className={`${
                QuickViewDetailsLoading ||
                addProductToCartLoading ||
                cartLoading ||
                addProductToWishlistLoading
                  ? "opacity-80 pointer-events-none"
                  : null
              } flex text-base text-left transform transition w-full md:inline-block  md:p-0 md:my-8 md:align-middle quick-view-popup h-[100vh]`}
            >
              <div className="overflow-auto max-h-[90%] shadow-lg shadow-gray-700">
                <div className="w-full min-h-[85vh] relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-2.5 justify-center">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-[#000] hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-4 lg:right-4"
                    onClick={() => setShow(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <div className="grid grid-cols-12 gap-y-8 gap-x-6 items-start md:gap-x-10">
                    {products?.image?.url && JSON?.parse(products?.image?.url) ? (
                      <div
                        className={`aspect-w-2 aspect-h-3 rounded-lg overflow-hidden col-span-12 md:col-span-6 md:float-left md:w-[100%] image-list ${
                          products?.options[0]?.attributeName === "Strength" && "mt-[4.5rem]"
                        }`}
                      >
                        <div className="image-view-list" tabIndex={-1}>
                          <ImageGalary
                            images={images}
                            imageRef={imageRef}
                            productOptions={products?.options}
                            imgUrl={products?.image?.url}
                            selectedOptionImage={selectedOptionImage}
                            swipersRef={swipersRef}
                          />
                          {/* Description */}
                          {products?.shortDescription?.value ? (
                            <div className="my-[20px] pb-[20px] pdp-short-description">
                              <div className="text-[13px] text-skin-base font-normal space-y-[16px] hidden md:block">
                                <Paragraph className="shortDescription-links">{shortDes}</Paragraph>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`aspect-w-2 aspect-h-3 rounded-lg overflow-hidden col-span-12 ${
                          !QuickViewDetailsLoading ? "md:col-span-12" : ""
                        }`}
                      >
                        {QuickViewDetailsLoading && (
                          <div className="flex justify-center">
                            {/* <LoadingSpinner message="Loading" className="bg-black" /> */}
                            Loading...
                          </div>
                        )}
                      </div>
                    )}

                    {!QuickViewDetailsLoading && (
                      <div className="col-span-12 md:col-span-6 p-2.5 md:float-left md:w-[100%] md:pt-[60px] md:px-[20px] md:pb-[20px]">
                        <SubHeading
                          className="text-[24px] lg:text-[30px] leading-[1.5] font-medium text-skin-base pr-12 md:pr-2 "
                          role="button"
                          tabIndex="0"
                          aria-label={"Product Name " + products?.name}
                        >
                          {products?.name}
                        </SubHeading>

                        <div
                          onClick={handleUrlClick}
                          onKeyUp={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              handleUrlClick(event);
                            }
                          }}
                          role="button"
                          tabIndex="0"
                          className="my-[10px]"
                        >
                          <Paragraph className="flex justify-end sm:static">
                            <a className="text-sm text-[#a80f16] font-medium capitalize underline mt-3 detail">
                              View full details
                            </a>
                          </Paragraph>
                        </div>
                        <section
                          aria-labelledby="information-heading"
                          className="pb-[5px] mb-[20px] "
                        >
                          <SubHeading id="information-heading" className="sr-only">
                            Product information
                          </SubHeading>
                          <div className="flex justify-between items-end pb-[5px]">
                            {isInstock ? (
                              <Paragraph
                                className="text-2xl font-semibold text-skin-base"
                                role="button"
                                tabIndex="0"
                                aria-label={"Product Price $" + selectOptionsPrice}
                              >
                                {products?.priceRange?.minPrice?.finalPrice?.value !==
                                products?.priceRange?.minPrice?.regularPrice?.value ? (
                                  <span>
                                    {" "}
                                    <del>
                                      ${products?.priceRange?.minPrice?.regularPrice?.value}
                                    </del>{" "}
                                    &nbsp;{" "}
                                  </span>
                                ) : (
                                  ""
                                )}
                                {isNaN(selectOptionsPrice)
                                  ? ""
                                  : `$${
                                      selectOptionsPrice
                                        ? Number(selectOptionsPrice).toFixed(2)
                                        : "0.00"
                                    }`}
                              </Paragraph>
                            ) : (
                              ""
                            )}
                            {products && (
                              <Paragraph
                                className={` ${
                                  isInstock
                                    ? "text-[#238541]"
                                    : "text-[#ff1800] w-full text-center flex justify-center items-center"
                                }  font-semibold font-sans text-xs uppercase`}
                              >
                                {!isInstock ? (
                                  <Image
                                    src="/icons/remove.png"
                                    width={25}
                                    height={25}
                                    alt="remove"
                                  />
                                ) : (
                                  ""
                                )}
                                <span className="ml-1">
                                  {isInstock ? "In " : "Out of "}
                                  Stock
                                </span>
                              </Paragraph>
                            )}
                          </div>
                          {isInstock && (
                            <div className="border-b border-[#979797]">
                              <div
                                role="button"
                                tabIndex="0"
                                className="text-[14px] flex items-center flex-wrap text-[#282828] font-Montserrat font-medium cursor-pointer mb-2"
                                onClick={() => setShowZipPopUp(true)}
                                onKeyUp={(event) => {
                                  if (event.key === "Enter" || event.key === " ")
                                    setShowZipPopUp(true);
                                }}
                              >
                                or 4 interest-free payments of{" "}
                                <span className="font-extrabold text-[1.2em] mx-[3px]">
                                  ${(selectOptionsPrice / 4).toFixed(2)}
                                </span>{" "}
                                with{" "}
                                <span className="mx-[3px] mt-1">
                                  <Image
                                    height={18}
                                    width={72}
                                    src={sezzle}
                                    alt="Sezzle - Buy now pay later."
                                  />
                                </span>
                                <span role="button" className="flex" tabIndex="-1">
                                  <InformationCircleOutline className="h-[16px] w-[13px] md:w-[16px]" />
                                </span>
                              </div>
                              <SezzlePdpModel
                                isOpen={showZipPopUp}
                                onClose={() => setShowZipPopUp(false)}
                              />
                            </div>
                          )}
                          {/* Reviews */}
                          {products?.id ? (
                            <div className="">
                              <SubHeading className="sr-only">Reviews</SubHeading>
                              <Review pdp={false} productId={products?.id} quickView={true} />
                            </div>
                          ) : (
                            ""
                          )}
                        </section>

                        {/* Description */}
                        {products?.shortDescription?.value ? (
                          <div className="">
                            <div className="mt-4 prose text-sm prose-sm text-skin-base font-normal block md:hidden">
                              <Paragraph>{shortDes}</Paragraph>
                            </div>
                          </div>
                        ) : null}

                        <section aria-labelledby="options-heading" className="">
                          <SubHeading id="options-heading" className="sr-only">
                            Product options
                          </SubHeading>

                          <form>
                            {/* Product options */}
                            {isInstock ? (
                              <>
                                {products?.options?.length ? (
                                  <div className="mb-[15px] pb-5 border-b border-gray-300">
                                    {products?.options?.map((option) => (
                                      <div
                                        className="lg:col-span-3 col-span-6 "
                                        key={option?.attributeCode}
                                      >
                                        <SelectOptionDefault
                                          key={option?.attributeCode}
                                          label={option?.attributeName}
                                          disableTriggerKey="saleQty"
                                          data={option?.attributeOptions}
                                          displayKey="optionName"
                                          setdropdownSelectedData={setdropdownSelectedData}
                                          dropdownSelectedData={dropdownSelectedData}
                                          name={option?.attributeCode}
                                          isRequired={option?.required}
                                          isClicked={clicked}
                                          placeholder="Choose an Option..."
                                          showPrice
                                          price={calculatedPrice}
                                          setUpdatePrice={setUpdatePrice}
                                          calculatedPrice={calculatedPrice}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                ) : products?.productType === "bundle" &&
                                  products?.bundleProductOptions?.bundleItems &&
                                  products?.bundleProductOptions?.bundleItems?.length ? (
                                  <div className="my-5">
                                    {products?.bundleProductOptions?.bundleItems?.map((option) => (
                                      <SelectOptionDefault
                                        key={option?.sku}
                                        label={option?.title}
                                        data={option?.options}
                                        displayKey="label"
                                        disableTriggerKey="sale_qty"
                                        setdropdownSelectedData={setdropdownSelectedData}
                                        dropdownSelectedData={dropdownSelectedData}
                                        name={option?.sku}
                                        isRequired={option?.required}
                                        isClicked={clicked}
                                        placeholder="Choose an Option..."
                                        // showPrice
                                        price={calculatedPrice}
                                        productType={products?.productType}
                                        bundleProductsMinSaleQty={bundleProductsMinSaleQty}
                                        setUpdatePrice={setUpdatePrice}
                                        calculatedPrice={calculatedPrice}
                                      />
                                    ))}
                                  </div>
                                ) : (
                                  ""
                                )}

                                {products?.productOptions?.length ? (
                                  <div className="my-5 pb-2 border-b border-gray-300">
                                    <Paragraph className="text-skin-base font-semibold text-[13px] my-4">
                                      ADD ON AND SAVE
                                    </Paragraph>
                                    {products?.productOptions?.map((option) => (
                                      <div
                                        className="lg:col-span-3 col-span-6 mb-[15px]"
                                        key={option?.attributeCode}
                                      >
                                        <SelectOptionDefault
                                          key={option?.attributeCode}
                                          label={option?.attributeName}
                                          disableTriggerKey="saleQty"
                                          data={option?.attributeOptions}
                                          displayKey="optionName"
                                          setdropdownSelectedData={setdropdownSelectedData}
                                          dropdownSelectedData={dropdownSelectedData}
                                          name={option?.attributeCode}
                                          isRequired={option?.required}
                                          isClicked={clicked}
                                          placeholder="-- Please Select --"
                                          showPrice
                                          AddToTotalPrice
                                          price={calculatedPrice}
                                          setUpdatePrice={setUpdatePrice}
                                          calculatedPrice={calculatedPrice}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                ) : null}

                                <div>
                                  <QtyInput qty={qty} setqty={setQty} quickView />
                                </div>
                                {qty > 40 ? (
                                  <small className="text-red-600 text-center mt-2">
                                    The maximum you may purchase is 40
                                  </small>
                                ) : messages.length > 0 ? (
                                  messages?.map((message, index) => (
                                    <div key={index}>
                                      <small className="text-red-600 text-center mt-2 leading-none">
                                        {message}
                                      </small>
                                    </div>
                                  ))
                                ) : null}
                              </>
                            ) : (
                              ""
                            )}

                            {isInstock ? (
                              <button
                                type="button"
                                disabled={qty > 40 || messages.length > 0}
                                className="mt-8 w-full bg-skin-secondary uppercase border border-transparent py-3 px-8 flex items-center justify-center text-sm font-medium text-skin-inverted hover:text-skin-primary hover:border-skin-secondary hover:bg-skin-inverted disabled:cursor-not-allowed disabled:pointer-events-none"
                                onClick={() => handleAddToCart()}
                              >
                                {cartLoading || addProductToCartLoading ? (
                                  <LoadingSpinner message="adding" />
                                ) : (
                                  "Add to cart"
                                )}
                              </button>
                            ) : null}

                            <div
                              className={`${
                                addProductToWishlistLoading
                                  ? "opacity-40 pointer-events-none cursor-not-allowed"
                                  : null
                              } w-full py-2 my-2`}
                            >
                              <button
                                type="button"
                                className="mx-auto flex justify-center items-center"
                                onClick={() => handleAddToWishlist()}
                              >
                                <HeartIcon className="h-4 w-4 bg-gray-50 text-gray-600" />
                                <span className="ml-2 font-medium hover:underline text-sm text-gray-500 uppercase">
                                  {!history?.query?.isWishlist
                                    ? "ADD TO WISH LIST"
                                    : "UPDATE WISHLIST"}
                                </span>
                              </button>

                              <SocialIcons />
                            </div>
                          </form>
                        </section>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
        {showguestpopup && (
          <GuestLoginPopup showguestpopup={showguestpopup} setshowguestpopup={setshowguestpopup} />
        )}
      </Dialog>
    </Transition.Root>
  );
}

export default QuickView;

QuickView.defaultProps = {
  show: false,
  id: 0,
  url: "",
};

QuickView.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func.isRequired,
  id: PropTypes.number,
  url: PropTypes.string,
};
