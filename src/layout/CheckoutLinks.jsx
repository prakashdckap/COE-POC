import { useRouter } from "next/router";
import Link from "next/link";

const Tab = ({ href, children }) => {
  const { pathname } = useRouter();
  const isActive = href === pathname;
  const getWrapper = (el) => (href ? <Link href={href}>{el}</Link> : <>{el}</>);

  return getWrapper(
    <a className={pathname === href && isActive ? "text-xs font-extrabold" : ""}>{children}</a>
  );
};

const checkoutLinks = [
  {
    path: "/",
    pathName: "Cart",
  },
  {
    path: "/checkout/shipping",
    pathName: "Shipping",
  },
  {
    path: "/checkout/payment",
    pathName: "Payment",
  },
];

function CheckoutLinks() {
  return (
    <nav className="my-10">
      <ol className="flex items-center">
        {checkoutLinks?.map(({ path, pathName }) => (
          <Tab href={path} key={path}>
            <li
              className={`flex items-center text-xs text-skin-muted ${
                pathName === "Cart" ? "text-skin-primary" : ""
              }`}
            >
              {pathName}
              {pathName !== "Payment" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mx-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              ) : (
                ""
              )}
            </li>
          </Tab>
        ))}
      </ol>
    </nav>
  );
}

export default CheckoutLinks;
