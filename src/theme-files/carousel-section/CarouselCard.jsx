import { SplideSlide } from "@splidejs/react-splide";
import { useRouter } from "next/router";
import StarRatings from "../../components/review/StarRatings";
import { QuoteSVG } from "./Assets/carouselAsset";

export default function CarouselCard({ reviews }) {
  const { asPath } = useRouter();

  const getDate = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <>
      {reviews?.map((review, i) => (
        <>
          <SplideSlide
            className={`${
              asPath === "/do-we-ship" ? "ship-review" : "customer-review"
            } w-[100%] sm:w-[50%]`}
            node={i}
          >
            <div
              className={`${asPath === "/do-we-ship" ? "" : "lg:hidden"} flex item-start flex-col`}
            >
              <div className="flex items-center justify-start basis-[30%]">
                <div className="flex items-center py-[2px] lg:py-[5px]">
                  <StarRatings
                    star={review.score}
                    className={`flex absolute top-0 left-0 w-[100%] text-[#fdc600]`}
                  />
                </div>
                <span className="text-[#6A6C77] text-xs italic pl-[132px] pt-1 tracking-wider">
                  {getDate(new Date(review.created_at))}{" "}
                </span>
              </div>
              <p className="review-para text-[#4f4f4f] text-[20px] font-[700] font-sans font-Montserrat">
                {review.title}
              </p>
              <div className="flex mt-2.5">
                <div className="h-24 w-24 inline-block mr-2">
                  <i className="h-[90px] w-[90px] p-[29px] inline-block border border-solid border-[#e1e5ee] rounded-full">
                    <QuoteSVG />
                  </i>
                </div>
                <li className="pb-[22px] flex-1">
                  <p
                    className="review-desc text-[#6A6C77] text-sm italic "
                    dangerouslySetInnerHTML={{ __html: review.content }}
                  />
                  <span className="text-[#737373] text-xs font-semibold leading-normal font-sans">
                    {review?.user?.display_name}
                  </span>
                </li>
              </div>
            </div>
            <div
              className={`hidden ${asPath === "/do-we-ship" ? "lg:hidden" : ""} lg:flex item-start`}
            >
              <div className="h-24 w-24 inline-block mr-2">
                <i className="h-[90px] w-[90px] p-[29px] inline-block border border-solid border-[#e1e5ee] rounded-full">
                  <QuoteSVG />
                </i>
              </div>
              <li className="pb-[22px] flex-1">
                <div className="flex items-center justify-start basis-[30%]">
                  <div className="flex items-center py-[2px] lg:py-[5px]">
                    <StarRatings
                      star={review.score}
                      className={`flex absolute top-0 left-0 w-[100%] text-[#fdc600]`}
                    />
                  </div>
                  <span className="text-[#6A6C77] text-xs italic pl-[132px] pt-1 tracking-wider">
                    {getDate(new Date(review.created_at))}{" "}
                  </span>
                </div>
                <div className="w-[300px] md:w-[280px]">
                  <p className="review-para text-[#4f4f4f] text-[18px] w-full font-[700] font-Montserrat">
                    {review.title}
                  </p>
                  <p
                    className="review-desc text-[#6A6C77] w-full text-sm italic"
                    dangerouslySetInnerHTML={{ __html: review.content }}
                  />
                  <span className="text-[#737373] text-xs font-bold leading-normal">
                    {review?.user?.display_name}
                  </span>
                </div>
              </li>
            </div>
          </SplideSlide>
        </>
      ))}
    </>
  );
}
