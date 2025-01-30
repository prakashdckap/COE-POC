import React, { useState } from "react";
import UnorderedList from "../../theme-files/unordered-list/index";
import ListItem from "../../theme-files/list-item/index";
import DeleteAccount from "./delete-account";
import DownloadPersonalData from "./download-personal-data";

export default function MyPrivacySettings() {
  const [clicked, setclicked] = useState({ deleteAccount: false, personal: false });

  return (
    <div className="lg:col-span-9 px-0 md:px-10">
      <UnorderedList role="list" className="flex flex-wrap">
        {/* PERSONAL DATA */}
        <ListItem
          key="download-personal-data"
          className="w-[220px] mr-7 sm:w-6/12 md:w-4/12 xl:w-3/12 col-span-1 bg-white rounded-lg divide-y divide-gray-200 mb-[20px] md:mb-0"
        >
          <div
            className={`${
              clicked?.personal ? "shadow-md shadow-[#b7dbf7]" : ""
            } flex flex-col items-center mb-2 rounded-2xl bg-[#E8F6FF] hover:border-[2px] hover:border-[#1979c2] ease-in-out duration-300  w-[220px] h-[220px]`}
            style={
              clicked?.personal ? { backgroundColor: "#3d9fe9" } : { backgroundColor: "#e8f6ff" }
            }
            onClick={() => setclicked({ ...clicked, personal: !clicked.personal })}
            onKeyPress={() => setclicked({ ...clicked, personal: !clicked.personal })}
            role="button"
            tabIndex="0"
          >
            <i className="my-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                fill={clicked?.personal ? "#fff" : "#c9e2f2"}
                className="bi bi-download"
                viewBox="0 0 100 100"
              >
                {" "}
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 10C0 4.47716 4.47715 0 10 0H90C95.5228 0 100 4.47715 100 10V90C100 95.5228 95.5229 100 90 100H10C4.47716 100 0 95.5229 0 90V10ZM11 8.5C11 9.88071 9.88071 11 8.5 11C7.11929 11 6 9.88071 6 8.5C6 7.11929 7.11929 6 8.5 6C9.88071 6 11 7.11929 11 8.5ZM19 8.5C19 9.88071 17.8807 11 16.5 11C15.1193 11 14 9.88071 14 8.5C14 7.11929 15.1193 6 16.5 6C17.8807 6 19 7.11929 19 8.5ZM24.5 11C25.8807 11 27 9.88071 27 8.5C27 7.11929 25.8807 6 24.5 6C23.1193 6 22 7.11929 22 8.5C22 9.88071 23.1193 11 24.5 11ZM55 49C55 49.5523 55.4477 50 56 50H62.8258C63.6801 50 64.141 51.0021 63.585 51.6508L50.7593 66.6142C50.3602 67.0798 49.6398 67.0798 49.2407 66.6142L36.415 51.6508C35.859 51.0021 36.3199 50 37.1742 50H44C44.5523 50 45 49.5523 45 49V31C45 30.4477 45.4477 30 46 30H54C54.5523 30 55 30.4477 55 31V49ZM34 77C34 75.3431 35.3431 74 37 74H63C64.6569 74 66 75.3431 66 77C66 78.6569 64.6569 80 63 80H37C35.3431 80 34 78.6569 34 77Z"
                  fill={`${clicked?.personal ? "white" : "#c9e2f2"}`}
                />
              </svg>
            </i>
            <h3
              className={`${
                clicked?.personal ? "text-white" : "text-black"
              } mb-8 text-[16px] text-center font-semibold px-5 `}
            >
              Download Personal Data
            </h3>
          </div>
          {clicked?.personal ? <DownloadPersonalData /> : null}
        </ListItem>

        {/* DELETE ACCOUNT */}
        <ListItem
          key="delete-account"
          className="w-[220px] sm:w-6/12 md:w-4/12 xl:w-3/12 col-span-1 bg-white rounded-lg divide-y divide-gray-200"
        >
          <div
            className={`${
              clicked.deleteAccount ? "shadow-md shadow-[#b7dbf7]" : ""
            } flex flex-col items-center mb-2 rounded-2xl bg-[#E8F6FF] hover:border-[2px] hover:border-[#1979c2] ease-in-out duration-300 w-[220px] h-[220px]`}
            style={
              clicked?.deleteAccount
                ? { backgroundColor: "#3d9fe9" }
                : { backgroundColor: "#e8f6ff" }
            }
            onClick={() => setclicked({ ...clicked, deleteAccount: !clicked.deleteAccount })}
            onKeyPress={() => setclicked({ ...clicked, deleteAccount: !clicked.deleteAccount })}
            role="button"
            tabIndex="0"
          >
            <i className="my-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="130"
                viewBox="0 0 78 100"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M39.0069 50.8178C50.8631 50.8178 60.4723 33.1048 60.4723 21.3255C60.4723 9.54788 50.8619 0 39.0069 0C27.1514 0 17.5414 9.54868 17.5414 21.3255C17.5422 33.1048 27.151 50.8178 39.0069 50.8178ZM54.6252 47.4707C54.5215 52.1366 39.0013 63.65 39.0013 63.65C39.0013 63.65 23.4794 52.1374 23.3726 47.4707C10.265 48.6596 0 59.6073 0 72.9431C0 85.6835 9.3694 86.3067 21.6332 86.3067C22.5747 86.3067 23.5522 86.3044 24.5264 86.3013L22.4841 84.2737C19.6993 81.506 19.6993 77.0044 22.4841 74.2383L26.8525 69.898C28.2012 68.5579 29.9945 67.82 31.9018 67.82C33.8099 67.82 35.6032 68.5578 36.9536 69.8988L38.9981 71.9309L41.0458 69.898C42.3945 68.5571 44.1894 67.8192 46.0975 67.8192C48.0056 67.8192 49.7989 68.5571 51.1453 69.8956L55.5161 74.2367C58.2986 77.0036 58.2986 81.506 55.5153 84.2721L53.473 86.2997C54.4434 86.3028 55.4185 86.3051 56.3608 86.3051C68.6274 86.3051 78 85.6804 78 72.9415C77.9977 59.6067 67.732 48.6596 54.6254 47.4711L54.6252 47.4707ZM46.0978 72.6133C46.6898 72.6133 47.2827 72.8388 47.7336 73.2868L52.1011 77.6263C53.0068 78.5269 53.0068 79.984 52.1011 80.8815L46.6414 86.3069L52.1011 91.7323C53.0068 92.6321 53.0068 94.0877 52.1011 94.9867L47.7343 99.327C47.2827 99.7758 46.6906 100.001 46.097 100.001C45.5033 100.001 44.9105 99.7758 44.4588 99.327L38.9983 93.9016L33.5378 99.327C33.0861 99.7758 32.4925 100.001 31.8996 100.001C31.3076 100.001 30.7147 99.7758 30.2615 99.327L25.8947 94.9859C24.9898 94.0877 24.9898 92.6322 25.8947 91.7323L31.3552 86.3069L25.8947 80.8815C24.9898 79.9825 24.9898 78.5269 25.8947 77.6271L30.2631 73.2884C30.7148 72.8396 31.3092 72.6141 31.9005 72.6141C32.4933 72.6141 33.0854 72.8396 33.5386 73.2884L38.9983 78.7138L44.4596 73.2876C44.9113 72.8388 45.5049 72.6133 46.0978 72.6133Z"
                  fill={`${clicked?.deleteAccount ? "white" : "#c9e2f2"}`}
                />
              </svg>
            </i>
            <h3
              className={`${
                clicked?.deleteAccount ? "text-white" : "text-black"
              } mb-8 text-[16px] capitalize text-center font-semibold px-5`}
            >
              Delete Account
            </h3>
          </div>
          {clicked?.deleteAccount ? <DeleteAccount /> : null}
        </ListItem>
      </UnorderedList>
    </div>
  );
}
