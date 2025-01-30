import Link from "next/link";
import Paragraph from "../../../../theme-files/paragraph";
import ImageTag from "../../../../theme-files/image";

const navigation = {
  security: [
    {
      link: "https://www.mcafeesecure.com/verify?host=elementvape.com",
      img: "/assets/footer/mcafee-secure.svg",
      alt: "mcafee-secure",
    },
    {
      link: "/",
      img: "/assets/footer/norton-av.svg",
      alt: "norton",
    },
    {
      link: "https://veratad.com/solutions/age-verification/",
      img: "/assets/footer/Veratad-logo.png",
      alt: "Veratad",
    },
  ],
  privacy: [
    { link: "/terms-and-conditions", title: "Terms and Conditions" },
    { link: "/privacy-policy", title: "Privacy Policy" },
    { link: "/accessibility", title: "Accessibility" },
    { link: "/sitemap", title: "Sitemap" },
    { link: "/privacy-policy#ca-policy", title: "California Privacy" },
    { link: "/privacy-policy#nv-policy", title: "Nevada Privacy" },
  ],
  card: [
    {
      link: "#",
      img: "/assets/footer/creditcard_visa.svg",
      alt: "visa-card",
    },
    {
      link: "#",
      img: "/assets/footer/creditcard_master.svg",
      alt: "master-card",
    },
    {
      link: "#",
      img: "/assets/footer/creditcard_discover.svg",
      alt: "discover-card",
    },
    {
      link: "#",
      img: "/assets/footer/creditcard_american.svg",
      alt: "american-express-card",
    },
  ],
};

const getYear = () => {
  return new Date().getFullYear();
};

function FooterCopyright() {
  return (
    <div className="container mx-auto px-0 md:px-[10px] pb-[15px]">
      <div className="flex items-center justify-between flex-col md:flex-row space-y-[15px] pb-[15px] md:pb-0 pt-[7px] border-0 md:border-t md:border-gray-300">
        <div className="flex flex-wrap footer-secure">
          {navigation.security?.map(({ link, img, alt }) => (
            <Link key={img} href={link}>
              <a
                target="_blank"
                className={`px-[10px] ${link === "/" ? "pointer-events-none" : ""}`}
              >
                <div className="relative flex">
                  <ImageTag
                    height={30}
                    width={82}
                    layout="fill"
                    objectFit="contain"
                    src={img}
                    alt={alt}
                  />
                </div>
              </a>
            </Link>
          ))}
        </div>

        {/* Copyright Desktop */}
        <div className="hidden md:flex flex-wrap py-10 md:py-0 lg:-ml[17px] lg:mb-[2px]">
          <Paragraph className="text-[12px] font-normal text-[#666] md:px-[10px]">
            Copyright © {getYear()} Element Vape. All Rights Reserved.
          </Paragraph>
        </div>

        <div className="flex footer-credit-card">
          {navigation.card?.map(({ img, link, alt }) => (
            <Link key={img} href={link}>
              <a>
                <div className="relative" key={img}>
                  <ImageTag
                    layout="fill"
                    width={39}
                    height={25}
                    objectFit="contain"
                    src={img}
                    alt={alt}
                  />
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
      {/* Copyright Mobile */}
      <div className="flex md:hidden justify-center flex-wrap pt-[15px] md:pt-[10px] border-t border-[#979797] mb-[5px]">
        <Paragraph className="text-[12px] font-normal text-[#666]">
          Copyright © {getYear()} Element Vape. All Rights Reserved.
        </Paragraph>
      </div>
      <div className="flex flex-wrap justify-center mb-[10px] md:ml-[7.3%] md:px-[10px]">
        {navigation.privacy?.map(({ link, title }) => (
          <Link key={link} href={link}>
            <a className="text-[13px] text-[#000] hover:text-skin-secondary hover:underline font-medium">
              {title} {title !== "Nevada Privacy" ? <span className="mx-[5px]">|</span> : ""}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FooterCopyright;
