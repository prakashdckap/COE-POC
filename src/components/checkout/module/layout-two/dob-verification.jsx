import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import Paragraph from "../../../../theme-files/paragraph";
import UnorderedList from "../../../../theme-files/unordered-list";
import ListItem from "../../../../theme-files/list-item";
import TextInput from "../../../../theme-files/text-input";
import SelectOption from "../../../../theme-files/select-option";

export default function DobVerification({ isClicked, setdobValues, dobValues }) {
  const [dropdownSelectedData, setdropdownSelectedData] = useState({});
  const [values, setvalues] = useState({});
  const [daysArr, setdaysArr] = useState([]);
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

  // Get List of Years
  const singleYear = new Date().getFullYear();
  const yearList = Array.from(new Array(83), (val, index) => ({
    year: singleYear - (17 + index),
  }));

  // To get array of days
  const handleDays = (startDate, endDate) => {
    setdaysArr(
      Array(endDate - startDate + 1)
        .fill()
        .map((_, idx) =>
          (startDate + idx)?.toString().length === 1
            ? { day: `0${(startDate + idx)?.toString()}` }
            : { day: (startDate + idx)?.toString() }
        )
    );
  };

  // To check how many days are there in a month
  useEffect(() => {
    if (dropdownSelectedData?.year && dropdownSelectedData?.month?.id) {
      const year = dropdownSelectedData?.year;
      const month = dropdownSelectedData?.month?.id;

      let noOfDays = 0;

      if (month?.toString() === "02") {
        if (year % 4 === 0) {
          noOfDays = 29;
        } else {
          noOfDays = 28;
        }
      } else if (month?.toString() === "07" || month?.toString() === "08") {
        noOfDays = 31;
      } else if (
        month?.toString() === "04" ||
        month?.toString() === "06" ||
        month?.toString() === "09" ||
        month?.toString() === "11"
      ) {
        noOfDays = 30;
      } else {
        noOfDays = 31;
      }
      if (noOfDays) handleDays(1, noOfDays);
    }
  }, [dropdownSelectedData?.year, dropdownSelectedData?.month]);

  // Setting the input data inside dob object and passing it to the parent component
  useEffect(() => {
    const { year, month, day } = dropdownSelectedData;
    if (year?.year && month?.id && day?.day) {
      setdobValues({
        dob: year.year.toString() + month?.id?.toString() + day?.day?.toString(),
        ssn: values.ssn,
      });
    } else {
      setdobValues({ ...dobValues, dob: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownSelectedData, values]);

  return (
    <div className="col-span-6">
      <div className=" mt-5 bg-[#fff7f6] p-5">
        <div className="flex">
          <ExclamationCircleIcon className="h-5 w-10 text-[#A80F16] mr-3 " />

          <Paragraph className="text-[#A80F16] text-[13px]">
            Unfortunately, Element Vape was unable to verify your age using the information
            provided. You must be of legal smoking age (21 and over in the U.S.) to purchase.
            <Paragraph className="mt-3 text-[13px]">
              To increase your chances of being verified, please provide accurate details of the
              following and try again:
            </Paragraph>
          </Paragraph>
        </div>

        <UnorderedList className="text-[#A80F16] mt-5 text-[13px] pl-5">
          <div className="flex">
            <span className="mr-2">-</span>
            <ListItem>Full Name (do not use nicknames)</ListItem>
          </div>

          <div className="flex">
            <span className="mr-2">-</span>

            <ListItem>Correct Billing/Shipping Address</ListItem>
          </div>

          <div className="flex">
            <span className="mr-2">-</span>

            <ListItem> Date of Birth</ListItem>
          </div>

          <div className="flex">
            <span className="mr-2">-</span>

            <ListItem>Last 4 Digits of your SSN</ListItem>
          </div>

          <Paragraph className="mt-3">All information is kept private.</Paragraph>
        </UnorderedList>
      </div>

      <form className="grid lg:grid-cols-12 gap-6 border border-[#bfbfbf] p-[25px] mt-[20px] checkout-dob">
        <div className="col-span-4">
          <SelectOption
            label="Birth Year"
            data={yearList}
            displayKey="year"
            placeholder="YYYY"
            setdropdownSelectedData={setdropdownSelectedData}
            dropdownSelectedData={dropdownSelectedData}
            name="year"
            isRequired
            isClicked={isClicked}
          />
        </div>

        <div className="col-span-4">
          <SelectOption
            label="Birth Month"
            data={months}
            placeholder="MM"
            displayKey="id"
            setdropdownSelectedData={setdropdownSelectedData}
            dropdownSelectedData={dropdownSelectedData}
            name="month"
            isRequired
            isClicked={isClicked}
          />
        </div>

        <div
          className={`col-span-4  ${
            !dropdownSelectedData?.month?.id || !dropdownSelectedData?.year
              ? "opacity-50 pointer-events-none"
              : null
          }`}
        >
          <SelectOption
            label="Birth Day"
            data={daysArr}
            displayKey="day"
            placeholder="DD"
            setdropdownSelectedData={setdropdownSelectedData}
            dropdownSelectedData={dropdownSelectedData}
            name="day"
            isRequired
            isClicked={isClicked}
          />
        </div>

        <div className="col-span-12">
          <TextInput
            type="number"
            label="Last 4 Digits of SSN (Optional)"
            name="ssn"
            values={values}
            setvalues={setvalues}
            // isRequired
            placeholder="Last 4 Digits of SSN (Optional)"
            // isClicked={paymentDetails?.clicked}
          />
        </div>
      </form>
    </div>
  );
}

DobVerification.defaultProps = {
  setdobValues: {},
  isClicked: false,
  dobValues: "",
};
DobVerification.propTypes = {
  dobValues: PropTypes.string,
  setdobValues: PropTypes.shape({
    dob: PropTypes.string,
    ssn: PropTypes.string,
  }),
  isClicked: PropTypes.bool,
};
