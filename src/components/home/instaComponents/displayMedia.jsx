import { VideoCamera } from "heroicons-react";
import { useRef } from "react";
import PropTypes from "prop-types";
import ImageTag from "../../../theme-files/image";
import instaIcon from "../../../../public/icons/instagram-brands.svg";

function DisplayMainMedia({ imageUrl, videoUrl, handleOnClick, type }) {
  const videoRef = useRef(null);

  const handleReplay = () => {
    const video = videoRef.current;
    video.currentTime = 0;
    video.play();
  };

  const handlePause = () => {
    const video = videoRef.current;
    video.currentTime = 0;
    video.pause();
  };

  return type === "image" ? (
    <div className="h-full">
      <div className="flex items-center justify-center h-full bg-white">
        <ImageTag height={60} width={60} src={instaIcon} alt="logo" />
      </div>
      <div className="height-blk">
        <ImageTag
          className="object-cover"
          src={imageUrl}
          onMouseEnter={(e) => {
            e.target.className = "object-cover opacity-40";
          }}
          onMouseLeave={(e) => {
            e.target.className = "object-cover";
          }}
          onClick={handleOnClick}
          alt="img"
        />
      </div>
    </div>
  ) : (
    <div className="h-full">
      <div className="w-full h-full absolute">
        <div className="bg-black h-full mb-32 flex justify-end items-end flex-col-reverse">
          <VideoCamera className="w-8 h-6 text-white" />
        </div>
      </div>
      <div className="parentDiv">
        <video
          ref={videoRef}
          src={videoUrl}
          className="videoInsert object-cover opacity-70"
          key={videoUrl}
          autoPlay={false}
          loop
          muted
          onMouseEnter={handleReplay}
          onMouseLeave={handlePause}
          onClick={handleOnClick}
        >
          <track kind="captions" />
          Video is currently unavailable
        </video>
      </div>
    </div>
  );
}

export function DisplaySideMedia({ imageUrl, videoUrl, handleOnClick, type }) {
  const videoRef = useRef(null);

  const handleReplay = () => {
    const video = videoRef.current;
    video.currentTime = 0;
    video.play();
  };

  const handlePause = () => {
    const video = videoRef.current;
    video.currentTime = 0;
    video.pause();
  };

  return type === "image" ? (
    <div className="relative insta-right-product basis-[32.4%] xl:basis-[32.4%] md:basis-[49%] sm:basis-[49%] mb-1 sm:mb-1 md:mb-2">
      <div className="w-full h-full absolute">
        <div className="bg-white h-full mb-32 flex items-center justify-center">
          <ImageTag height={30} width={30} src={instaIcon} alt="logo" />
        </div>
      </div>
      <div className="height-blk">
        <ImageTag
          className="object-cover"
          height={320}
          width={320}
          key={imageUrl}
          src={imageUrl}
          alt="img"
          onMouseEnter={(e) => {
            e.target.className = "object-cover opacity-40";
          }}
          onMouseLeave={(e) => {
            e.target.className = "object-cover";
          }}
          onClick={handleOnClick}
        />
      </div>
    </div>
  ) : (
    <div className="relative basis-[32.4%] xl:basis-[32.4%] md:basis-[49%] sm:basis-[49%] mb-1 sm:mb-1 md:mb-2">
      <div className="w-full h-full absolute">
        <div className="bg-black h-full mb-32 flex justify-end items-end flex-col-reverse">
          <VideoCamera className="w-8 h-6 text-white" />
        </div>
      </div>
      <div className="parentDiv">
        <video
          ref={videoRef}
          src={videoUrl}
          key={videoUrl}
          className="videoInsert object-cover opacity-70"
          autoPlay={false}
          onMouseEnter={handleReplay}
          onMouseLeave={handlePause}
          loop
          muted
          onClick={handleOnClick}
          replay
        >
          <track kind="captions" />
          Video is currently unavailable
        </video>
      </div>
    </div>
  );
}

DisplayMainMedia.defaultProps = {
  imageUrl: "",
  videoUrl: "",
  type: "",
};

DisplayMainMedia.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  imageUrl: PropTypes.string,
  videoUrl: PropTypes.string,
  type: PropTypes.string,
};

DisplaySideMedia.defaultProps = {
  imageUrl: "",
  videoUrl: "",
  type: "",
};

DisplaySideMedia.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  imageUrl: PropTypes.string,
  videoUrl: PropTypes.string,
  type: PropTypes.string,
};

export default DisplayMainMedia;
