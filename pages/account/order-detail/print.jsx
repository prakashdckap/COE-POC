import { useEffect } from "react";
import ViewOrder from "../../../src/components/account/view-order";

export default function PrintOrder() {
  useEffect(() => {
    setTimeout(() => {
      window.print();
    }, 2000);
  }, []);
  return (
    <div>
      <ViewOrder isPrint />
    </div>
  );
}
