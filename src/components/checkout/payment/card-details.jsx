import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectOption from "../../../theme-files/select-option";
import TextInput from "../../../theme-files/text-input";
import { SET_PAYMENT_DETAILS } from "../../../redux/actions";
import useGetCardType from "../../../helper/hooks/customer/use-get-card-type";
import ImageTag from "../../../theme-files/image";

export default function CardDetails({ validCvvError, setValidCvvError }) {
  const dispatch = useDispatch();
  const paymentDetails = useSelector((state) => state.paymentDetails);
  const [dropdownSelectedData, setdropdownSelectedData] = useState({});
  const [values, setvalues] = useState({});
  const [cardType, setCardType] = useState("");
  const { handleCardType } = useGetCardType();

  const months = [
    {
      name: "January",
      code: "JAN",
      id: "01",
    },
    {
      name: "February",
      code: "FEB",
      id: "02",
    },
    {
      name: "March",
      code: "MAR",
      id: "03",
    },
    {
      name: "April",
      code: "APR",
      id: "04",
    },
    {
      name: "May",
      code: "MAY",
      id: "05",
    },
    {
      name: "June",
      code: "JUN",
      id: "06",
    },
    {
      name: "July",
      code: "JUL",
      id: "07",
    },
    {
      name: "August",
      code: "AUG",
      id: "08",
    },
    {
      name: "September",
      code: "SEP",
      id: "09",
    },
    {
      name: "October",
      code: "OCT",
      id: "10",
    },
    {
      name: "November",
      code: "NOV",
      id: "11",
    },
    {
      name: "December",
      code: "DEC",
      id: "12",
    },
  ];

  useEffect(() => {
    dispatch(
      SET_PAYMENT_DETAILS({ ...paymentDetails, ...dropdownSelectedData, ...values, cardType })
    );
  }, [dropdownSelectedData, values, cardType]);

  // Get List of Years
  const singleYear = new Date().getFullYear();
  const yearList = Array.from(new Array(11), (val, index) => ({ year: singleYear + index }));

  useEffect(() => {
    if (values?.cardNumber) setCardType(handleCardType(values?.cardNumber));
    else setCardType("");
  }, [values.cardNumber]);

  const validateCardExpiry = () => {
    const enteredMonth = Number(dropdownSelectedData?.month?.id);
    const enteredYear = dropdownSelectedData?.year?.year;
    if (enteredMonth && enteredYear) {
      const currentMonth = new Date().getMonth() + 1;

      // Check if the entered year is less than the current year
      if (enteredYear < singleYear) {
        return false; // Expired
      }

      // If the year is the current year, check the month
      if (enteredYear === singleYear && enteredMonth < currentMonth) {
        return false; // Expired
      }
    }
    return true;
  };

  return (
    <form>
      <div className="grid lg:grid-cols-12 gap-6 mt-5 checkout-credit-card">
        <div className="col-span-6 sm:col-span-12">
          <TextInput
            type="text"
            label="Credit Card Number"
            name="cardNumber"
            values={values}
            setvalues={setvalues}
            isRequired
            isClicked={paymentDetails?.clicked}
            formatCreditNumber
          />
        </div>
        <div className="col-span-3">
          <SelectOption
            label="Month"
            data={months}
            displayKey="code"
            placeholder="Month"
            setdropdownSelectedData={setdropdownSelectedData}
            dropdownSelectedData={dropdownSelectedData}
            name="month"
            isRequired
            isClicked={paymentDetails?.clicked}
          />
          {!validateCardExpiry() && (
            <p className="text-red-500 error-msg mt-2 text-[12px] font-normal capitalize">
              Incorrect credit card expiration date.
            </p>
          )}
        </div>

        <div className="col-span-3">
          <SelectOption
            label="Year"
            data={yearList}
            placeholder="Year"
            displayKey="year"
            setdropdownSelectedData={setdropdownSelectedData}
            dropdownSelectedData={dropdownSelectedData}
            name="year"
            isRequired
            isClicked={paymentDetails?.clicked}
          />
        </div>

        <div className="col-span-3 max-w-[90px]" title="Card Verification Number">
          <TextInput
            type="number"
            label="CVV"
            name="cvv"
            values={values}
            setvalues={setvalues}
            isRequired
            isClicked={paymentDetails?.clicked}
            validCvvError={validCvvError}
            setValidCvvError={setValidCvvError}
          />
        </div>
        <div className="col-span-2 flex justify-center pt-[10px]">
          <div
            role="link"
            tabIndex="0"
            className="relative text-[#850002] whitespace-pre inline-block items-center group  text-[14px] ml-2.5 focus:text-[#a80f16] underline cursor-pointer mt-[25px]"
          >
            What is this?
            <div className="absolute z-10 mb-6 leading-[1.4] border-[1px] font-normal border-[#bbb] border-solid text-xs w-[250px] md:w-[300px] h-[140px] md:h-[160px] py-[12px] px-[16px] text-[#333] whitespace-pre-wrap bg-skin-inverted hidden group-hover:justify-center group-hover:items-center group-hover:flex group-focus:flex top-9 lg:-top-1 -right-3 lg:translate-x-[99%] before:content-[''] before:absolute before:top-0 lg:before:top-4 before:left-[88.5%] lg:before:-left-[2.0%] before:-translate-y-1/2 before:w-2 before:h-2 before:bg-skin-inverted before:border-[1px] before:border-[#bbb] before:border-t  before:border-r-0  before:border-b-0 before:border-l lg:before:border-t-0  lg:before:border-r-0 lg:before:border-b lg:before:border-l before:rotate-45">
              <span className="relative overflow-hidden w-full h-full px-1.5 py-1">
                <ImageTag
                  layout="fill"
                  objectFit="contain"
                  width={450}
                  height={225}
                  src="/assets/cvv.png"
                  alt="Card Verification Number Visual Reference"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
