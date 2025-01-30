import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import Heading from "../../../../../theme-files/heading";
import SubHeading from "../../../../../theme-files/sub-heading";
import PriceData from "./PriceData";
import ProductOptions from "./ProductOptions";
import ProductActions from "./ProductActions";

const ImageGalary = dynamic(() => import("../image-slider/imageGalary"), {
  ssr: false,
  loading: () => (
    <div className="image-swiper-slide">
      <span className="flex items-center justify-center py-10">
        <i class="fa fa-spinner animate-spin text-[50px]" aria-hidden="true" />
      </span>
    </div>
  ),
});

export default function ProductData({ product, price, promoBanner, myRef }) {
  const imageRef = useRef();
  const swipersRef = useRef();

  const history = useRouter();

  const [dropdownSelectedData, setdropdownSelectedData] = useState({});
  const [clicked, setclicked] = useState(false);
  const [qty, setqty] = useState(1);
  const [isError, setisError] = useState(false);
  const [isInstock, setIsInstock] = useState(true);
  const [images, setimages] = useState([]);
  const [selectOptionsPrice, setSelectOptionsPrice] = useState(null);
  const [selectedOptionImage, setSelectedOptionImage] = useState(null);
  const [calculatedPrice, setCalculatedPrice] = useState(price);

  const { name, stock_status, media_gallery } = product;
  const { productType, options, bundleProductOptions, productOptions, image } = product;

  // Select options for update cart
  useEffect(() => {
    if (history?.query?.isEditCart) {
      const { query } = history;
      const allOptionValue = { ...dropdownSelectedData };
      Object.entries(query).forEach(([key, value]) => {
        if (productType === "bundle") {
          const selectOptions = bundleProductOptions?.bundleItems?.find((f) => f.sku === key);
          if (selectOptions?.options?.length) {
            const select = selectOptions?.options.find((o) => o.uid === value);
            allOptionValue[key] = select;
          }
        } else {
          const selectOptions = options.find((f) => f.attributeCode === key);
          if (selectOptions?.attributeOptions?.length) {
            const select = selectOptions?.attributeOptions.find((o) => o.optionCode === value);
            allOptionValue[key] = select;
          }
        }
      });
      setdropdownSelectedData(allOptionValue);
    }
  }, [history?.query?.isEditCart]);

  // Select options for whishlist
  useEffect(() => {
    if (history?.query?.isWishlist || history?.query?.selectOptions) {
      const { query } = history;
      const allOptionValue = { ...dropdownSelectedData };
      Object.entries(query).forEach(([key, value]) => {
        productOptions.forEach((f) => {
          const optionArr = f.attributeOptions.find((n) => n.optionCode === value);
          if (optionArr) {
            allOptionValue[f.attributeCode] = { ...optionArr, skip: true };
          }
        });
        options.forEach((f) => {
          const optionArr = f.attributeOptions.find((n) => n.optionCode === value);
          if (optionArr) {
            allOptionValue[f.attributeCode] = optionArr;
          }
        });
        bundleProductOptions?.bundleItems?.forEach((f) => {
          const optionArr = f.options.find((n) => n.uid === value);
          if (optionArr) {
            allOptionValue[f?.sku] = optionArr;
          }
        });
      });
      setdropdownSelectedData(allOptionValue);
    }
  }, [history?.query?.isWishlist, history?.query?.selectOptions]);

  useEffect(() => {
    let updatedPrice = price;
    Object.keys(dropdownSelectedData).map((key) => {
      if (
        dropdownSelectedData[key]?.optionPrice?.value !== price &&
        dropdownSelectedData[key]?.optionPrice?.value
      ) {
        if (!dropdownSelectedData[key]?.skip)
          if (dropdownSelectedData[key]?.optionPrice?.value)
            updatedPrice = dropdownSelectedData[key]?.optionPrice?.value;
      }
      return null;
    });
    setCalculatedPrice(updatedPrice?.toFixed(2));
  }, [price, dropdownSelectedData]);

  // Determine In Stock
  useEffect(() => {
    setIsInstock(stock_status === "IN_STOCK" ? true : false);
  }, []);

  // To display Images
  useEffect(() => {
    if (media_gallery?.length) {
      filteredImage();
    }
  }, [media_gallery]);

  const selectOptionImage = () => {
    options?.map((option) => {
      if (option?.required) {
        if (
          Object.keys(dropdownSelectedData)?.includes(option?.attributeCode) &&
          !Object.values(dropdownSelectedData).includes(null)
        ) {
          setSelectedOptionImage(dropdownSelectedData);
          return setisError(false);
        } else {
          setSelectedOptionImage(null);
          setimages(media_gallery);

          if (swipersRef?.current) {
            swipersRef?.current?.swiper?.slideTo(0);
          }
        }
        return setisError(true);
      }
      return null;
    });
  };

  const selectBundleOptionImage = () => {
    bundleProductOptions?.bundleItems?.map((option) => {
      if (option?.required) {
        if (
          Object.keys(dropdownSelectedData)?.includes(option?.sku) &&
          !Object.values(dropdownSelectedData).includes(null)
        ) {
          // Extract the keys from the dropdownSelectedData object
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
            setimages(media_gallery);

            if (swipersRef?.current) {
              swipersRef?.current?.swiper?.slideTo(0);
            }
          }
          return setisError(false);
        } else {
          setSelectedOptionImage(null);
          setimages(media_gallery);

          if (swipersRef?.current) {
            swipersRef?.current?.swiper?.slideTo(0);
          }
        }
        return setisError(true);
      }
      return null;
    });
  };

  // To check all the required options were selected
  useEffect(() => {
    if (options?.length) {
      selectOptionImage();
    } else if (bundleProductOptions?.bundleItems?.length) {
      selectBundleOptionImage();
    }
  }, [dropdownSelectedData]);

  // media_gallery filter and set the setimage state
  const filteredImage = () => {
    if (media_gallery?.length) {
      setimages(media_gallery);

      if (swipersRef?.current) {
        swipersRef?.current?.swiper?.slideTo(0);
      }
    }
  };

  return (
    <div
      className={`${
        false ? "opacity-40 pointer-events-none" : ""
      } md:grid md:grid-cols-12 md:auto-rows-min`}
    >
      {/* ############ Image gallery ############ */}
      <div
        className={`md:col-start-1 md:col-span-6 md:row-start-1 md:row-span-3 pl-[10px] pr-[15px] pdp-image ${
          options?.[0]?.attributeName === "Strength" ? "mt-[4.5rem]" : "md:mt-0"
        }`}
      >
        <SubHeading className="sr-only text-sm font-medium">Images</SubHeading>
        <ImageGalary
          images={images}
          imageRef={imageRef}
          swipersRef={swipersRef}
          productOptions={options}
          imgUrl={image?.url}
          selectedOptionImage={selectedOptionImage}
        />
      </div>
      {/* ############ Image gallery End ############ */}

      <div className="md:col-span-6 px-[10px] md:px-0 md:pr-[20px]">
        <div className="md:col-start-8 md:col-span-5">
          <Heading className="text-[30px] leading-[1.35] text-skin-base font-normal uppercase text-center md:text-left mt-[10px] md:mt-[1px]">
            {name}
          </Heading>

          {/* ############ Product Price, Sezzle Pop-up, Rating, Description ############ */}
          <PriceData
            isInstock={isInstock}
            calculatedPrice={calculatedPrice}
            selectOptionsPrice={selectOptionsPrice}
            product={product}
            myRef={myRef}
          />

          {/* ############ Required and Add on Options ############ */}
          {product?.productType !== "simple" ? (
            <ProductOptions
              product={product}
              price={price}
              setdropdownSelectedData={setdropdownSelectedData}
              dropdownSelectedData={dropdownSelectedData}
              clicked={clicked}
              calculatedPrice={calculatedPrice}
              setSelectOptionsPrice={setSelectOptionsPrice}
            />
          ) : (
            ""
          )}


        </div>

        {/* ############ Product Action Buttons ############ */}
        <ProductActions
          setqty={setqty}
          qty={qty}
          promoBanner={promoBanner}
          dropdownSelectedData={dropdownSelectedData}
          isInstock={isInstock}
          isError={isError}
          product={product}
          setclicked={setclicked}
        />
      </div>
    </div>
  );
}
