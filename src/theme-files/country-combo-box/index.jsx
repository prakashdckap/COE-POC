import { useQuery } from "@apollo/client";
import { Fragment, useState, useEffect } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import Label from "../label"
import GET_COUNTRIES_LIST from "./graphql";
import GET_REGION_LIST from "../region-combo-box/graphql";
import RegionComboBox from "../region-combo-box"

let CountriesList = [];

export default function CountriesComboBox() {
  
  CountriesList = useQuery(GET_COUNTRIES_LIST);

  CountriesList = (CountriesList.data !== undefined) ? CountriesList.data.countries : [{code: "US", name: "United States"}]
  
  const [selected, setSelected] = useState(CountriesList[0])
  const [query, setQuery] = useState('')
  
  const filteredCountriesList =
    query === ''
      ? CountriesList
      : CountriesList.filter((Country) =>
          (typeof Country.name === "string" ? 
            Country.name.toString()
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
            : ""
          )
        )

  const { data: countries, refetch } = useQuery(GET_REGION_LIST, {
    variables: { countryCode: selected.code },
  });
  
  useEffect(() => {
    refetch();
  }, [selected]);

  return (
    <>
      <div className="col-span-12">
        <Label htmlFor="mobile" className="block text-sm font-medium text-[#282828]">
            Country
        </Label>
        <div>
          <Combobox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className="theme-1 mt-1 block w-full border-b border-[#c1c1c1] py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  displayValue={(Country) => (Country !== undefined) ? Country.name : selected.name}
                  onChange={(event) => setQuery(event.target.value)}
                  name="countryCode"
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('')}
              >
                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredCountriesList.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-[#282828]">
                      Nothing found.
                    </div>
                  ) : (
                    filteredCountriesList.map((Country) => (
                      <Combobox.Option
                        key={Country.code}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-teal-600 text-white' : 'text-gray-900'
                          }`
                        }
                        value={Country}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {Country.name}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? 'text-white' : 'text-teal-600'
                                }`}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
      </div>
      
      {
        selected ? 
        <RegionComboBox REGIONLIST={(countries !== undefined) ? countries.countries : [{"name": "", "code": "0"}] }/>
        :
        ""
      }

    </>
  )
}
