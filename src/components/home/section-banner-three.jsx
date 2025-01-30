import PropTypes from "prop-types";
import Link from "next/link";
import ImageTag from "../../theme-files/image";
import SubHeading from "../../theme-files/sub-heading";

const SectionBannerThree = ({
  fourCardSectionOne,
  fourCardSectionTwo,
  fourCardSectionThree,
  fourCardSectionFour,
}) => {
  // 4-card-section-1
  const fourCardSectionOneImage = fourCardSectionOne?.content?.find(
    (item) => item?.type === "singleImage"
  )?.urls[0]?.url;
  const fourCardSectionOneName = fourCardSectionOne?.content?.find(
    (item) => item?.type === "textField"
  )?.value;
  const fourCardSectionOneButton = fourCardSectionOne?.content?.find(
    (item) => item?.type === "button"
  )?.value;
  const fourCardSectionOneRedirection = fourCardSectionOne?.content?.find(
    (item) => item?.type === "button"
  )?.href;

  // 4-card-section-2
  const fourCardSectionTwoImage = fourCardSectionTwo?.content?.find(
    (item) => item?.type === "singleImage"
  )?.urls[0]?.url;
  const fourCardSectionTwoName = fourCardSectionTwo?.content?.find(
    (item) => item?.type === "textField"
  )?.value;
  const fourCardSectionTwoButton = fourCardSectionTwo?.content?.find(
    (item) => item?.type === "button"
  )?.value;
  const fourCardSectionTwoRedirection = fourCardSectionTwo?.content?.find(
    (item) => item?.type === "button"
  )?.href;

  // 4-card-section-3
  const fourCardSectionThreeImage = fourCardSectionThree?.content?.find(
    (item) => item?.type === "singleImage"
  )?.urls[0]?.url;
  const fourCardSectionThreeName = fourCardSectionThree?.content?.find(
    (item) => item?.type === "textField"
  )?.value;
  const fourCardSectionThreeButton = fourCardSectionThree?.content?.find(
    (item) => item?.type === "button"
  )?.value;
  const fourCardSectionThreeRedirection = fourCardSectionThree?.content?.find(
    (item) => item?.type === "button"
  )?.href;

  // 4-card-section-4
  const fourCardSectionFourImage = fourCardSectionFour?.content?.find(
    (item) => item?.type === "singleImage"
  )?.urls[0]?.url;
  const fourCardSectionFourName = fourCardSectionFour?.content?.find(
    (item) => item?.type === "textField"
  )?.value;
  const fourCardSectionFourButton = fourCardSectionFour?.content?.find(
    (item) => item?.type === "button"
  )?.value;
  const fourCardSectionFourRedirection = fourCardSectionFour?.content?.find(
    (item) => item?.type === "button"
  )?.href;

  return (
    <div className="container mx-auto py-10 md:pt-0 md:py-14">
      <div className="grid  gap-y-10 md:gap-y-5  mini-banner-cover lg:gap-y-0 md:gap-x-[20px]">
        {fourCardSectionOneImage ? (
          <div className="relative mini-banner-size">
            <div className="absolute inset-0">
              <ImageTag
                className="w-full h-full object-cover"
                alt={fourCardSectionTwoName}
                src={fourCardSectionOneImage}
              />
              <div className="absolute inset-0" aria-hidden="true" />
            </div>
            <div className="relative banner-font-size">
              <div className="mb-[7px]">
                <SubHeading className="text-[24px] font-semibold text-skin-inverted w-[60%] md:w-[70%] lg:w-[100%]">
                  {fourCardSectionTwoName}
                </SubHeading>
              </div>
              <Link href={fourCardSectionTwoRedirection}>
                <a
                  aria-label={fourCardSectionTwoName + " Click to know more"}
                  className="inline-flex text-sm items-center font-medium banner-link border border-transparent shadow-sm text-skin-base transition-all duration-500 hover:text-skin-inverted bg-skin-button-accent hover:bg-skin-button-accent-hover focus:text-skin-inverted focus:bg-skin-button-accent-hover uppercase"
                >
                  Learn More
                </a>
              </Link>
            </div>
          </div>
        ) : null}

        {fourCardSectionTwoImage ? (
          <div className="relative">
            <div className="absolute inset-0">
              <ImageTag
                className="w-full h-full object-cover"
                alt={fourCardSectionOneName}
                src={fourCardSectionTwoImage}
              />
              <div className="absolute inset-0" aria-hidden="true" />
            </div>
            <div className="relative banner-font-size">
              <div className="mb-[7px]">
                <SubHeading className="text-[24px] font-semibold text-skin-inverted w-[40%] md:w-[50%] lg:w-[60%]">
                  {fourCardSectionOneName}
                </SubHeading>
              </div>
              <Link href={fourCardSectionOneRedirection}>
                <a
                  aria-label={fourCardSectionOneName}
                  className="inline-flex text-sm items-center font-medium banner-link border border-transparent shadow-sm text-skin-base transition-all duration-500 hover:text-skin-inverted bg-skin-button-accent hover:bg-skin-button-accent-hover focus:text-skin-inverted focus:bg-skin-button-accent-hover uppercase"
                >
                  {fourCardSectionOneButton}
                </a>
              </Link>
            </div>
          </div>
        ) : null}

        {fourCardSectionThreeImage ? (
          <div className="relative mini-banner-size">
            <div className="absolute inset-0">
              <ImageTag
                className="w-full h-full object-cover"
                alt={fourCardSectionThreeName}
                src={fourCardSectionThreeImage}
              />
              <div className="absolute inset-0" aria-hidden="true" />
            </div>
            <div className="relative  banner-font-size ">
              <div className="mb-[7px]">
                <SubHeading className="text-[24px] font-semibold text-skin-inverted mt-4">
                  {fourCardSectionThreeName}
                </SubHeading>
              </div>
              <Link href={fourCardSectionThreeRedirection}>
                <a
                  aria-label={fourCardSectionThreeName + " " + fourCardSectionThreeButton}
                  className="inline-flex text-sm items-center font-medium banner-link border border-transparent shadow-sm text-skin-base transition-all duration-500 hover:text-skin-inverted bg-skin-button-accent hover:bg-skin-button-accent-hover focus:text-skin-inverted focus:bg-skin-button-accent-hover uppercase"
                >
                  {fourCardSectionThreeButton}
                </a>
              </Link>
            </div>
          </div>
        ) : null}

        {fourCardSectionFourImage ? (
          <div className="relative mini-banner-size">
            <div className="absolute inset-0">
              <ImageTag
                className="w-full h-full object-cover"
                alt={fourCardSectionFourName}
                src={fourCardSectionFourImage}
              />
              <div className="absolute inset-0" aria-hidden="true" />
            </div>
            <div className="relative banner-font-size">
              <div className="mb-[7px]">
                <SubHeading className="text-[24px] font-semibold text-skin-inverted mt-4">
                  {fourCardSectionFourName}
                </SubHeading>
              </div>
              <Link href={fourCardSectionFourRedirection}>
                <a
                  aria-label={fourCardSectionFourName + " " + fourCardSectionFourButton}
                  className="inline-flex text-sm items-center font-medium banner-link border border-transparent shadow-sm text-skin-base transition-all duration-500 hover:text-skin-inverted bg-skin-button-accent hover:bg-skin-button-accent-hover focus:text-skin-inverted focus:bg-skin-button-accent-hover uppercase"
                >
                  {fourCardSectionFourButton}
                </a>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

SectionBannerThree.defaultProps = {
  fourCardSectionOne: [],
  fourCardSectionTwo: [],
  fourCardSectionThree: [],
  fourCardSectionFour: [],
};

SectionBannerThree.propTypes = {
  fourCardSectionOne: PropTypes.arrayOf(),
  fourCardSectionTwo: PropTypes.arrayOf(),
  fourCardSectionThree: PropTypes.arrayOf(),
  fourCardSectionFour: PropTypes.arrayOf(),
};

export default SectionBannerThree;
