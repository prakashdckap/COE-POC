import PropTypes from "prop-types";
import DisplayMainMediaMobile, { DisplaySideMediaMobile } from "./mobileMedia";

function DisplayInstaMobile({
  instagram,
  setOpen,
  setDetailsForPopup,
  setPopupIndex,
  setGroupIndex,
}) {
  return (
    <div className="gap-[10px]" id="insta-section-mobile">
      {instagram.map((images, j) => {
        return (
          <>
            <div className="relative mb-3">
              {images[0] && (images[0]?.medium_image_url || images[0]?.standard_resolution_url) ? (
                <DisplayMainMediaMobile
                  imageUrl={`https:${images[0].medium_image_url}`}
                  videoUrl={`https:${images[0]?.standard_resolution_url}`}
                  handleOnClick={() => {
                    setOpen(true);
                    setDetailsForPopup(images[0]);
                    setGroupIndex(j);
                    setPopupIndex(0);
                  }}
                  type={images[0]?.media_type}
                />
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-wrap justify-between basis-[50%] md:basis-[50%]">
              {images.map((val, i) => {
                if (i > 0 && (val?.medium_image_url || val?.standard_resolution_url))
                  return (
                    <DisplaySideMediaMobile
                      imageUrl={`https:${val.medium_image_url}`}
                      key={`https:${val.medium_image_url}`}
                      videoUrl={`https:${val?.standard_resolution_url}`}
                      handleOnClick={() => {
                        setOpen(true);
                        setDetailsForPopup(val);
                        setGroupIndex(j);
                        setPopupIndex(0);
                      }}
                      type={val?.media_type}
                    />
                  );
                return <></>;
              })}
            </div>
          </>
        );
      })}
    </div>
  );
}

DisplayInstaMobile.defaultProps = {
  instagram: [],
};

DisplayInstaMobile.propTypes = {
  setOpen: PropTypes.func.isRequired,
  setDetailsForPopup: PropTypes.func.isRequired,
  setPopupIndex: PropTypes.func.isRequired,
  setGroupIndex: PropTypes.func.isRequired,
  instagram: PropTypes.arrayOf(),
};

export default DisplayInstaMobile;
