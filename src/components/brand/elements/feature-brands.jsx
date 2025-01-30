import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Keyboard, Mousewheel, Navigation, Pagination } from "swiper";
import { useSelector, useDispatch } from "react-redux";
import ImageTag from "../../../theme-files/image";
import { AxiosGraphQL } from "../../../helper/axios";
// eslint-disable-next-line import/no-unresolved
import "swiper/css";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/grid";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/pagination";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/navigation";
import { SET_FEATURE_BRAND } from "../../../redux/actions";

function FeatureBrands() {
  const [featureBrand, setFeatureBrand] = useState({});
  const [loading, setLoading] = useState(false);
  const brand = useSelector((state) => state.featureBrand);
  const dispatch = useDispatch();

  const spaceBetween = 20;

  const grid = {
    rows: 2,
    fill: "row",
  };

  const featureBrands = () => {
    setLoading(true);
    AxiosGraphQL("feature-brands").then((response) => {
      if (response && response?.ambrandslider) {
        setLoading(false);
        setFeatureBrand(response);
        dispatch(SET_FEATURE_BRAND(response));
      } else {
        setFeatureBrand(brand);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    featureBrands();
  }, []);

  return (
    <div className="cms-featured-brands">
      <div className="mb-10 pb-[14px] border-b-[1px] border-b-[#ebebeb] px-2">
        <strong className="text-sm pb-[15px]  border-b-[3px] border-b-[#121212] text-skin-base font-medium">
          FEATURED BRANDS
        </strong>
      </div>

      {loading ? (
        <div className="min-h-[100vh] flex justify-center items-center">
          <svg
            className="h-[50px] animate-pulse"
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            fill="#cacaca"
          >
            <path d="m16.5 11.995c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm-6.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25z" />
          </svg>
        </div>
      ) : (
        <div className="relative">
          <Swiper
            slidesPerView={6}
            spaceBetween={spaceBetween}
            grid={grid}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: spaceBetween,
                grid: grid,
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 30,
                grid: grid,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: spaceBetween,
                grid: grid,
              },
              1024: {
                slidesPerView: 6,
                spaceBetween: spaceBetween,
                grid: grid,
              },
            }}
            modules={[Grid, Pagination, Navigation, Mousewheel, Keyboard]}
            navigation
          >
            {featureBrand?.ambrandslider?.items?.length ? (
              <>
                {featureBrand?.ambrandslider?.items?.map(({ img, url }) => (
                  <SwiperSlide key={url}>
                    <div className="carousel-item brand-carousel-item text-center snap-start relative hover:scale-110 duration-500">
                      <Link href={url}>
                        <a className="w-[209px] h-[209px] block z-0 relative flex items-center justify-center">
                          <ImageTag
                            className="object-contain"
                            width={100}
                            height={100}
                            src={`https://admin.elementvape.com/${img}`}
                          />
                        </a>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
              </>
            ) : (
              ""
            )}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default FeatureBrands;
