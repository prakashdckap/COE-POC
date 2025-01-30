import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import Paragraph from "../../../../theme-files/paragraph";
import SubHeading from "../../../../theme-files/sub-heading";
import { SET_NOTIFICATION } from "../../../../redux/actions";
import base64Convert from "../../../../utils/base64Convert";

export default function ImageUploadVerification({ setfileUploadValues }) {
  const dispatch = useDispatch();

  // Function to handle uploaded file
  const handleFileUploadSize = (event) => {
    const UploadFieldID = "file-upload";
    const MaxSizeInBytes = 26214400;
    const extension = event?.target?.value
      .substr(event?.target?.value?.lastIndexOf("\\") + 1)
      .split(".")[1];
    const fld = document.getElementById(UploadFieldID);
    if (fld.files && fld.files.length === 1 && fld.files[0].size > MaxSizeInBytes) {
      dispatch(
        SET_NOTIFICATION({
          status: true,
          message: "File size exceeds 25MB",
          type: "error",
        })
      );
      // eslint-disable-next-line no-param-reassign
      event.target.value = null;
      return false;
    }
    if (
      extension !== "png" &&
      extension !== "jpeg" &&
      extension !== "gif" &&
      extension !== "pdf" &&
      extension !== "jpg"
    ) {
      dispatch(
        SET_NOTIFICATION({
          status: true,
          message: "Please upload file having extensions .jpeg/.jpg/.png/.gif only.",
          type: "error",
        })
      );
      // eslint-disable-next-line no-param-reassign
      event.target.value = null;
      setfileUploadValues({});
      return false;
    }
    base64Convert(event, setfileUploadValues);
    return true;
  };

  return (
    <div className="col-span-6 mt-16">
      <div className="  bg-[#fff7f6] p-5 border-2 border-t-4 border-[#A80F16] rounded-md">
        <div className="flex">
          <ExclamationCircleIcon className="h-5 w-14 text-[#A80F16] mr-3 " />

          <Paragraph className="text-[#A80F16] leading-5 text-[13px]">
            Your order requires manual human verification check. Please upload a picture of a
            non-expired government-issued I.D. such as Driver’s License or Passport matching the
            full name provided during checkout to proceed.
            <Paragraph className="mt-3 text-[13px]">
              Make sure the details on the image is clearly visible to expedite the process. This
              will be a One-Time Procedure if you have a registered account with us. To read more
              about our Age Policy,{" "}
              <a href="/age-policy" target="_blank">
                <span className="hover:underline font-semibold cursor-pointer">
                  {" "}
                  please click here.
                </span>
              </a>
            </Paragraph>
          </Paragraph>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 border-2 border-gray-300  p-5 mt-8">
        <SubHeading className="col-span-12 font-semibold text-sm text-[13px]">
          Required Upload
        </SubHeading>
        <form className=" col-span-12 border-2 border-dotted border-gray-400 p-4 bg-[#f6f6f6] ">
          <label>
            <span className="font-semibold text-[13px]">
              Upload Non-Expired Government-Issued I.D.
            </span>
            <input
              type="file"
              //   accept=".pdf, .jpeg, .jpg, .png, .gif"
              id="file-upload"
              onChange={(e) => handleFileUploadSize(e)}
              className="mt-2 text-[12px]"
              //   value={null}
            />
          </label>
          <span className=" text-[12px] text-gray-700 italic block mt-2">
            Max Filesize: 25MB, Allowed file types: .jpeg, .png, .gif, .pdf
          </span>
        </form>
      </div>
    </div>
  );
}

ImageUploadVerification.defaultProps = {
  setfileUploadValues: {},
};
ImageUploadVerification.propTypes = {
  setfileUploadValues: PropTypes.shape({
    file: PropTypes.string,
    fileType: PropTypes.string,
  }),
};
