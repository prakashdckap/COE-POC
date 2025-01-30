import { getLayout } from "../../src/layout/UserAccountLayout";
import MyAccount from "../../src/components/account/newsletter-subscriptions";

function Account() {
  return <MyAccount />;
}
Account.getLayout = getLayout;
export default Account;
