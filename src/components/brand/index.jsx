import Link from "next/link";
import Heading from "../../theme-files/heading";
import FeatureBrands from "./elements/feature-brands";
import ShopByBrand from "./elements/shop-by-brand";

function Brands() {
  return (
    <div className="container mx-auto" id="main_content">
      <nav aria-label="Breadcrumb" className="px-4 md:px-0">
        <ol className="theme-2 flex items-center undefined">
          <li>
            <div className="flex items-center">
              <Link href="/">
                <a className="text-xs font-normal text-gray-900 hover:underline">Home</a>
              </Link>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                width="24"
                height="24"
                className="h-4 text-gray-500"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </li>
          <li className="theme-1 text-xs undefined">
            <Link href="/brands">
              <a aria-current="page" className="font-bold text-skin-base">
                Brands
              </a>
            </Link>
          </li>
        </ol>
      </nav>
      <Heading className="text-[26px] font-medium text-skin-base text-center my-10">
        BRANDS WE CARRY
      </Heading>
      <FeatureBrands />
      <ShopByBrand />
    </div>
  );
}

export default Brands;
