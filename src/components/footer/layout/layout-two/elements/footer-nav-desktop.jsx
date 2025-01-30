import PropTypes from "prop-types";
import Link from "next/link";

function FooterNavDesktop({ navigation }) {
  return (
    <>
      <div className="hidden md:block">
        <div className="grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-[10px]">
          <div className="space-y-4 col-span-1 md:pl-[4px]">
            <p className="text-skin-base text-xs font-semibold md:mt-[1px]">FOLLOW US</p>
            <div className="flex items-center footer-social-icon">
              {navigation?.social?.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  title={item.name}
                  className="text-skin-base "
                  rel="noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon
                    className="h-[20px] w-[20px] text-[#000000] hover:text-[#595959]"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-1 md:pl-[5px]">
            <div>
              <h3 className="text-[12px] text-skin-base font-semibold uppercase">NEED HELP?</h3>
              <ul className="mt-[8px]">
                {navigation?.solutions?.map((item) => (
                  <li key={item.name} className="mt-[1px]">
                    {item.href === "/shippingtracking" || item.href === "/do-we-ship" ? (
                      <Link href={item.href}>
                        <a className="footer-links text-xs text-skin-footer hover:text-skin-secondary hover:underline font-medium">
                          {item.name}
                        </a>
                      </Link>
                    ) : (
                      <Link href={item.href}>
                        <a className="footer-links text-xs text-skin-footer hover:text-skin-secondary hover:underline font-medium">
                          {item.name}
                        </a>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-span-1 md:pl-[5px]">
            <div className="mt-12 md:mt-0">
              <h3 className="text-[12px] text-skin-base font-semibold uppercase">INFO</h3>
              <ul className="mt-[8px]">
                {navigation?.support?.map((item) => (
                  <li key={item.name} className="mt-[1px]">
                    <Link href={item.href}>
                      <a
                        href={item.href}
                        className="footer-links text-xs text-skin-footer hover:text-skin-secondary hover:underline font-medium"
                      >
                        {item.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-span-1 md:pl-[5px]">
            <div>
              <h3 className="text-[12px] text-skin-base font-semibold uppercase">RESOURCES</h3>
              <ul className="mt-[8px]">
                {navigation?.company?.map((item) => (
                  <li key={item.name} className="mt-[1px]">
                    <Link href={item.href}>
                      <a className="footer-links text-xs text-skin-footer hover:text-skin-secondary hover:underline font-medium">
                        {item.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

FooterNavDesktop.propTypes = {
  navigation: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)).isRequired,
};

export default FooterNavDesktop;
