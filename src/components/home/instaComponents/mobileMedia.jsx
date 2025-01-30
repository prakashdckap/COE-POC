import { VideoCamera } from "heroicons-react";
import PropTypes from "prop-types";
import ImageTag from "../../../theme-files/image";
import instaIcon from "../../../../public/icons/instagram-brands.svg";

function DisplayMainMediaMobile({ imageUrl, videoUrl, handleOnClick, type }) {
  return type === "image" ? (
    <div className="fill-image mb-2">
      <div className="flex items-center justify-center h-full bg-white overlap-image">
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
    <div className="fill-image mb-2">
      <div className="w-full h-full absolute">
        <div className="bg-black h-full mb-32 flex justify-end items-end flex-col-reverse">
          <VideoCamera className="w-8 h-6 text-white" />
        </div>
      </div>
      <div className="parentDiv">
        <video
          src={videoUrl}
          className="videoInsert"
          key={videoUrl}
          autoPlay={false}
          muted
          onMouseEnter={(e) => {
            e.target.className = "object-cover opacity-40";
          }}
          onMouseLeave={(e) => {
            e.target.className = "object-cover";
          }}
          onClick={handleOnClick}
        >
          Video is currently unavailable
        </video>
      </div>
    </div>
  );
}

export function DisplaySideMediaMobile({ imageUrl, videoUrl, handleOnClick, type }) {
  return type === "image" ? (
    <div className="relative insta-right-product basis-[49%] md:basis-[49%] mb-2 md:mb-2">
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
    <div className="relative basis-[49%] md:basis-[49%] mb-1 md:mb-2">
      <div className="w-full h-full absolute">
        <div className="bg-black h-full mb-32 flex justify-end items-end flex-col-reverse">
          <VideoCamera className="w-8 h-6 text-white" />
        </div>
      </div>
      <div className="parentDiv">
        <video
          src={videoUrl}
          key={videoUrl}
          className="videoInsert"
          autoPlay={false}
          onMouseEnter={(e) => {
            e.target.className = "object-cover opacity-40";
          }}
          onMouseLeave={(e) => {
            e.target.className = "object-cover";
          }}
          loop
          muted
          onClick={handleOnClick}
        >
          Video is currently unavailable
        </video>
      </div>
    </div>
  );
}

DisplayMainMediaMobile.defaultProps = {
  imageUrl: "",
  videoUrl: "",
  type: "",
};

DisplayMainMediaMobile.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  imageUrl: PropTypes.string,
  videoUrl: PropTypes.string,
  type: PropTypes.string,
};

DisplaySideMediaMobile.defaultProps = {
  imageUrl: "",
  videoUrl: "",
  type: "",
};

DisplaySideMediaMobile.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  imageUrl: PropTypes.string,
  videoUrl: PropTypes.string,
  type: PropTypes.string,
};

export default DisplayMainMediaMobile;
