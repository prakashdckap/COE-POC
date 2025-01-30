import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import Label from "../../theme-files/label";
import FilterSelect from "../../theme-files/select/filter-select";
import FilterTextInput from "../../theme-files/text-input/filter-input";

import "react-datepicker/dist/react-datepicker.css";

function OrderFilter({ filter, setShowFilter, showFilter, filterData, setFilterData }) {
  // const [showFilter, setShowFilter] = useState(false);
  // const [filterData, setFilterData] = useState({});
  const { customerDetails } = useSelector((state) => state);

  const toggleFilter = () => setShowFilter(!showFilter);
  const customerToken = useSelector((state) => state.customerToken);

  const handleInput = (e) => {
    if (e.target.name)
      setFilterData({
        ...filterData,
        [e.target.name]: e.target.value,
      });
  };

  const handleDateInput = (date, name) => {
    if (name) {
      setFilterData({
        ...filterData,
        [name]: date,
      });
    }
  };

  // Base64Url decoding function
  function base64UrlDecode(base64Url) {
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  }

  // JWT decoding function
  function decodeJWT(token) {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid token");
    }

    const payload = parts[1];
    const decodedPayload = base64UrlDecode(payload);

    let data = JSON.parse(decodedPayload);
    return String(data.uid);
  }

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

  const statusOptions = [
    { value: "canceled", displayName: "Canceled" },
    { value: "closed", displayName: "Closed" },
    { value: "delivered", displayName: "Delivered" },
    { value: "hold", displayName: "On Hold" },
    { value: "review", displayName: "Payment Review" },
    { value: "pending", displayName: "Pending" },
    { value: "processing", displayName: "Processing" },
    { value: "recieved", displayName: "Recieved" },
    { value: "shipped", displayName: "Shipped" },
    { value: "fraud", displayName: "Suspect Fraud" },
  ];
  const createdOptions = [
    {
      value: customerDetails?.email,
      displayName: customerDetails?.firstName + " " + customerDetails?.lastName,
    },
  ];
  return (
    <div className="filter-order pb-[10px]">
      <div className="flex justify-between">
        <div className="justify-start">
          <FilterTextInput
            type="text"
            placeholder="Search by SKU or Product Name"
            label=""
            search
            name="namesku"
            values={filterData}
            setvalues={setFilterData}
            filter={applyFilter}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={toggleFilter}
            // style={{ height: "32.2px" }}
            className="close-btn items-center px-3 py-1 text-sm border border-[#000] shadow-sm hover:text-skin-primary align-middle ease-in-out duration-300 hover:text-white hover:bg-black hover:border-white"
          >
            {showFilter ? "CLOSE" : "FILTER"}
          </button>
        </div>
      </div>

      {showFilter && (
        <div className="order-filter-all">
          <div className="justify-between sm:block md:flex">
            <div className="justify-start">
              <FilterTextInput
                type="text"
                label="Order Number"
                placeholder="Enter full or partial number..."
                name="orderNumber"
                values={filterData}
                setvalues={setFilterData}
                formatNumber
              />
            </div>
            <div className="justify-end sm:block md:flex">
              <FilterSelect
                type="select"
                label="Order Status"
                defaultTitle="All"
                className="status"
                name="orderStatus"
                data={statusOptions}
                setvalues={setFilterData}
                values={filterData}
              />
            </div>
          </div>

          <div className="justify-between  sm:block md:flex">
            <div className="justify-start">
              <FilterTextInput
                type="text"
                label="Invoice Number"
                placeholder="Enter full or partial number..."
                name="invoiceNumber"
                values={filterData}
                setvalues={setFilterData}
                formatNumber
              />
            </div>
            <div className="justify-end">
              <div className="date-search">
                <div className="relative mt-2">
                  <Label
                    htmlFor="mobile"
                    className="block text-[13px] font-semibold text-[#282828] capitalize pb-1"
                  >
                    Order Date
                  </Label>
                </div>
                <div className="flex justify-items-center date-picker-style">
                  <span className="text-sm font-normal">From: </span>
                  <DatePicker
                    showIcon
                    toggleCalendarOnIconClick
                    className="mr-10 md:mr-1 xl:mr-10 text-[12px] md:text-[13px] datePicker "
                    onChange={(date) => handleDateInput(date, "fromDate")}
                    name="fromDate"
                    selected={filterData?.fromDate}
                    placeholderText="MM/DD/YYYY"
                  />
                  <span className="text-sm font-normal">To: </span>
                  <DatePicker
                    showIcon
                    toggleCalendarOnIconClick
                    onChange={(date) => handleDateInput(date, "toDate")}
                    name="toDate"
                    selected={filterData?.toDate}
                    className="text-[12px] md:text-[13px] datePicker "
                    placeholderText="MM/DD/YYYY"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="justify-between  sm:block md:flex">
            <div className="justify-start">
              <FilterSelect
                type="select"
                label="Created By"
                defaultTitle="All"
                className="createdBy"
                name="createdby"
                data={createdOptions}
                setvalues={setFilterData}
                values={filterData}
              />
            </div>
            <div className="flex justify-end">
              <div className="date-search">
                <div className="relative mt-2">
                  <Label
                    htmlFor="mobile"
                    className="block text-[13px] font-semibold text-[#282828] capitalize pb-1"
                  >
                    Order Total
                  </Label>
                </div>
                <div className="flex justify-items-center">
                  <span className="text-sm font-normal">Min: </span>
                  <input
                    type="text"
                    className="mr-10 md:mr-1 xl:mr-10"
                    onChange={handleInput}
                    name="minTotal"
                    value={filterData?.minTotal}
                  />
                  <span className="text-sm font-normal">Max: </span>
                  <input
                    type="text"
                    onChange={handleInput}
                    name="maxTotal"
                    value={filterData?.maxTotal}
                  />
                </div>
              </div>
            </div>
          </div>

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
