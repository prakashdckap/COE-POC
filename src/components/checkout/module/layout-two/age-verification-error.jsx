import { Fragment } from "react";
import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import Paragraph from "../../../../theme-files/paragraph";
import Heading from "../../../../theme-files/heading";

function AgeVerificationError({ open, setOpen, message, title }) {
  return (
    <Dialog
      as="div"
      className="fixed z-[99999] inset-0 overflow-y-auto"
      onClose={() => {}}
      open={open}
    >
      <div className="flex text-center md:block md:px-2 lg:px-4">
        <div
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          role="region"
          aria-label="Notification"
        >
          <Dialog.Overlay
            className="hidden fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity md:block"
            style={{ display: "block" }}
          />
        </div>
        <span className="" aria-hidden="true">
          &#8203;
        </span>
        <div
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          enterTo="opacity-100 translate-y-0 md:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 md:scale-100"
          leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
        >
          <div className="flex text-base justify-center text-left transform transition w-full md:inline-block md:px-4 md:my-8 md:align-middle mt-6 md:max-w-md">
            <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-10 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-4 w-4/5 md:w-auto">
              <button
                type="button"
                className="absolute top-4 right-4 text-gray-400 hover:text-black sm:top-8 sm:right-6 md:top-4 md:right-4"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close</span>
                <XIcon className="h-7 w-7" aria-hidden="true" />
              </button>
              <div className="w-full my-2" role="alert">
                <Heading className="text-center text-[20px] font-semibold mt-2">
                  {title || "RESTRICTED"}
                </Heading>
                <div className="mt-4 border-t border-[#ddd]" />
                <Paragraph className="text-center text-[15px] font-medium mt-4 w-full whitespace-pre-line px-[1.25rem] leading-6">
                  {message
                    ? message
                    : `Due to your local rules and regulations, we are unable to process or ship
                  nicotine-containing vapor products to your destination at this time. Please remove
                  these products from your cart to continue. We appreciate your cooperation.`}
                </Paragraph>
                <div className="flex justify-center pb-2">
                  <button
                    onClick={() => setOpen(false)}
                    type="button"
                    className="mt-4 bg-skin-secondary uppercase border border-transparent py-2 px-6 text-sm font-medium text-skin-inverted hover:text-skin-primary hover:border-skin-secondary hover:bg-skin-inverted"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

function formatDateToYYYYMMDD(dob) {
  const year = dob?.slice(0, 4) || 0;
  const month = dob?.slice(4, 6) || 0;
  const day = dob?.slice(6, 8) || 0;

  // Construct the formatted date
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function validateAge(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(formatDateToYYYYMMDD(dateOfBirth));

  // Calculate the age in years
  let age = today.getFullYear() - birthDate.getFullYear();

  // Check if the birth month and day have already occurred this year
  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();
  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    age--; // Adjust age if birthdate hasn't occurred yet this year
  }

  // Calculate the remaining months and days
  const remainingMonths = (12 + currentMonth - birthMonth) % 12;
  const remainingDays = currentDay - birthDay;

  // Check if selected age is at least 21
  if (age >= 21) {
    console.log("Valid: The person is at least 21 years old.");
    return true;
  } else {
    console.log("Invalid: The person is under 21 years old.");
    return false;
  }
}

export default AgeVerificationError;
