import { Disclosure } from "@headlessui/react";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import Link from "next/link";

import { mobileNavigation } from "../../../helper";

function FooterNavMobile() {
  return (
    <div className="block md:hidden mobile-footer-social-icons">
      {mobileNavigation?.data?.map((res) => (
        <Disclosure as="div" key={res.title}>
          {({ open }) => (
            <>
              <h3>
                <Disclosure.Button className="group relative w-full py-2 flex justify-between items-center text-left">
                  <span className="text-sm font-semibold uppercase">{res.title}</span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusSmIcon className="block h-6 w-6 text-skin-base" aria-hidden="true" />
                    ) : (
                      <PlusSmIcon className="block h-6 w-6 text-skin-base" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>

              <ul>
                <Disclosure.Panel as="div" className="prose prose-sm social-icons py-3">
                  {res?.link?.map((item, index) => (
                    <>
                      {item?.icon ? (
                        <div className="relative block float-left">
                          <div
                            className={`mobile-ocial-icons first-line mobile-social-icons-${
                              index + 1
                            }`}
                          >
                            <Link key={item.href} href={item.href}>
                              <a>
                                <item.icon className="h-6 w-6 mr-5 mb-4 mt-2" aria-hidden="true" />
                              </a>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <li key={item.href}>
                          <Link href={item.href}>
                            <a className="font-medium text-xs text-[#595959]">{item.name}</a>
                          </Link>
                        </li>
                      )}
                    </>
                  ))}
                </Disclosure.Panel>
              </ul>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}

export default FooterNavMobile;
