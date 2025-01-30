import { useEffect, useRef, useState } from "react";
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import SubHeading from "../../theme-files/sub-heading";
import Heading from "../../theme-files/heading";
import ImageTag from "../../theme-files/image";

const resources = [
  {
    title: "DOVPO x TVC TOPSIDE DUAL 200W Squonk Box Mod",
    price: "$69.88",
    reviews: "344",
    starRating: "4.5",
    link: "/",
    imageUrl:
      "https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/d/o/dovpo_x_tvc_topside_dual_200w_squonk_box_mod_-_se_group_photo.jpg",
  },
  {
    title: "Welcome to Ark Labs",
    price: "$57.99",
    reviews: "33",
    starRating: "3",
    link: "/",
    imageUrl:
      "https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/g/e/geek_vape_aegis_x_200w_starter_kit_with_oled_screen.jpg",
  },
  {
    title: "Some sort of third title",
    price: "$28.99",
    reviews: "45",
    starRating: "4",
    link: "/",
    imageUrl:
      "https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/g/e/geek_vape_zeus_mesh_replacement_coils.jpg",
  },
  {
    title: "A personal site perhaps?",
    price: "$52.77",
    reviews: "789",
    starRating: "5",
    link: "/",
    imageUrl:
      "https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/h/o/horizontech_-_sakerz_-_sub_ohm_tank_-_all_colors.png",
  },
  {
    title: "Super item number five",
    price: "$9.99",
    reviews: "23",
    starRating: "3",
    link: "/",
    imageUrl:
      "https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/s/m/smok-morph_2-default_2.png",
  },
  {
    title: "Super item number six",
    price: "$4.67",
    reviews: "1",
    starRating: "4.5",
    link: "/",
    imageUrl:
      "https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/s/m/smok-morph_2-default_2.png",
  },
  {
    title: "Super item number seven",
    price: "$56.99",
    reviews: "234",
    starRating: "5",
    link: "/",
    imageUrl:
      "https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/s/m/smok_-_nord_4_-_leather_colors.png",
  },
  {
    title: "Super item number eight",
    price: "$51.99",
    reviews: "34",
    starRating: "5",
    link: "/",
    imageUrl:
      "https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/s/m/smok_nord_replacement_coils.jpg",
  },
  {
    title: "Super item number the last",
    price: "$51.99",
    reviews: "67",
    starRating: "5",
    link: "/",
    imageUrl:
      "https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/s/m/smok_rpm_replacement_coils.jpg",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SectionCarouselTwo() {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && carousel.current !== null) {
      return carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current;
    }

    return false;
  };

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
    <div className="bg-skin-gray">
      <div className="container mx-auto">
        <div className="carousel mx-auto py-14 px-10 md:px-0 relative">
          <Heading className="text-2xl  font-semibold text-skin-base text-center mb-12">
            BESTSELLERS
          </Heading>
          <button
            type="button"
            onClick={movePrev}
            className="font-mediumtext-skin-base
                    w-10 h-full text-center
                    disabled:opacity-25 disabl
                    ed:cursor-not-allowed
                    z-10 p-0 m-0 transition-all
                    ease-in-out duration-300
                    absolute top-0 left-0 md:-left-10"
            disabled={isDisabled("prev")}
          >
            <ChevronLeftIcon className="font-medium" />
            <span className="sr-only">Prev</span>
          </button>
          <div className="relative overflow-hidden my-10 flex items-center">
            <div
              ref={carousel}
              className="carousel-container flex relative  gap-5 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
            >
              {resources.map((resource) => {
                return (
                  <div
                    key={resource.link}
                    className="carousel-item text-center snap-start relative"
                  >
                    <div>
                      <Link
                        href={resource.link}
                        className="h-60 w-60 md:h-60 md:w-60 aspect-square block bg-contain bg-no-repeat z-0 relative"
                        style={{ backgroundImage: `url(${resource.imageUrl || ""})` }}
                      >
                        <ImageTag
                          src={resource.imageUrl || ""}
                          alt={resource.title}
                          className="h-full w-full aspect-square hidden"
                        />
                      </Link>

                      <div className="mt-3">
                        <Link href="/">
                          <a className="text-skin-muted text-sm font-medium mt-2 hover:text-skin-primary hover:underline break-words">
                            {resource.title}
                          </a>
                        </Link>
                        <SubHeading className="text-skin-muted font-sm font-semibold  my-1">
                          {resource.price}
                        </SubHeading>
                        <div className="mr-1 flex items-center justify-center text-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                resources.starRating > rating ? "text-yellow-400" : "text-gray-800",
                                "h-5 w-5 flex-shrink-0"
                              )}
                              aria-hidden="true"
                            />
                          ))}
                          <span className="text-skin-muted font-normal ml-2 text-sm">
                            {resource.reviews} Reviews
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-[50px] text-center transition-opacity duration-300 opacity-0 hover:opacity-100 quick-view w-full hidden md:flex justify-center mt-14">
                      <Link href={resource.link}>
                        <a className="text-sm hidden md:inline-flex items-center px-5 py-2 border border-skin-secondary shadow-sm text-skin-inverted hover:text-skin-primary bg-skin-secondary hover:bg-skin-button-secondary-hover">
                          QUICK VIEW
                        </a>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            type="button"
            onClick={moveNext}
            className="text-skin-base w-10 h-full text-center
                     disabled:opacity-25 disabled:cursor-not-allowed
                     z-10 p-0 m-0 transition-all ease-in-out
                     duration-300 absolute top-0 right-0 md:-right-10"
            disabled={isDisabled("next")}
          >
            <ChevronRightIcon />
            <span className="sr-only">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SectionCarouselTwo;
