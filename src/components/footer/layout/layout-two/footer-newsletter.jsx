import { useState } from "react";
import { useDispatch } from "react-redux";
import Heading from "../../../../theme-files/heading";
import SubHeading from "../../../../theme-files/sub-heading";
import { SET_NOTIFICATION } from "../../../../redux/actions";
import { AxiosGraphQL } from "../../../../helper/axios/index";

function FooterNewsletter() {
  const dispatch = useDispatch();
  const [email, setemail] = useState("");
  const [isrequired, setisrequired] = useState(false);

  const handleChange = (event) => {
    setemail(event.target.value);
  };

  const emailSubscription = async () => {
    setisrequired(false);
    const response = await AxiosGraphQL("newsletter-subscription", {
      emailId: email,
    });
    if (response?.errors && response?.errors?.length) {
      setemail("");
      dispatch(
        SET_NOTIFICATION({
          status: true,
          message: response?.errors[0]?.message,
          type: "error",
        })
      );
    } else {
      setemail("");
      dispatch(
        SET_NOTIFICATION({
          status: true,
          message: "Thank you for your subscription.",
          type: "success",
        })
      );
    }
  };

  return (
    <div className="container mx-auto bg-black p-[20px]">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="mb-5 md:mb-0">
          <Heading className="text-skin-inverted font-semibold text-[14px] md:-mb-[1px]">
            NEWSLETTER
          </Heading>
          <SubHeading className="text-skin-inverted text-[13px] font-normal md:pb-[7px]">
            Get special offers and find out what’s new in the store. Sign up for the EV newsletter.
          </SubHeading>
        </div>
        <div className="md:w-[97.5%] md:px-[5px] md:mt-[1px]">
          <label htmlFor="email" className="relative text-skin-inverted flex items-center mb-1">
            <div className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2">
              <svg
                className="h-[17px] w-[17px] ml-[14px]"
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                strokeWidth="0.5"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
              </svg>
            </div>
            {/* <MailIcon className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 " /> */}
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              value={email}
              placeholder="Enter your email address"
              autoComplete="off"
              className="px-10 h-10 form-input w-full bg-transparent border-b border-white text-skin-inverted outline-0 text-xs placeholder:text-skin-inverted"
            />
            <button
              onClick={() => {
                if (email) emailSubscription();
                else setisrequired(true);
              }}
              type="button"
              className="-translate-x-5 cursor-pointer"
              aria-label="Subscribe News leters"
            >
              <svg
                className="w-5 h-5 hover:-translate-x-2 transition ease-in duration-300 fill-[#fff]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
              </svg>
            </button>
          </label>
          {isrequired ? (
            <p className="text-[13px] text-[#e02b27]">This is a required field.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default FooterNewsletter;
