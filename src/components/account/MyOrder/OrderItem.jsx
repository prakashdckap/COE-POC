export default function OrderItem({ item, handleReorder, handleRedirection }) {
  const cellClassName = "whitespace-nowrap text-[#282828] flex sm:table-cell";
  const titleClassName = "font-bold Capitalize block sm:hidden mr-2";

  const { orderId, orderDate, orderTotal, status, isInStock, shipTo } = item;

  // This method for changing the Date format MM-DD-YYYY
  const dateFormat = (dateString) => {
    // Split the date string by "-"
    const parts = dateString.split("-");

    // Rearrange the parts to MM-DD-YYYY format
    const formattedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;

    return formattedDate;
  };

  return (
    <tr key={orderId} className="flex flex-col sm:table-row mb-6">
      <td className={cellClassName}>
        <span className={titleClassName}>Order#: </span>
        {orderId}
      </td>
      <td className={cellClassName}>
        <span className={titleClassName}>Date: </span>
        {dateFormat(orderDate?.split(" ")[0])}
      </td>
      <td className={cellClassName}>
        <span className={titleClassName}>Ship To: </span>
        {shipTo}
      </td>
      <td className={cellClassName}>
        <span className={titleClassName}>Order Total: </span>${orderTotal?.amount?.toFixed(2)}
      </td>
      <td className={cellClassName}>
        <span className={titleClassName}> Status: </span>
        {status}
      </td>
      <td className="whitespace-nowrap font-medium flex sm:table-cell">
        <div className="flex flex-wrap">
          <button
            type="button"
            onClick={(e) => handleRedirection(e, item.orderId)}
            className="text-[#282828] hover:text-[#a80f16] font-medium mr-2 capitalize focus:underline"
          >
            View order
          </button>
          {isInStock && status?.toLowerCase() !== "on hold" ? (
            <>
              <span className="text-zinc-400">|</span>
              <button
                type="button"
                onClick={() => handleReorder(orderId)}
                className="text-[#282828] hover:text-[#a80f16] font-medium ml-2 focus:underline"
              >
                Reorder
              </button>
            </>
          ) : null}
        </div>
      </td>
    </tr>
  );
}
