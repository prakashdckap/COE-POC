import { Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { useMemo } from "react";

import { breakpoints } from "../Assets/carouselAsset";
import { ProductCardSckeloton } from "../../../components/product-listing/product-list-sckeloton";
import { addItemsRepeatedly } from "../../../components/product-listing/helper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function ProductCardSckeleton() {
  const sckeletonCard = useMemo(() => {
    return addItemsRepeatedly(<ProductCardSckeloton carouselLoader />, 6);
  }, []);

  return (
    <Swiper
      spaceBetween={50}
      loop={false}
      autoplay={false}
      speed={500}
      slidesPerView={6}
      slidesPerGroup={1}
      modules={[Autoplay, Navigation, Pagination]}
      breakpoints={breakpoints}
      className="flex"
    >
      {sckeletonCard}
    </Swiper>
  );
}
