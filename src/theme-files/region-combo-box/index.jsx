import { Fragment, useState } from 'react'
import PropTypes from "prop-types";
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

import Label from "../label"

function CountriesComboBox({ REGIONLIST }) {
    if(REGIONLIST?.length > 0)
    {
        const [RegionSelected, setRegionSelected] = useState(REGIONLIST[0])
        const [RegionQuery, setRegionQuery] = useState('')
        
        const filteredREGIONLIST =
            RegionQuery === ''
            ? REGIONLIST
            : REGIONLIST.filter((region) =>
                (typeof region.name === "string" ? 
                region.name.toString()
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(RegionQuery.toLowerCase().replace(/\s+/g, ''))
                    : ""
                )
                )

        return (
            <div className="col-span-12">
                <Label htmlFor="mobile" className="block text-sm font-medium text-[#282828]">
                    Region
                </Label>
                <div>
                <Combobox value={RegionSelected} onChange={setRegionSelected}>
                    <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        
                        <Combobox.Input
                        className="theme-1 mt-1 block w-full border-b border-[#c1c1c1] rounded-md py-2 px-3 sm:text-sm"
                        displayValue={(region) => (region !== undefined) ? region.name : "" }
                        onChange={(event) => setRegionQuery(event.target.value)}
                        name="regionCode"
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
                        afterLeave={() => setRegionQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredREGIONLIST.length === 0 && RegionQuery !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            Nothing found.
                            </div>
                        ) : (
                            filteredREGIONLIST.map((region) => (
                            <Combobox.Option
                                key={region.code}
                                className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                }`
                                }
                                value={region}
                            >
                                {({ RegionSelected, active }) => (
                                <>
                                    <span
                                    className={`block truncate ${
                                        RegionSelected ? 'font-medium' : 'font-normal'
                                    }`}
                                    >
                                    {region.name}
                                    </span>
                                    {RegionSelected ? (
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
            
        )
    }
    return <></>
}


CountriesComboBox.defaultProps = {
    REGIONLIST: ""
  };
  
  CountriesComboBox.propTypes = {
    REGIONLIST: PropTypes.string,
  };
  
  export default CountriesComboBox;