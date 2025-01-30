import { useState, useEffect } from "react";

const useBannerUpdateLink = () => {
  const [hostName, setHostName] = useState("");

  // UseEffect to get the hostName
  useEffect(() => {
    setHostName(`${window.location.protocol}//${window.location.host}`);
  }, []);

  // Function to update the banner link
  const getUpdatedBannerLink = (bannerLink) => {
    if (bannerLink) {
      const currentProtocolAndHost = hostName;
      let { pathname } = new URL(bannerLink);

      return currentProtocolAndHost + pathname;
    }
    return "";
  };

  return {
    getUpdatedBannerLink,
  };
};

export default useBannerUpdateLink;
