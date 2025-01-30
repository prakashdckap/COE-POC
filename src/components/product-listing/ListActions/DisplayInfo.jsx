import useBannerUpdateLink from "../../../helper/notifications/useBannerUpdateLink";
import Paragraph from "../../../theme-files/paragraph";

export function DisplayBanner({ promoBanner, topBanner }) {
  const { getUpdatedBannerLink } = useBannerUpdateLink();
  if (promoBanner?.length) {
    return promoBanner?.map((banner) => (
      <div className={topBanner ? "md:mb-[20px]" : "mt-[15px]"}>
        {banner?.banner_link ? (
          <a href={getUpdatedBannerLink(banner?.banner_link)}>
            <img src={banner?.banner_img} className="w-[100%]" alt="banner" />
          </a>
        ) : (
          <>
            <img src={banner?.banner_img} className="w-[100%]" alt="banner" />
          </>
        )}
      </div>
    ));
  }
}

export function TopPlpInfo({ totalProductCount, currentPage, perPage, listingProducts }) {
  return (
    <>
      {totalProductCount < 60 || currentPage * perPage === totalProductCount ? (
        <Paragraph className="hidden md:block font-normal text-[#282828] text-sm ">
          {totalProductCount} Display{totalProductCount > 1 && "s"}
        </Paragraph>
      ) : (
        <Paragraph className="hidden md:block font-normal text-[#282828] text-sm ">
          Displays 1-
          {currentPage * perPage >= totalProductCount
            ? totalProductCount
            : listingProducts?.length}{" "}
          of {totalProductCount}
        </Paragraph>
      )}
    </>
  );
}

export function BottomPlpInfo({ totalProductCount, currentPage, perPage, listingProducts }) {
  return (
    <>
      {totalProductCount < 60 || currentPage * perPage === totalProductCount ? (
        <Paragraph className="flex md:hidden justify-center mt-10 font-normal text-[#282828] text-sm ">
          {totalProductCount} Display{totalProductCount > 1 && "s"}
        </Paragraph>
      ) : (
        <Paragraph className="flex md:hidden justify-center mt-10 font-normal text-[#282828] text-sm ">
          Displays 1-
          {currentPage * perPage >= totalProductCount
            ? totalProductCount
            : listingProducts?.length}{" "}
          of {totalProductCount}
        </Paragraph>
      )}
    </>
  );
}
