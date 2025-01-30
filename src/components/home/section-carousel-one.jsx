import { useEffect, useRef, useState } from "react";
import RelatedProducts from "../product-description/related-products";

function SectionCarouselOne() {
  const maxScrollWidth = useRef(0);
  const [currentIndex] = useState(0);
  const carousel = useRef(null);

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <RelatedProducts/>
  );
}

export default SectionCarouselOne;

