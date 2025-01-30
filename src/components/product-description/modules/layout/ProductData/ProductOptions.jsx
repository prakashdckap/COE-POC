import { useEffect, useState } from "react";
import Paragraph from "../../../../../theme-files/paragraph";
import SelectOptionDefault from "../../../../../theme-files/select-option-default";

export default function ProductOptions({
  product,
  setdropdownSelectedData,
  dropdownSelectedData,
  clicked,
  price,
  calculatedPrice,
  setSelectOptionsPrice,
}) {
  const { productType, options, bundleProductOptions, productOptions, name } = product;
  const [updatePrice, setUpdatePrice] = useState(price);
  console.log("Option Datas:", options);
  const extractNumberBeforePack = (str) => {
    const match = str?.match(/(\d+)-pack/i);
    return match ? parseInt(match[1], 10) : null;
  };

  const bundleProductsMinSaleQty = extractNumberBeforePack(name);

  useEffect(() => {
    const valuess = document.querySelectorAll("select");

    let finalValue = [];
    let finalArrValue = [];
    productOptions?.forEach((item) => {
      finalValue.push(item?.attributeOptions);
    });

    // Flattening the nested arrays into a single array
    finalValue = finalValue?.flatMap((array) => array);

    valuess.forEach((select) => {
      finalValue?.forEach((item) => {
        if (item?.optionCode === select?.value || item?.id === Number(select?.value)) {
          finalArrValue.push(item?.optionPrice?.value);
        }
      });
    });

    // Calculate the sum of numbers in the array
    const sum = finalArrValue?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setSelectOptionsPrice(sum);
  }, [updatePrice, dropdownSelectedData, price, calculatedPrice]);

  return (
    <>
      <div
        className={`${
          options?.length ? "border-t" : "border-t-[0px]"
        } border-[#ddd] mt-[20px] pt-[4px]`}
      >
        <div className="w-full md:w-3/5">
          {options?.length ? (
            <div className="my-5">
              {options?.map((option) => (
                <SelectOptionDefault
                  key={option?.attributeCode}
                  label={option?.attributeName}
                  data={option?.attributeOptions}
                  displayKey="optionName"
                  disableTriggerKey="saleQty"
                  setdropdownSelectedData={setdropdownSelectedData}
                  dropdownSelectedData={dropdownSelectedData}
                  name={option?.attributeCode}
                  isRequired={option?.required}
                  isClicked={clicked}
                  placeholder="Choose an Option..."
                  showPrice
                  price={price}
                  setUpdatePrice={setUpdatePrice}
                  calculatedPrice={calculatedPrice}
                />
              ))}
            </div>
          ) : productType === "bundle" &&
            bundleProductOptions?.bundleItems &&
            bundleProductOptions?.bundleItems?.length ? (
            <div className="my-5">
              {bundleProductOptions?.bundleItems?.map((option) => (
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
                  showPrice
                  price={price}
                  productType={productType}
                  bundleProductsMinSaleQty={bundleProductsMinSaleQty}
                  setUpdatePrice={setUpdatePrice}
                  calculatedPrice={calculatedPrice}
                />
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="border-t border-[#ddd]">
        {productOptions?.length ? (
          <div className="w-full md:w-3/5">
            <Paragraph className="text-skin-base font-bold md:font-semibold text-[13px] mt-4 flex justify-center md:justify-start">
              ADD ON AND SAVE
            </Paragraph>

            {productOptions?.length ? (
              <div className="my-5 space-y-5">
                {productOptions?.map((option) => (
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
                    price={price}
                    setUpdatePrice={setUpdatePrice}
                    calculatedPrice={calculatedPrice}
                  />
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
