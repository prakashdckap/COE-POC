import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import SezzleModalContent from "./SezzlePayModel";

function SezzlePay({ grandTotal }) {
  const [installPayment, setInstallPaylemnt] = useState("0.00");
  const [openSezzlePop, setOpenSezzlePop] = useState(false);

  useEffect(() => {
    if (grandTotal) {
      const amount = ((grandTotal || 0) / 4).toFixed(2);
      setInstallPaylemnt(amount);
    }
  }, [grandTotal]);

  const addWeeks = (weeks = 1, date = new Date()) => {
    date.setDate(date.getDate() + weeks * 7);

    return months[date.getMonth()].code + " " + date.getDate();
  };

  return (
    <div className="bg-gray-100 text-xs py-3 flex justify-center">
      <div className="sezzle-container">
        <div
          className="w-full flex justify-center text-xs pb-1"
          style={{ fontFamily: "Comfortaa" }}
        >
          4 interest-free payments over 6 weeks{" "}
          <button type="button" className="pl-1" onClick={() => setOpenSezzlePop(!openSezzlePop)}>
            {" "}
            ⓘ
          </button>
        </div>
        <div className="sezzle-payment-pie" />
        <div className="w-full flex justify-center text-xs pt-2">
          <div
            style={{ maxWidth: 290, minWidth: 290, justifyContent: "space-around" }}
            className="flex"
          >
            <span className="inline-block">
              <p className="sezzle-amount">${installPayment}</p>
              <p className="sezzle-payment-date">Today</p>
            </span>
            <span className="inline-block">
              <p className="sezzle-amount">${installPayment}</p>
              <p className="sezzle-payment-date">{addWeeks(2)}</p>
            </span>
            <span className="inline-block">
              <p className="sezzle-amount">${installPayment}</p>
              <p className="sezzle-payment-date">{addWeeks(4)}</p>
            </span>
            <span className="inline-block">
              <p className="sezzle-amount">${(grandTotal - installPayment * 3).toFixed(2)}</p>
              <p className="sezzle-payment-date">{addWeeks(6)}</p>
            </span>
          </div>
        </div>
        <SezzleModalContent isOpen={openSezzlePop} onClose={() => setOpenSezzlePop(false)} />
      </div>
    </div>
  );
}

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
SezzlePay.propTypes = {
  grandTotal: PropTypes.number.isRequired,
};

export default SezzlePay;
