import { useSelector } from "react-redux";
import Heading from "../../../../../theme-files/heading";
import Paragraph from "../../../../../theme-files/paragraph";

function AgeVarificationCheck({ toggleAgeCheck, ageVerificationCheck, loading }) {
  const { nonVapeFlag } = useSelector((state) => state.cartDetails || {});

  return (
    <>
      <Heading className="uppercase pb-[10px] font-semibold text-lg border-b-[1px] border-[#d9d9d9]">
        Age Verification / Complete your order
      </Heading>
      <Paragraph className="my-[10px] text-[13px] text-[#292c2d] mb-[18px]">
        Element Vape has partnered up with Veratad Technologies Age Verification, an industry leader
        in age verification that uses billions of records from trusted and secured sources to ensure
        that all customers meet the legal smoking age. The information submitted are secured and
        will not be shared nor accessible. It is our job to ensure that you receive your packages in
        the timely manner. If we are unable to verify your age, we will contact you immediately for
        further verification.
      </Paragraph>
      {!nonVapeFlag ? (
        <div className="col-span-6 mb-[10px] flex">
          <label
            htmlFor="age-verification-checkbox"
            className="containercheckbox"
          >
            <input
              type="checkbox"
              className="mr-2 h-[13px] w-[13px]"
              id="age-verification-checkbox"
              onClick={toggleAgeCheck}
              disabled={loading}
              checked={ageVerificationCheck}
              tabIndex="-1"
              role="checkbox"
              aria-label="I am of legal smoking age (21 and over in the U.S.) in the jurisdiction which I reside"
            />
            <span
              className="checkbox-checkmark rounded-sm"
              tabIndex="0"
              role="checkbox"
              aria-checked={ageVerificationCheck}
              aria-label="I am of legal smoking age (21 and over in the U.S.) in the jurisdiction which I reside"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  toggleAgeCheck();
                  e.preventDefault(); // Prevents scrolling on Space
                }
              }}
            />
          </label>
          <div className="text-[333] text-[14px] -mt-[4px]">
            I am of legal smoking age (21 and over in the U.S.) in the jurisdiction which I reside.
          </div>
        </div>
      ) : null}
    </>
  );
}

export default AgeVarificationCheck;
