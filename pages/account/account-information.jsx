import { getLayout } from "../../src/layout/UserAccountLayout";
import MyAccount from "../../src/components/account/account-information";

function Account() {
  return <MyAccount />;
}
Account.getLayout = getLayout;
export default Account;