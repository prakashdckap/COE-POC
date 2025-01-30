import { ChevronRight } from "heroicons-react";
import Link from "next/link";
import Image from "next/image";
import Paragraph from "../../../../theme-files/paragraph";
import OrderedList from "../../../../theme-files/ordered-list";
import ListItem from "../../../../theme-files/list-item";
import SEOHead from "../../../../helper/SEOHeader";
import constants from "../../../../helper/constant";

const products = [
  {
    id: 1,
    href: "/blog/post/what-is-a-pod-system",
    imageSrc:
      "https://admin.elementvape.com/media/blog/cache/300x170/magefan_blog/All_Pod_Systems2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    title: "INFORMATION",
    description: "What is a Pod System and How Does it Work?",
    date: "January 15, 2020",
  },
  {
    id: 2,
    href: "/blog/post/e-liquid-guide",
    imageSrc:
      "https://admin.elementvape.com/media/blog/cache/300x170/magefan_blog/Nicotine_Infographic2.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    title: "GUIDE",
    description: "E-Liquid Guide - Freebase vs Nicotine Salts",
    date: "January 22, 2020",
  },
  {
    id: 3,
    href: "/blog/post/rebuildable-guide",
    imageSrc:
      "https://admin.elementvape.com/media/blog/cache/300x170/magefan_blog/Building_Blog_Eblast_1.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    title: "GUIDE",
    description: "Beginner's Guide to DIY Rebuildables",
    date: "February 04, 2020",
  },
];

const navigation = [
  { href: "/", name: "Home", current: false },
  { href: "/blog", name: "Blog", current: true },
];

function BlogStatic() {
  return (
    <>
      <SEOHead title="Blog" description="Blog " canonicalUrl={`${constants.replaceUrl}/blog`} />
      <div className="mx-auto bg-white">
        <div className="text-center px-[15px]">
          <nav aria-label="Breadcrumb" className="container px-4 md:px-0 text-center mx-auto mb-5">
            <OrderedList role="list" className="flex items-center">
              {navigation?.map((item, i) => (
                <ListItem key={item?.name}>
                  <div
                    className={`${
                      item?.current ? "font-bold" : "font-normal"
                    } flex items-center text-xs font-normal text-gray-900 hover:underline`}
                  >
                    <Link href={item?.href}>{item?.name}</Link>
                    {i < navigation?.length - 1 ? (
                      <ChevronRight className="h-4 text-gray-500" />
                    ) : null}
                  </div>
                </ListItem>
              ))}
            </OrderedList>
          </nav>
          <h1 className="text-[22px] md:text-[26px] font-bold text-skin-base uppercase text-center mt-[30px]">
            BLOG
          </h1>
          <Paragraph className="text-center max-w-full mx-[20px] m-auto mt-2 text-sm md:text-[18px] font-light my-1">
            <span className="after:w-[43px] text-[#000] after:content after:block after:border-[#000] after:border-[1.5px] after:mx-auto after:mt-4">
              Get the industry's latest news and in-depth product reviews
            </span>
          </Paragraph>
          <div className="flex justify-center cursor-pointer">
            <Link href="blog/post/top-10-vapes-kick-off-2023">
              <img
                // className="md:max-w-4xl"
                src="https://admin.elementvape.com/media/blog/cache/1200x680/magefan_blog/2023_TOP_10_VAPE_KITS_TO_START_WITH_TITLE.jpg"
                alt="img"
              />
            </Link>
          </div>
          <div className="text-center">
            <h3 className="text-[11px] font-semibold uppercase">
              <Link href="/blog/category/top-10" className="hover:underline">
                Top 10
              </Link>
            </h3>
            <h6 className="my-3 text-[24px] md:text-[34px] text-skin-base font-semibold hover:underline cursor-pointer">
              <Link href="/blog/post/top-10-vapes-kick-off-2023" className="hover:underline">
                Top 10 Vape Products to Kick Off 2023
              </Link>
            </h6>
            <p className=" text-[13px]">January 26, 2023</p>
          </div>
          <div className="flex justify-center cursor-pointer">
            <Link href="blog/post/best-alternate-cannabinoids-to-try-in-2023">
              <img
                // className="md:max-w-4xl"
                src="https://admin.elementvape.com/media/blog/cache/1200x680/magefan_blog/Cannabinoids_Blog_Title.jpg"
                alt="img"
              />
            </Link>
          </div>
          <div className="text-center mb-14">
            <h3 className="text-[11px] font-semibold uppercase">
              <Link href="blog/category/guide" className="hover:underline">
                Guide
              </Link>
            </h3>
            <h6 className="my-3 text-[24px] md:text-[34px] text-skin-base font-semibold hover:underline cursor-pointer">
              <Link href="blog/post/best-alternate-cannabinoids-to-try-in-2023">
                Best Alternate Cannabinoids To Try in 2023!
              </Link>
            </h6>
            <p className=" text-[13px]">December 28, 2022</p>
          </div>
        </div>

        <div className="lg:max-w-12xl bg-[#f3f3f3] py-10">
          <div className="mx-auto max-w-2xl lg:max-w-7xl px-[20px]">
            <h2 className="text-[19px] font-semibold tracking-tight text-gray-900 uppercase text-center pb-5">
              HIGHLIGHTS
            </h2>
            <div className="grid grid-cols-1 gap-y-10 gap-x-5 sm:grid-cols-2 lg:grid-cols-3 px-0 xl:px-[55px]">
              {products.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="aspect-w-1 aspect-h-1  overflow-hidden bg-gray-200 group-hover:opacity-75 lg:aspect-none">
                    <Link href={product.imageSrc}>
                      <a className="h-[240px] block">
                        <img
                          data-width-amp="300"
                          data-height-amp="170"
                          layout="responsive"
                          src={product.imageSrc}
                          alt={product.imageAlt}
                          className="h-full w-full object-cover"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xs font-bold uppercase">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </a>
                    </h3>
                    <h6 className="my-3 text-[19px] md:text-[23px] font-semibold">
                      {product.description}
                    </h6>
                    <p className=" text-[13px]">{product.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogStatic;
