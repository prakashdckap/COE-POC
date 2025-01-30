import React, { useEffect, useState } from "react";
import {
  XCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  EmojiSadIcon,
} from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { XIcon } from "@heroicons/react/outline";

import { SET_NOTIFICATION } from "../../redux/actions";

export default function Notification() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  const [time, setTime] = useState(1);

  // Defining colors for success,warning and error notifications
  let icon;
  let progressColor;

  if (notification?.type?.toLowerCase() === "warning") {
    icon = <ExclamationCircleIcon className="h-10 w-10 text-yellow-500 " />;
    progressColor = "bg-yellow-500";
  } else if (notification?.type?.toLowerCase() === "error") {
    icon = <XCircleIcon className="h-10 w-10 text-red-500" />;
    progressColor = "bg-red-500";
  } else if (notification?.type?.toLowerCase() === "success") {
    icon = <CheckCircleIcon className="h-10 w-10 text-green-500" />;
    progressColor = "bg-green-500";
  } else {
    icon = <EmojiSadIcon className="h-10 w-10 text-indigo-500" />;
    progressColor = "bg-red-500";
  }

  // Displaying the popup for 4 Sec and closing it.
  useEffect(() => {
    let timeout;
    if (notification?.status && notification?.type !== "error") {
      timeout = setTimeout(() => {
        setTime(0);
        dispatch(SET_NOTIFICATION({ message: "", type: "", status: false }));
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [notification]);

  // Progress Bar
  useEffect(() => {
    let interval;
    if (notification?.status && notification?.type !== "error") {
      interval = setInterval(() => {
        if (time < 310) {
          setTime((prev) => prev + 1);
        }
      }, 10);
    }
    return () => clearInterval(interval);
  }, [time, notification]);

  if (notification?.status) {
    return (
      <div
        aria-live="assertive"
        role="region"
        aria-label="Notification"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-[51]"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end absolute top-0.5 right-0.5 ">
          <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">{icon}</div>
                <div className="ml-3 w-0 flex-1 pt-0.5" role="alert">
                  <p className="text-sm font-medium text-gray-900">
                    {notification?.type ? notification?.type?.toUpperCase() : "OOPS!"}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">{notification?.message || null}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    type="button"
                    onClick={() => {
                      setTime(0);
                      dispatch(
                        SET_NOTIFICATION({
                          message: "",
                          type: "",
                          status: false,
                        })
                      );
                    }}
                    aria-label="close-notification"
                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Loader */}
            {notification?.type === "error" ? null : (
              <div className="w-full bg-gray-200 h-1">
                <div
                  className={`h-2 ${progressColor}`}
                  style={{ width: `${(time / 310) * 100}%` }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export const scrolltoHash = (selector) => {
  //  to scroll for notification messages in any pages
  const element = document.getElementById(selector || "__next");
  element?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
};
