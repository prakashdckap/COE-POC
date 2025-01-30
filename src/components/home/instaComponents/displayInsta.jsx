import PropTypes from "prop-types";
import DisplayMainMedia, { DisplaySideMedia } from "./displayMedia";

function DisplayInstaList({
  instagram,
  setOpen,
  setDetailsForPopup,
  setPopupIndex,
  setGroupIndex,
}) {
  return (
    <div className="gap-[10px]" id="insta-section-desktop">
      {instagram.map((images, j) => {
        // if condition is for display insta main images UI at Left side
        if (j % 2 === 0) {
          return (
            <>
              <div className="flex justify-between">
                <div className="relative basis-[40%] xl:basis-[40%] md:basis-[50%] sm:basis-[50%] mr-1 sm:mr-1 md:mr-2 mb-1 sm:mb-1 md:mb-2">
                  {images[0] &&
                  (images[0]?.medium_image_url || images[0]?.standard_resolution_url) ? (
                    <DisplayMainMedia
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
                <div className="flex flex-wrap basis-[60%] xl:basis-[60%] md:basis-[50%] sm:basis-[50%] justify-between">
                  {images.map((val, i) => {
                    if (i > 0 && (val?.medium_image_url || val?.standard_resolution_url))
                      return (
                        <DisplaySideMedia
                          imageUrl={`https:${val.medium_image_url}`}
                          key={`https:${val.medium_image_url}`}
                          videoUrl={`https:${val?.standard_resolution_url}`}
                          handleOnClick={() => {
                            setOpen(true);
                            setDetailsForPopup(val);
                            setGroupIndex(j);
                            setPopupIndex(i);
                          }}
                          type={val?.media_type}
                        />
                      );
                    return <></>;
                  })}
                </div>
              </div>
            </>
          );
        }
        // else condition is for display insta main images UI at Right side
        return (
          <>
            <div className="flex justify-between">
              <div className="flex flex-wrap justify-between basis-[60%] xl:basis-[60%] md:basis-[50%] sm:basis-[50%]">
                {images.map((val, i) => {
                  if (i > 0 && (val?.medium_image_url || val?.standard_resolution_url))
                    return (
                      <DisplaySideMedia
                        imageUrl={`https:${val.medium_image_url}`}
                        key={`https:${val.medium_image_url}`}
                        videoUrl={`https:${val?.standard_resolution_url}`}
                        handleOnClick={() => {
                          setOpen(true);
                          setDetailsForPopup(val);
                          setGroupIndex(j);
                          setPopupIndex(i);
                        }}
                        type={val?.media_type}
                      />
                    );
                  return <></>;
                })}
              </div>
              <div className="relative basis-[40%] xl:basis-[40%] md:basis-[50%] sm:basis-[50%] ml-1 sm:ml-1 md:ml-2 mb-1 sm:mb-1 md:mb-2">
                {images[0] &&
                (images[0]?.medium_image_url || images[0]?.standard_resolution_url) ? (
                  <DisplayMainMedia
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
            </div>
          </>
        );
      })}
    </div>
  );
}

DisplayInstaList.defaultProps = {
  instagram: [],
};

DisplayInstaList.propTypes = {
  setOpen: PropTypes.func.isRequired,
  setDetailsForPopup: PropTypes.func.isRequired,
  setPopupIndex: PropTypes.func.isRequired,
  setGroupIndex: PropTypes.func.isRequired,
  instagram: PropTypes.arrayOf(),
};

export default DisplayInstaList;
