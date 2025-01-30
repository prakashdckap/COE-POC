import Link from "next/link";
import PropTypes from "prop-types";
import ImageTag from "../../theme-files/image";

function SectionBannerTwo({ cardSectionTwoLeft, cardSectionTwoRight }) {
  // Left Block
  const leftImage = cardSectionTwoLeft?.content?.find((item) => item?.type === "singleImage")
    ?.urls[0]?.url;
  const leftName = cardSectionTwoLeft?.content?.find((item) => item?.type === "textField")?.value;
  const leftButton = cardSectionTwoLeft?.content?.find((item) => item?.type === "button")?.value;
  const leftRedirection = cardSectionTwoLeft?.content?.find(
    (item) => item?.type === "button"
  )?.href;

  // Right Block
  const rightImage = cardSectionTwoRight?.content?.find((item) => item?.type === "singleImage")
    ?.urls[0]?.url;
  const rightName = cardSectionTwoRight?.content?.find((item) => item?.type === "textField")?.value;
  const rightButton = cardSectionTwoRight?.content?.find((item) => item?.type === "button")?.value;
  const rightRedirection = cardSectionTwoRight?.content?.find(
    (item) => item?.type === "button"
  )?.href;

  return (
    <div className="container mx-auto py-[20px] md:py-0 lg:py-[60px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[20px] md:gap-y-0  md:gap-x-[20px]">
        {leftImage ? (
          <div className="relative">
            <div className="absolute inset-0">
              <ImageTag
                className="w-full h-full object-cover md:object-contain lg:object-cover"
                src={leftImage}
                alt={leftName + " " + leftButton}
              />
              <div className="absolute inset-0" aria-hidden="true" />
            </div>
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-12 banner-gradient">
              <h1 className="mb-5">
                <span className="text-2xl font-semibold mb-5 text-skin-base bg-skin-button-accent">
                  {leftName}
                </span>
              </h1>
              <Link href={leftRedirection}>
                <a
                  type="button"
                  aria-label={leftName + " " + leftButton}
                  className="text-sm uppercase font-medium inline-flex items-center px-10 py-2 border border-transparent shadow-sm text-skin-base transition-all duration-500 hover:text-skin-inverted bg-skin-button-accent hover:bg-skin-button-accent-hover focus:bg-skin-button-accent-hover focus:text-skin-inverted"
                >
                  {leftButton}
                </a>
              </Link>
            </div>
          </div>
        ) : null}

        {rightImage ? (
          <div className="relative">
            <div className="absolute inset-0">
              <ImageTag
                className="w-full h-full object-cover md:object-contain lg:object-cover"
                src={rightImage}
                alt={rightName + " " + rightButton}
              />
              <div className="absolute inset-0" aria-hidden="true" />
            </div>
            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-12 banner-gradient">
              <h1 className="mb-5">
                <span className="text-2xl font-semibold mb-5 text-skin-base bg-skin-button-accent">
                  {rightName}
                </span>
              </h1>
              <Link href={rightRedirection}>
                <a
                  type="button"
                  aria-label={rightName + " " + rightButton}
                  className="text-sm uppercase font-medium inline-flex items-center px-10 py-2 border border-transparent shadow-sm text-skin-base transition-all duration-500 hover:text-skin-inverted bg-skin-button-accent hover:bg-skin-button-accent-hover focus:bg-skin-button-accent-hover focus:text-skin-inverted"
                >
                  {rightButton}
                </a>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

SectionBannerTwo.defaultProps = {
  cardSectionTwoLeft: [],
  cardSectionTwoRight: [],
};

SectionBannerTwo.propTypes = {
  cardSectionTwoLeft: PropTypes.arrayOf(),
  cardSectionTwoRight: PropTypes.arrayOf(),
};

export default SectionBannerTwo;
