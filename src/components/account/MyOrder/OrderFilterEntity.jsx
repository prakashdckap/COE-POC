import { useSelector } from "react-redux";

import FilterItem, { DoubleFilterItem } from "./FilterItem";
import { orderEntity } from "./orderHelper";
import { formatDate } from "../helper";

export default function OrderFilterEntity({ filterEntries, clearFilter, handleRemove, filterKey }) {
  const customerDetails = useSelector((state) => state.customerDetails);

  if (filterEntries?.length) {
    return (
      <div className="mt-[2px] mb-[5px]">
        <ul className="border-y-[1px] inline-block  m-0 pt-[8px] pb-[2px] w-[100%] border-y-[#ccc]">
          {filterEntries.map((filterValue) => (
            <>
              {filterValue?.ProductSku && (
                <FilterItem
                  handleRemove={handleRemove}
                  type={orderEntity.nameSku.key}
                  title={orderEntity.nameSku.title}
                  text={filterValue?.ProductSku}
                />
              )}
              {filterValue?.createdby && filterKey?.createdby && (
                <FilterItem
                  handleRemove={handleRemove}
                  type={orderEntity.createdby.key}
                  title={orderEntity.createdby.title}
                  text={customerDetails?.firstName + " " + customerDetails?.lastName}
                />
              )}
              {filterValue?.orderNumber && (
                <FilterItem
                  handleRemove={handleRemove}
                  type={orderEntity.orderNumber.key}
                  title={orderEntity.orderNumber.title}
                  text={filterValue?.orderNumber}
                />
              )}
              {filterValue?.orderStatus && (
                <FilterItem
                  handleRemove={handleRemove}
                  type={orderEntity.orderStatus.key}
                  title={orderEntity.orderStatus.title}
                  text={filterValue?.orderStatus}
                />
              )}
              {filterValue?.invoiceNumber && (
                <FilterItem
                  handleRemove={handleRemove}
                  type={orderEntity.invoiceNumber.key}
                  title={orderEntity.invoiceNumber.title}
                  text={filterValue?.invoiceNumber}
                />
              )}
              {filterValue?.OrderTotal?.Max || filterValue?.OrderTotal?.Min ? (
                <DoubleFilterItem
                  handleRemove={handleRemove}
                  type={orderEntity.minTotal.key}
                  title={orderEntity.minTotal.title}
                  firstTitle={"Min:"}
                  secondTitle={"Max:"}
                  firstText={filterValue?.OrderTotal?.Min}
                  secondText={filterValue?.OrderTotal?.Max}
                />
              ) : (
                <></>
              )}
              {filterValue?.OrderDate?.From || filterValue?.OrderDate?.To ? (
                <DoubleFilterItem
                  handleRemove={handleRemove}
                  type={orderEntity.fromDate.key}
                  title={orderEntity.fromDate.title}
                  firstTitle={"From:"}
                  secondTitle={"To:"}
                  firstText={formatDate(filterValue?.OrderDate?.From)}
                  secondText={formatDate(filterValue?.OrderDate?.To)}
                />
              ) : (
                <></>
              )}
            </>
          ))}
          <li
            className="float-left list-none mb-[5px] mr-[14px] cursor-pointer"
            onClick={clearFilter}
          >
            <span className=" px-[3px] text-[13px] leading-[1.35]">Clear All</span>
          </li>
        </ul>
      </div>
    );
  }
}
