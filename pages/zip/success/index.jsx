import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ZIP_SUCCESS from "../../../src/components/checkout/graphql/query/zip-success";
import OrderSuccess from "../../../src/components/checkout/success";

const ZipDynamicSlug = () => {
  const customerToken = useSelector((state) => state.customerToken);
  const customerCartId = useSelector((state) => state.customerCartId);
  const guestCartId = useSelector((state) => state.guestCartId);
  const history = useRouter();
  const cartId = customerToken ? customerCartId : guestCartId;
  const orderStatus = history?.query?.OrderStatus;
  const zipToken = history?.query?.token;

  const [zipData, { data: zipSuccessData, loading: zipSuccessLoading }] = useLazyQuery(ZIP_SUCCESS);

  useEffect(() => {
    if (zipToken && orderStatus && cartId) {
      zipData({
        variables: {
          cartId,
          orderStatus,
          zipToken,
        },
      })
        .then((res) => console.log("res", res))
        .catch((error) => console.log("error", error));
    }
  }, [history]);

  return (
    <OrderSuccess
      zipOrderId={
        zipSuccessData?.setZipSuccess?.is_successful &&
        zipSuccessData?.setZipSuccess?.order_increment_id
      }
      zipSuccessLoading={zipSuccessLoading}
    />
  );
};

export default ZipDynamicSlug;
