import { useRouter } from "next/router";
import { useEffect } from "react";
import Logout from "../../../src/components/logout/index";
import useLogout from "../../../src/helper/hooks/customer/use-logout";

export default function LogoutMain() {
  const history = useRouter();
  const { clearReduxCache } = useLogout();

  useEffect(() => {
    const redirect = setTimeout(() => {
      history?.push("/");
    }, 5000);

    clearReduxCache();

    return () => {
      clearTimeout(redirect);
    };
  }, []);

  return <Logout />;
}
