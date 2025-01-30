import React from "react";
import ViewOrder from "../../src/components/account/view-order";
import { getLayout } from "../../src/layout/UserAccountLayout";

function OrderDetail() {
  return (
    <div>
      <ViewOrder />
    </div>
  );
}

OrderDetail.getLayout = getLayout;
export default OrderDetail;
