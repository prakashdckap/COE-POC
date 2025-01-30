import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Paragraph from "../../../../theme-files/paragraph";
import TextInput from "../../../../theme-files/text-input";
import ZipSearch from "./zip-search";

function PickupLocally({ setchecked }) {
  const [values, setvalues] = useState({});
  const [error, seterror] = useState(false);
  const customerDetails = useSelector((state) => state.customerDetails);
  const customerAddressList = useSelector((state) => state.customerAddressList);
  const checkoutShippingAddress = useSelector((state) => state.checkoutShippingAddress);

  const phone = customerAddressList?.length ? customerAddressList[0]?.telephone : null;

  useEffect(() => {
    setvalues({
      ...values,
      firstName: customerDetails?.firstName,
      lastName: customerDetails?.lastName,
      phone: checkoutShippingAddress?.telephone || phone,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="py-[20px] px-[30px] border-[1px] border-[#dcdcdc] border-t-0 pickup-locally">
      <Paragraph className="text-skin-base mb-5 text-[13px]">
        Please ensure the legal name entered below matches the valid form of ID that will be
        presented on arrival of selected pick up location.
      </Paragraph>
      <div className="flex items-center justify-start" aria-label="Required field indicator">
        <span className="text-[#e02b27] pr-1 text-[14px]">*</span>{" "}
        <span className="text-[#282828] font-Montserrat font-normal leading-2 text-[13px]">
          Indicates a required field
        </span>
      </div>
      <div className="grid grid-cols-6 gap-3 mt-[10px]">
        <div className="col-span-6 lg:col-span-3 font-open-sans">
          <TextInput
            className="border border-[#979797]"
            type="text"
            label="Legal First Name"
            name="firstName"
            values={values}
            setvalues={setvalues}
            isRequired
            defaultValue={customerDetails?.firstName}
            isClicked={error}
          />
        </div>

        <div className="col-span-6 lg:col-span-3 font-open-sans">
          <TextInput
            type="text"
            label="Legal Last Name"
            name="lastName"
            values={values}
            setvalues={setvalues}
            isRequired
            isClicked={error}
          />
        </div>
        <div className="col-span-6 lg:col-span-3 font-open-sans">
          <TextInput
            type="text"
            label="Phone number"
            name="phone"
            values={values}
            setvalues={setvalues}
            toolTip
            isRequired
            placeholderColor
            placeholder="(XXX) XXX-XXXX"
            isClicked={error}
            formatNumber
          />
        </div>
      </div>
      <div className="col-span-6 my-3 font-open-sans">
        <ZipSearch inputValues={values} seterror={seterror} setchecked={setchecked} />
      </div>
    </div>
  );
}

export default PickupLocally;

PickupLocally.propTypes = {
  setchecked: PropTypes.func.isRequired,
};
