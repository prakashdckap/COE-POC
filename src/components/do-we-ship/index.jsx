import { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/solid";

import Input from "../../theme-files/input-text";
import ModalSuccess from "../../theme-files/modal/success";
import ModalFailure from "../../theme-files/modal/failure";
import Paragraph from "../../theme-files/paragraph";
import Link from "../../theme-files/link/index";
import InputEmail from "../../theme-files/input-email";
import InputCheckbox from "../../theme-files/input-checkbox";
import Label from "../../theme-files/label";
import { AxiosGraphQL } from "../../helper/axios/index";
import LoadingSpinner from "../../helper/loading-spinner";

export default function DoWeShip() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorBoxOpen, setErrorBoxOpen] = useState(false);
  const [zipcode, setZipcode] = useState("");
  const handleInputChange = (event) => {
    setZipcode(event.target.value.replace(/\D/g, ""));
    return true;
  };
  const onSearch = async () => {
    setLoading(true);
    setError(false);
    if (zipcode.length > 0) {
      const regex = /^\d+$/;

      if (!zipcode || regex.test(zipcode) === false) {
        setLoading(false);
        setError(true);
      } else {
        const response = await AxiosGraphQL("do-we-ship", { zipcode: zipcode });
        if (response.doWeShip && response) {
          setOpen(true);
          setLoading(false);
        } else {
          setErrorBoxOpen(true);
          setLoading(false);
        }
      }
    } else {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <div className="mt-10 text-2xl text-center leading-7 text-gray-900 sm:text-3xl sm:truncate">
        <h2 className="text-2xl text-gray-900">DO WE SHIP TO YOU?</h2>
      </div>
      <div className="container mx-auto mb-10 bg-white mt-3 grid grid-cols-1 gap-6 sm:px-6 lg:grid-flow-col-dense lg:grid-cols-5">
        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
          <div className="mx-auto w-full lg:w-full shadow p-10 border">
            <form className="space-y-6 px-20">
              <h2 className="text-2xl text-gray-900">CHECK YOUR ZIP CODE</h2>
              <Input
                id="zipcode"
                name="zipcode"
                placeholder="Zipcode"
                onChange={handleInputChange}
                value={zipcode}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                Enter your zipcode
              </Input>
              <small
                className={error ? "text-xs text-red-900 show" : "text-xs text-red-900 hidden"}
              >
                Enter a valid zipcode.
              </small>
              <div className="text-center">
                <button
                  type="button"
                  onClick={onSearch}
                  className="inline-flex items-center px-10 py-2 border border-skin-secondary shadow-sm text-skin-inverted hover:text-skin-white bg-skin-button-secondary hover:bg-black"
                >
                  {loading ? <LoadingSpinner message="loading" /> : "Search"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="space-y-4 lg:col-start-3 lg:col-span-3">
          <Paragraph className="font-light text-sm">
            Please enter your Zip Code see if we currently deliver in your area!
          </Paragraph>
          <Paragraph className="font-light text-sm">
            Be sure to check your place of business, families, and friends as Adult Signature is
            required at delivery.
          </Paragraph>
          <Paragraph className="font-light text-sm">
            If your Zip Code is not available, please check in with us in a few weeks as our
            shipping coverage will increase weekly. Sign up to be notified as soon as your coverage
            changes!
          </Paragraph>
          <Paragraph className="font-bold text-sm">
            We have partner with PUDO to offer convenient Pick-Up option at a local business near
            you. This is available at checkout and provide additional shipping coverage throughout
            the U.S.
          </Paragraph>
          <Paragraph className="font-light text-sm">
            Due to shipping limitations and states law, we will not be able to serve customers
            throughout the US. If we are unable to ship to your State or local region, a
            notification will be indicated at checkout.
          </Paragraph>
          <Paragraph className="font-light text-sm">
            If you are located in the Western half of the continental US, estimated shipping time
            frame is 1 to 3 business days. For the rest of the country, it can take up to 20
            business days for deliveries as we&quot;re looking to improve the network.
          </Paragraph>
          <Paragraph className="font-light text-xs p-3 bg-gray-100">
            Please note: We are unable to ship <b>any</b> products to the following states due to
            State&quot;s Regulation: <b>Arkansas, Maine, Oregon, South Dakota, Utah, and Vermont</b>
          </Paragraph>
          <Paragraph className="font-light text-xs p-3 bg-gray-100">
            Please note: We are unable to ship <b>any</b> products to the following locations:{" "}
            <b>San Francisco, CA, and Anchorage, AK</b>
          </Paragraph>
        </div>
      </div>

      {errorBoxOpen ? (
        <ModalFailure open={errorBoxOpen} setOpen={setErrorBoxOpen}>
          <div className="text-center p-10">
            <Paragraph>Shipping Status for &quot;{zipcode}&quot;</Paragraph>
            <Paragraph className="text-2xl mt-3">
              We&apos;re sorry. We currently don&apos;t serve your Zip Code.
            </Paragraph>
            <div className="text-left">
              <Paragraph className="text-sm mt-3">
                Please check back with us in several weeks, as our team will continue to find
                solutions.
              </Paragraph>
              <Paragraph className="text-sm flex">
                <InformationCircleIcon className="h-5 w-5 text-gray-400" /> &nbsp; <b>Tip:</b>{" "}
                &nbsp; You can also try entering your business Zip Code.
              </Paragraph>
            </div>
          </div>
          <div className="bg-gray-100 p-10 ">
            <Paragraph className="text-xl">WANT TO KNOW ONCE YOUR REGION IS SERVED?</Paragraph>
            <Paragraph className="text-sm mt-3 mb-6">
              You can submit your email address below and we will contact you as soon as we can ship
              to your region
            </Paragraph>

            <Label className="checkbox-label">
              <InputCheckbox /> &nbsp; I certify that I am 21 years of age or older and have read
              and agree to be bound by the Terms and Conditions &amp; Privacy Policy.
            </Label>

            <div className="mt-5 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <div className="mt-1 text-left">
                  <InputEmail
                    name="email"
                    id="email"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    Email Address
                  </InputEmail>
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="mt-5">
                  <button
                    type="button"
                    className="inline-flex items-center px-10 py-2 border border-skin-secondary shadow-sm text-skin-inverted hover:text-skin-white bg-skin-button-secondary hover:bg-black"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalFailure>
      ) : (
        ""
      )}

      {open ? (
        <ModalSuccess open={open} setOpen={setOpen}>
          <div className="text-center p-10">
            <Paragraph className="text-sm">Shipping Status for &quot;{zipcode}&quot;</Paragraph>
            <Paragraph className="text-2xl mt-3">Great news!</Paragraph>
            <Paragraph className="text-2xl mb-5">We do ship to your Zip Code!</Paragraph>
            <Link
              href="/"
              className="w-full mt-5 text-sm items-center px-10 py-2 border border-skin-secondary shadow-sm text-skin-inverted hover:text-skin-primary bg-skin-button-secondary hover:border-black hover:text-black hover:bg-skin-button-secondary-hover"
            >
              SHOP NEW ARRIVALS
            </Link>
          </div>
        </ModalSuccess>
      ) : (
        ""
      )}
    </>
  );
}
