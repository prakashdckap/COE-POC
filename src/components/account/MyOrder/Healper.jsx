import { ReplyIcon, ExclamationIcon } from "@heroicons/react/solid";

import { LoadingEffect } from "../AccountAssets/Asset";

export function MyOrderTableHeader() {
  const headerClassName = "text-left text-sm text-[#282828] font-medium uppercase";

  return (
    <thead className="hidden sm:table-header-group">
      <tr className="border-b">
        <th scope="col" className={headerClassName}>
          Order#
        </th>
        <th scope="col" className={headerClassName}>
          Date
        </th>
        <th scope="col" className={headerClassName}>
          Ship To
        </th>
        <th scope="col" className={headerClassName}>
          Order Total
        </th>
        <th scope="col" className={headerClassName}>
          Status
        </th>
        <th scope="col" className={headerClassName}>
          Action
        </th>
        <th scope="col" className="relative px-6 py-3">
          <span className="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
  );
}

export function OrderBack({ clearFilter }) {
  return (
    <div className="overflow-hidden flex justify-end mt-5">
      <button
        onClick={clearFilter}
        type="button"
        className="items-center px-3 py-1 text-sm border border-[#a80f16] shadow-sm text-skin-inverted hover:text-skin-primary bg-[#a80f16] align-middle ease-in-out duration-300 hover:border-black hover:text-black hover:bg-skin-button-secondary-hover"
      >
        <i className="h-5 w-4 inline-block align-middle">
          <ReplyIcon />
        </i>
        Back
      </button>
    </div>
  );
}

export function EmptyOrderList({ OrderListLoading, orders }) {
  return (
    <>
      {OrderListLoading ? (
        <div className="flex justify-center items-center">
          <LoadingEffect />
          <span className="ml-2 text-[#282828] text-sm"> Loading...</span>
        </div>
      ) : (
        !orders?.length && (
          <div className="py-2 border-t">
            <div className="flex bg-[#fef0d5] py-2 mt-5">
              <ExclamationIcon className="w-5 h-5 bg-[#fef0d5] mr-3 ml-3" fill="#c07600" />
              <span style={{ color: "#6f4400" }} className="text-sm">
                You have placed no orders.
              </span>
            </div>
          </div>
        )
      )}
    </>
  );
}
