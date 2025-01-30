import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { SET_SELECTED_STATE } from "../../redux/actions";

function SelectOption({
  label,
  data,
  setdropdownSelectedData,
  dropdownSelectedData,
  displayKey,
  name,
  placeholder,
  isRequired,
  isClicked,
  showPrice,
  AddToTotalPrice,
  className,
  setvalues,
  values,
  setClearRegion,
}) {
  const history = useRouter();
  const dispatch = useDispatch();
  const customerDetails = useSelector((state) => state.customerDetails);
  const { pathname } = history;
  return (
    <div className="w-full">
      <Listbox
        value={() =>
          dropdownSelectedData[name] && displayKey
            ? `${dropdownSelectedData[name][displayKey]} ${
                showPrice ? `($  ${dropdownSelectedData[name]?.optionPrice?.value})` : ""
              }`
            : dropdownSelectedData[name]
        }
        name={name}
        onChange={(e) => {
          let obj = { ...dropdownSelectedData };

          if (e) obj = { ...obj, [name]: e };
          else obj = { ...obj, [name]: null };
          setdropdownSelectedData({ ...obj });
          if (setClearRegion) {
            setClearRegion(false);
          }

          dispatch(SET_SELECTED_STATE({ ...obj }));
          if (setvalues) {
            setvalues({
              ...values,
              firstName: customerDetails?.firstName,
              lastName: customerDetails?.lastName,
            });
          }
        }}
      >
        <div className="relative">
          {label ? (
            <Listbox.Label className="block text-[13px] font-semibold text-skin-base capitalize">
              {label} {isRequired && <span className="text-red-500"> *</span>}
            </Listbox.Label>
          ) : (
            ""
          )}

          <Listbox.Button
            className={`${
              dropdownSelectedData[name] && displayKey && !dropdownSelectedData[name][displayKey]
                ? " text-gray-400 bg-white"
                : null
            } ${
              pathname === "/account/add-address" || pathname === "/account/edit-address"
                ? "theme-1 mt-1 block w-full border-b border-gray-300 py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                : "mt-1  w-full border border-gray-300 shadow-sm py-2 px-3 focus:outline-[0.5px] focus:outline-[#A80F16] focus:ring-[#A80F16] focus:border-[#A80F16] text-sm placeholder:text-skin-base flex items-center justify-between"
            } bg-white`}
          >
            <span className="float-left block truncate">
              {dropdownSelectedData[name] ? (
                dropdownSelectedData[name] && displayKey ? (
                  `${dropdownSelectedData[name][displayKey]} ${
                    showPrice ? `($  ${dropdownSelectedData[name]?.optionPrice?.value})` : ""
                  }`
                ) : (
                  `${dropdownSelectedData[name]} ${
                    showPrice ? `($  ${dropdownSelectedData[name]?.optionPrice?.value})` : ""
                  }`
                )
              ) : (
                <span className="text-gray-500">{placeholder}</span>
              )}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000"
              className="h-3 w-3"
              viewBox="0 0 512 512"
            >
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={`absolute mt-1 max-h-60 shadow-lg w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50 ${className}`}
            >
              <Listbox.Option
                className={({ active }) =>
                  `relative cursor-default select-none py-2 hover:bg-skin-primary hover:text-skin-inverted pl-3 pr-4 ${
                    active ? "text-gray-900" : "text-gray-900"
                  }`
                }
                value=""
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate hover:text-skin-inverted text-gray-500 ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {placeholder}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
              {data?.map((option) => (
                <Listbox.Option
                  key={option[displayKey]}
                  className={({ active }) =>
                    `relative cursor-default select-none hover:bg-skin-primary hover:text-skin-inverted py-2 pl-3 pr-4 ${
                      active ? "text-gray-900" : "text-gray-900"
                    }`
                  }
                  value={{ ...option, skip: AddToTotalPrice }}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                      >
                        {displayKey
                          ? `${option[displayKey]} ${
                              showPrice ? ` ( $${option?.optionPrice?.value} )` : ""
                            }`
                          : option.optionName}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
          {isRequired && !dropdownSelectedData[name] && isClicked ? (
            <p className="text-red-500 error-msg mt-2 text-[12px] font-medium capitalize">
              required field
            </p>
          ) : (
            ""
          )}
        </div>
      </Listbox>
    </div>
  );
}

SelectOption.defaultProps = {
  label: "",
  data: [],
  displayKey: "",
  dropdownSelectedData: {},
  name: "",
  placeholder: "",
  isRequired: false,
  isClicked: false,
  showPrice: false,
  AddToTotalPrice: false,
};

SelectOption.propTypes = {
  label: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({ data: PropTypes.string })),
  displayKey: PropTypes.string,
  setdropdownSelectedData: PropTypes.func.isRequired,
  dropdownSelectedData: PropTypes.objectOf(PropTypes.shape()),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  isClicked: PropTypes.bool,
  showPrice: PropTypes.bool,
  AddToTotalPrice: PropTypes.bool,
};

export default SelectOption;
