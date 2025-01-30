import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function ShipTo() {
  const { pathname } = useRouter();
  const checkoutShippingAddress = useSelector((state) => state.checkoutShippingAddress);
  const checkoutBillingAddress = useSelector((state) => state.checkoutBillingAddress);
  const checkoutShippingMethod = useSelector((state) => state.checkoutShippingMethod);
  const checkoutPaymentMethod = useSelector((state) => state.checkoutPaymentMethod);

  return (
    <div className="border border-gray-400 rounded p-5 my-5 mb-10">
      <div className="w-full pt-4 flex text-sm">
        <p className="w-1/5 text-skin-muted">Ship Address</p>
        <div className="w-3/5 pl-[10px]">
          <p className="text-left">
            {checkoutShippingAddress?.firstName} {checkoutShippingAddress?.lastName},
          </p>
          <p className="text-left">
            {checkoutShippingAddress?.street?.map((lane) => (
              <span key={lane}>{lane} </span>
            ))}
          </p>
          <p>
            {checkoutShippingAddress?.city}, {checkoutShippingAddress?.region},{" "}
            {checkoutShippingAddress?.country}
          </p>
          <p>{checkoutShippingAddress?.postcode}</p>
          <p>
            <span className="font-medium">Tel: </span>
            {checkoutShippingAddress?.telephone}
          </p>
        </div>

        <Link href={{ pathname: "/checkout/information", query: { address: "shipping" } }}>
          <a className="w-1/5 text-right text-skin-primary">Change</a>
        </Link>
      </div>
      {pathname === "/checkout/payment" && (
        <>
          <div className="w-full pt-5 flex text-sm border-t border-gray-200 mt-5">
            <p className="w-1/5 text-skin-muted">Billing Address</p>
            <div className="w-3/5 pl-[10px]">
              <p className="text-left">
                {checkoutBillingAddress?.firstName} {checkoutBillingAddress?.lastName},
              </p>
              <p className="text-left">
                {checkoutBillingAddress?.street?.map((lane) => (
                  <span key={lane}>{lane} </span>
                ))}
              </p>
              <p>
                {checkoutBillingAddress?.city}, {checkoutBillingAddress?.region},{" "}
                {checkoutBillingAddress?.country}
              </p>
              <p>{checkoutBillingAddress?.postcode}</p>
              <p>
                <span className="font-medium">Tel: </span>
                {checkoutBillingAddress?.telephone}
              </p>
            </div>

            <Link href={{ pathname: "/checkout/information", query: { address: "billing" } }}>
              <a className="w-1/5 text-right text-skin-primary">Change</a>
            </Link>
          </div>

          <div className="w-full flex text-sm border-t border-gray-200 pt-5 mt-5">
            <p className="w-1/5 text-skin-muted">Shipping Method</p>
            <p className="text-left w-3/5">
              {checkoutShippingMethod?.methodName} - {checkoutShippingMethod?.description} -{" "}
              <strong>$ {checkoutShippingMethod?.amount?.toFixed(2)}</strong>
            </p>
          </div>

          <div className="w-full flex text-sm border-t border-gray-200 pt-5 mt-5">
            <p className="w-1/5 text-skin-muted">Payment Method</p>
            <p className="text-left w-3/5">
              {checkoutPaymentMethod?.methodCode} - {checkoutPaymentMethod?.methodName}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default ShipTo;
