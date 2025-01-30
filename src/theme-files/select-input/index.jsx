import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import Label from "../label";

export default function SelectInput({
  label,
  data,
  displayKey,
  setdropdownSelectedData,
  dropdownSelectedData,
  name,
  placeholder,
  isRequired,
  isClicked,
}) {
  const [query, setQuery] = useState("");
  const history = useRouter();
  const { pathname } = history;
  const filtered =
    query === ""
      ? data
      : data?.filter((option) =>
          option[displayKey]
            ?.toLowerCase()
            ?.replace(/\s+/g, "")
            ?.includes(query?.toLowerCase()?.replace(/\s+/g, ""))
        );
  return (
    <div>
      {label ? (
        <Label
          htmlFor="mobile"
          className="block text-[13px] font-semibold text-skin-base capitalize"
        >
          {label} {isRequired && <span className="text-red-500"> *</span>}
        </Label>
      ) : null}
      <div>
        <Combobox
          // value={dropdownSelectedData}
          onChange={(e) => {
            setdropdownSelectedData({ ...dropdownSelectedData, [name]: e });
          }}
        >
          <div className="relative mt-1">
            <div className="relative w-full mb-2 cursor-default overflow-hidden bg-white text-left sm:text-sm">
              <Combobox.Input
                onChange={(event) => setQuery(event.target.value)}
                placeholder={placeholder || null}
                className={`${
                  dropdownSelectedData[name] &&
                  displayKey &&
                  !dropdownSelectedData[name][displayKey]
                    ? " text-gray-400 bg-white"
                    : null
                } ${
                  pathname === "/account/add-address" || pathname === "/account/edit-address"
                    ? "theme-1 mt-1 block w-full border-b border-[#c1c1c1] py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    : "mt-1 block w-full border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A80F16] focus:border-[#A80F16] text-sm placeholder:text-skin-base"
                } `}
                displayValue={() =>
                  dropdownSelectedData[name] && displayKey
                    ? dropdownSelectedData[name][displayKey]
                    : dropdownSelectedData[name]
                }
                name={name}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </Combobox.Button>
            </div>
            {isRequired && !dropdownSelectedData[name] && isClicked ? (
              <p className="text-red-500 error-msg text-[10px] font-medium capitalize">
                required field
              </p>
            ) : null}
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                {filtered?.length
                  ? filtered?.map((option) => (
                      <Combobox.Option
                        key={option[displayKey]}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-[#A80F16] text-white" : "text-gray-900"
                          }`
                        }
                        value={option}
                      >
                        {({ active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                dropdownSelectedData[name] &&
                                ((displayKey &&
                                  dropdownSelectedData[name][displayKey] === option[displayKey]) ||
                                  dropdownSelectedData[name] === option)
                                  ? "font-medium"
                                  : "font-normal"
                              }`}
                            >
                              {displayKey ? option[displayKey] : option}
                            </span>
                            {dropdownSelectedData[name] &&
                            ((displayKey &&
                              dropdownSelectedData[name][displayKey] === option[displayKey]) ||
                              dropdownSelectedData[name] === option) ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-[#A80F16]"
                                }`}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  : null}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </div>
  );
}
SelectInput.defaultProps = {
  label: "",
  data: [],
  displayKey: "",
  dropdownSelectedData: {},
  name: "",
  placeholder: "",
  isRequired: false,
  isClicked: false,
};
SelectInput.propTypes = {
  label: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({ data: PropTypes.string })),
  displayKey: PropTypes.string,
  setdropdownSelectedData: PropTypes.func.isRequired,
  dropdownSelectedData: PropTypes.objectOf(PropTypes.shape({ data: PropTypes.string })),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  isClicked: PropTypes.bool,
};
