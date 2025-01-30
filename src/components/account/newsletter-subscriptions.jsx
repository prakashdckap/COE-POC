import { Switch } from "@headlessui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { ReplyIcon } from "@heroicons/react/outline";
import { SET_NOTIFICATION } from "../../redux/actions";
import Label from "../../theme-files/label";
import useNewsletterSubscription from "../../helper/hooks/customer/use-newsletter-subscription";

export default function MyPrivacySettings() {
  const history = useRouter();
  const dispatch = useDispatch();
  const [enabled, setEnabled] = useState(false);
  const newsletterSubcription = useSelector((state) => state.newsletterSubcription);
  const { handleNewsletterSubscription } = useNewsletterSubscription();

  const handleNewsletter = () => {
    const data = {
      customerDetails: {
        subscribe: enabled,
      },
    };

    handleNewsletterSubscription(data, setEnabled);
    history.push("/account");
    setTimeout(() => {
      dispatch(
        SET_NOTIFICATION({
          status: true,
          message: enabled
            ? "We have saved your newsletter subscription."
            : "We have removed your newsletter subscription.",
          type: "success",
        })
      );
    }, 2000);
  };

  useEffect(() => {
    setEnabled(newsletterSubcription);
  }, [newsletterSubcription]);

  return (
    <div className="py-0 md:py-6 lg:col-span-9">
      <div className="px-4 p-6 lg:pb-8 border border-[#ebebeb]">
        <div className="w-full border-b-2 pb-5">
          <h3 className="text-gray-900 text-lg font-normal truncate">SUBSCRIPTION OPTION</h3>
        </div>
        <div>
          <Label
            htmlFor="proceed-checkbox-input"
            className="block text-base font-normal text-gray-700 py-3"
          >
            <Switch
              checked={enabled}
              onChange={() => setEnabled(!enabled)}
              className={`${enabled ? "bg-black" : "bg-gray-400"}
          relative inline-flex h-[16px] w-[32px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${enabled ? "translate-x-4" : "translate-x-0"}
            pointer-events-none inline-block h-[12px] w-[12px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
            &nbsp; General Subscription
          </Label>
          <div className="pt-1 divide-y divide-gray-200">
            <div className="mt-12 px-0 block md:flex justify-between ">
              <button
                onClick={() => handleNewsletter()}
                type="button"
                className="w-full md:w-auto mb-[10px] md:mb-0 md:inline-flex items-center px-3 py-2 h-8 text-sm border border-[#a80f16] shadow-sm text-skin-inverted hover:text-skin-primary bg-[#a80f16] ease-in-out duration-300 hover:border-black hover:text-black hover:bg-skin-button-secondary-hover"
              >
                Save
              </button>
              <button
                onClick={() => history.push("/account")}
                type="button"
                className="w-full md:w-auto md:inline-flex items-center px-3 py-2 h-8 text-sm border border-[#a80f16] shadow-sm text-skin-inverted hover:text-skin-primary bg-[#a80f16] ease-in-out duration-300 hover:border-black hover:text-black hover:bg-skin-button-secondary-hover"
              >
                <i className="h-5 w-4 inline-block align-middle">
                  <ReplyIcon />
                </i>{" "}
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
