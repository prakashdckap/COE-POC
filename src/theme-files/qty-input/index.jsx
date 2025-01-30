import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Label from "../label";
import { useEffect } from "react";

function QtyInput({ qty, setqty, quickView }) {
  const history = useRouter();
  const Increment = () => {
    setqty((q) => q + 1);
  };

  const Decrement = () => {
    if (qty - 1 && qty > 0) setqty((q) => q - 1);
  };

  const handelQtyField = (e) => {
    let quantity = parseInt(e.target.value, 10);
    setqty(quantity);
  };

  useEffect(() => {
    if (history?.query?.isWishlist || history?.query?.isEditCart) {
      setqty(Number(history?.query?.qty));
    }
  }, [history?.query?.isWishlist, history?.query?.isEditCart]);

  return (
    <div
      className={`${
        quickView ? "justify-start" : "justify-center mt-8"
      } w-full flex md:justify-start`}
    >
      <div className="custom-number-input flex flex-row items-center">
        <Label className="mr-3 text-[14px] font-bold">QTY</Label>
        <div className="flex flex-row  h-[42px] w-[150px] relative bg-transparent mt-1 border">
          <button
            type="button"
            onClick={Decrement}
            className="bg-skin-inverted text-[12px] font-normal text-[#717070] hover:text-skin-inverted hover:bg-skin-button-secondary h-full w-20  outline-none"
            title="Decrease"
            aria-label="Decrease quantity"
          >
            <span className="m-auto text-2xl font-thin">−</span>
          </button>
          <input
            onChange={(e) => handelQtyField(e)}
            onBlur={() => !qty && setqty(1)}
            type="number"
            className="outline-none text-[12px] focus:outline-none text-center w-full bg-skin-inverted font-semibold text-md hover:text-black focus:text-black flex items-center text-[#1b1b1b]  outline-none"
            name="custom-input-number"
            value={qty}
            title="quantity"
          />
          <button
            type="button"
            onClick={Increment}
            className="bg-skin-inverted text-[12px] font-normal text-[#717070] hover:text-skin-inverted hover:bg-skin-button-secondary h-full w-20"
            title="Increase"
            aria-label="Increase quantity"
          >
            <span className="m-auto text-2xl font-thin">+</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default QtyInput;
QtyInput.propTypes = {
  qty: PropTypes.string.isRequired,
  setqty: PropTypes.string.isRequired,
};
