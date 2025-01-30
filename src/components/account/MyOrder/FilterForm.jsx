import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";

import FilterTextInput from "../../../theme-files/text-input/filter-input";
import { statusOptions } from "../helper";
import { orderFilterKey } from "./orderHelper";
import Label from "../../../theme-files/label";
import FilterSelect from "../../../theme-files/select/filter-select";

import "react-datepicker/dist/react-datepicker.css";

export default function FilterForm({ filterData, setFilterData }) {
  const customerDetails = useSelector((state) => state.customerDetails);

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

  const createdOptions = [
    {
      value: customerDetails?.email,
      displayName: customerDetails?.firstName + " " + customerDetails?.lastName,
    },
  ];

  return (
    <>
      <div className="justify-between sm:block md:flex">
        <div className="justify-start">
          <FilterTextInput
            type="text"
            label="Order Number"
            placeholder="Enter full or partial number..."
            name={orderFilterKey.orderNumber}
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
            name={orderFilterKey.orderStatus}
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
            name={orderFilterKey.invoiceNumber}
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
                className="mr-10 md:mr-1 xl:mr-10 text-[12px] md:text-[13px] datePicker"
                onChange={(date) => handleDateInput(date, orderFilterKey.fromDate)}
                name={orderFilterKey.fromDate}
                selected={filterData?.fromDate}
                placeholderText="MM/DD/YYYY"
              />
              <span className="text-sm font-normal">To: </span>
              <DatePicker
                showIcon
                toggleCalendarOnIconClick
                onChange={(date) => handleDateInput(date, orderFilterKey.toDate)}
                name={orderFilterKey.toDate}
                selected={filterData?.toDate}
                className="text-[12px] md:text-[13px] datePicker"
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
    </>
  );
}
