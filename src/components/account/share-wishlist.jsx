import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { ReplyIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import SHARE_WISHLIST from "./graphql/mutation/share-wishlist";
import Paragraph from "../../theme-files/paragraph";
import { SET_NOTIFICATION } from "../../redux/actions";
import LoadingSpinner from "../../helper/loading-spinner";

export default function Mysharelist() {
  const history = useRouter();
  const dispatch = useDispatch();
  const customerDetails = useSelector((state) => state.customerDetails);
  const [emails, setemails] = useState("");
  const [message, setmessage] = useState("");
  const [error, seterror] = useState(false);
  const [errorText, seterrorText] = useState("");
  const [shareWishlist, { loading: shareWishlistLoading }] = useMutation(SHARE_WISHLIST);

  // Form submit function
  const handleShareWishlist = (formData) => {
    if (formData)
      shareWishlist({
        variables: {
          wishlistId: customerDetails?.wishlistId,
          email: formData,
          message,
        },
      })
        .then((res) => {
          if (res?.data?.shareWishlist) {
            history?.push("/account/my-wishlist");
            dispatch(
              SET_NOTIFICATION({
                status: true,
                message: "Wishlist shared successfully",
                type: "success",
              })
            );
          }
        })
        .catch((err) => console.log(err));
  };

  // email validation
  const validateEmail = () => {
    const mail = emails?.replace(/ /g, "")?.split(",");
    let validateMailArr = [];
    mail.map((id) => {
      if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(id)) {
        seterror(false);
        seterrorText("");
        validateMailArr.push(id);
      } else {
        seterror(true);
        validateMailArr = [];
        if (!emails) {
          seterrorText("This is a required field.");
        } else {
          seterrorText(
            "Please enter valid email addresses, separated by commas. For example, johndoe@domain.com, johnsmith@domain.com."
          );
        }
        return false;
      }
      return false;
    });
    const formData = validateMailArr?.length && validateMailArr.join(",");
    if (formData) handleShareWishlist(formData);
  };

  return (
    <>
      <div className={shareWishlistLoading ? "opacity-40 pointer-events-none" : null}>
        <h4 className="uppercase border-b-2 border-[#282828] text-sm font-semibold pb-2.5">
          sharing information
        </h4>
        <div>
          <h5 className="text-[13px] font-semibold mt-5">
            Email addresses, separated by commas <span className="text-[#f00]">*</span>
          </h5>
          <textarea
            rows="4"
            cols="60"
            className={`${
              error ? "border-red-300" : "border-gray-300"
            } block p-2.5 w-full text-sm text-gray-900 border `}
            onChange={(e) => setemails(e.target.value)}
            value={emails}
          />
        </div>
        {error ? <Paragraph className="text-red-500 text-sm mt-2">{errorText}</Paragraph> : null}
        <div>
          <h5 className="text-[13px] font-semibold mt-5">Message</h5>
          <textarea
            rows="4"
            cols="60"
            className="block p-2.5 w-full text-sm text-gray-900 border border-gray-300"
            onChange={(e) => setmessage(e.target.value)}
            value={message}
          />
        </div>
        <div className="mt-1">
          <label className="text-[13px] cursor-pointer">
            <input type="checkbox" className="cursor-pointer mr-2" />
            Check here to link an RSS feed to your Wish List.
          </label>
        </div>
        <div className="flex justify-between items-start flex-wrap mt-[40px]">
          <button
            onClick={() => validateEmail()}
            type="button"
            className=" flex items-center justify-center uppercase text-xs px-3 py-2.5 border border-[#a80f16] shadow-sm text-skin-inverted hover:text-skin-primary bg-[#a80f16] align-middle ease-in-out duration-300 hover:border-black hover:text-black hover:bg-skin-button-secondary-hover w-full md:w-36"
          >
            {shareWishlistLoading ? <LoadingSpinner message="sharing" /> : "share wishlist"}
          </button>
          <button
            onClick={() => history?.push("/account/my-wishlist")}
            type="button"
            className="items-center px-3 py-2 text-xs border border-[#a80f16] shadow-sm text-skin-inverted hover:text-skin-primary bg-[#a80f16] align-middle ease-in-out duration-300 hover:border-black hover:text-black hover:bg-skin-button-secondary-hover w-full mt-3 md:w-20"
          >
            <i className="h-5 w-4 inline-block align-middle">
              <ReplyIcon />
            </i>{" "}
            Back
          </button>
        </div>
      </div>
    </>
  );
}
