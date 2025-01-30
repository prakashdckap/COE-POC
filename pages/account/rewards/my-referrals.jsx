import { getLayout } from "../../../src/layout/UserAccountLayout";
import Referral from "../../../src/components/account/rewards/referral";

function Account() {
  return <Referral />;
}
Account.getLayout = getLayout;
export default Account;
