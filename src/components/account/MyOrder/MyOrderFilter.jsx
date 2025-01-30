import { useSelector } from "react-redux";

import FilterTextInput from "../../../theme-files/text-input/filter-input";
import { decodeJWT } from "../helper";
import { orderFilterKey } from "./orderHelper";
import FilterForm from "./FilterForm";

function OrderFilter({ filter, setShowFilter, showFilter, filterData, setFilterData }) {
  const customerToken = useSelector((state) => state.customerToken);

  const toggleFilter = () => setShowFilter(!showFilter);

  const clearFilter = () => {
    setShowFilter(false);
    filter({});
    setFilterData({});
  };

  const applyFilter = () => {
    setShowFilter(false);

    if (Object.keys(filterData).length !== 0) {
      filter({
        ...filterData,
        createdby: decodeJWT(customerToken),
      });
    }
  };

  return (
    <div className="filter-order pb-[10px]">
      <div className="flex justify-between">
        <div className="justify-start">
          <FilterTextInput
            type="text"
            placeholder="Search by SKU or Product Name"
            label=""
            search
            name={orderFilterKey.namesku}
            values={filterData}
            setvalues={setFilterData}
            filter={applyFilter}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={toggleFilter}
            className="close-btn items-center px-3 py-1 text-sm border border-[#000] shadow-sm hover:text-skin-primary align-middle ease-in-out duration-300 hover:text-white hover:bg-black hover:border-white"
          >
            {showFilter ? "CLOSE" : "FILTER"}
          </button>
        </div>
      </div>

      {showFilter && (
        <div className="order-filter-all">
          <FilterForm filterData={filterData} setFilterData={setFilterData} />
          <div className="">
            <div className="flex flex-row-reverse">
              <button
                type="button"
                onClick={clearFilter}
                title="CLEAR ALL"
                className="items-center px-[15px] py-[7px] text-[12px] border border-[#000] shadow-sm hover:text-skin-primary align-middle ease-in-out duration-300 hover:text-white hover:bg-black hover:border-[#a80f16]  ml-[10px] uppercase leading-[1.35]"
              >
                <span>clear all</span>
              </button>
              <button
                type="button"
                onClick={applyFilter}
                title="APPLY"
                className="items-center px-[15px] py-[7px] text-[12px] border border-[#a80f16] shadow-sm text-skin-inverted hover:text-skin-primary bg-[#a80f16] align-middle ease-in-out duration-300 hover:border-black hover:text-black hover:bg-skin-button-secondary-hover uppercase leading-[1.35] ml-[10px]"
              >
                <span>apply</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderFilter;
