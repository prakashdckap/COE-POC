import axios from "axios";
import { useEffect, useRef, useState } from "react";
import HtmlParser from "react-html-parser";
import PropTypes from "prop-types";
import LoadingSpinner from "../../../../helper/loading-spinner";

const ModalContent = ({ isOpen, onClose, content }) => {
  const dialogRef = useRef();
  const [header, setHeader] = useState("Terms & Conditions");
  const [cmsPageObj, setCmsPageObj] = useState("");
  const [loading, setLoading] = useState(false);
  const [hostName, setHostName] = useState("");

  const closeModal = () => {
    dialogRef?.current?.close();
    setLoading(false);
    onClose();
  };

  const htmlToAscii = (htmlString) => {
    const title = new DOMParser().parseFromString(htmlString?.title, "text/html");
    const contentHtml = new DOMParser().parseFromString(htmlString?.content, "text/html");
    return { title: title.body.textContent, content: contentHtml.body.textContent };
  };

  const getCmsContent = (cmsId) => {
    setLoading(true);
    axios
      .post("/api/cms-page", { id: cmsId })
      .then((response) => {
        setCmsPageObj(htmlToAscii(response.data.data.cmsPage));
      })
      .catch((err) => {
        return err;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (content === "terms") {
      setHeader("Terms & Conditions");
      getCmsContent(13);
    } else if (content === "policies") {
      setHeader("Privacy Policy");
      getCmsContent(17);
    }
    setHostName(`${window.location.protocol}//${window.location.host}/`);
  }, [content]);

  if (!loading && cmsPageObj?.content) {
    return (
      isOpen && (
        <>
          <div className="modals-overlay" onClick={closeModal} />
          <dialog ref={dialogRef} className="modal" open={isOpen}>
            <div className="modalContent">
              <button className="close" onClick={closeModal} type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="35"
                  height="35"
                  viewBox="0 0 48 48"
                >
                  <path d="M 39.486328 6.9785156 A 1.50015 1.50015 0 0 0 38.439453 7.4394531 L 24 21.878906 L 9.5605469 7.4394531 A 1.50015 1.50015 0 0 0 8.484375 6.984375 A 1.50015 1.50015 0 0 0 7.4394531 9.5605469 L 21.878906 24 L 7.4394531 38.439453 A 1.50015 1.50015 0 1 0 9.5605469 40.560547 L 24 26.121094 L 38.439453 40.560547 A 1.50015 1.50015 0 1 0 40.560547 38.439453 L 26.121094 24 L 40.560547 9.5605469 A 1.50015 1.50015 0 0 0 39.486328 6.9785156 z" />
                </svg>
              </button>
              <h1 className="modal-title">{cmsPageObj?.title || header}</h1>
              <div className="cms-content cms-page">
                {HtmlParser(
                  cmsPageObj?.content
                    ?.replaceAll("&gt;", ">")
                    ?.replaceAll("&lt;", "<")
                    ?.replaceAll('href="https://www.elementvape.com/', `href=${hostName}`)
                    ?.replaceAll("&amp;nbsp;", "")
                    ?.replaceAll('"', "")
                    ?.replaceAll("&amp;copy;", "©")
                    ?.replaceAll("/shippingtracking/index/index/", "/shippingtracking")
                )}
              </div>
            </div>
          </dialog>
        </>
      )
    );
  }
  if (loading) {
    return (
      <>
        <div className="modals-overlay flex justify-center" style={{ alignItems: "center" }}>
          <LoadingSpinner message="Loading" />
        </div>
      </>
    );
  }
  return "";
};

ModalContent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};
export default ModalContent;
