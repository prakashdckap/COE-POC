import { Fragment, useEffect, useRef, useState } from "react";
import { getToken } from "firebase/messaging";
import Paragraph from "../../../../../theme-files/paragraph";
import { AxiosGet, AxiosGraphQL } from "../../../../../helper/axios";
import { SET_NOTIFICATION } from "../../../../../redux/actions";
import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
const { messaging } = require("../../../../../utils/firebase");
import { useRouter } from "next/router";
import { getBrowserName, getDeviceType } from "../../../../../utils/getbrowsername";
import { getDialogPosition, handleRemindMeLater, NotificationLoader } from "./notificationHelper";
import { handleFocusOnId } from "../../../../header/layout/layout-two/elements/adaSkipSections";

function PushNotification() {
  const agreeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const remindRef = useRef(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const customerToken = useSelector((state) => state.customerToken);
  const legalPopupStatus = useSelector((state) => state.legalPopupStatus);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    promptPosition: "right",
    promptDelay: null,
    promptText: "Shall we send you a message when we have discounts available?",
    availablePages: [],
    successMessage: "",
    isEnabled: false,
  });

  // Close modal dialog
  const closeModal = () => {
    dialogRef.current?.close();
    setOpen(false);
    setIsNotificationOpen(false);
    handleFocusOnId("privacy-policy");
  };

  // Fetch notification configuration
  async function fetchNotificationConfig() {
    try {
      const { getAmastyPushNotificationConfig } = await AxiosGet("pushNotificationConfigRequest", {
        name: "notification",
      });
      setConfig((prevConfig) => ({
        ...prevConfig,
        promptPosition: getAmastyPushNotificationConfig?.prompt_position || "right",
        promptDelay: parseInt(getAmastyPushNotificationConfig?.prompt_delay, 10) || 0,
        promptText: getAmastyPushNotificationConfig?.prompt_text || "",
        availablePages: getAmastyPushNotificationConfig?.prompt_available_pages || [],
        isEnabled: getAmastyPushNotificationConfig?.isEnabled || prevConfig.isEnabled,
        successMessage: "Thank you. You have been successfully subscribed",
      }));
    } catch (error) {
      console.error("Error fetching notification config:", error);
    }
  }

  useEffect(() => {
    fetchNotificationConfig();
  }, []);

  // Check if the notification should be open based on timing and config
  useEffect(() => {
    const popupClosedAt = localStorage.getItem("popupClosedAt");
    const preventPopupValue = localStorage.getItem("preventPopup");

    const currentTime = Date.now();

    const checkPermissionAndShowNotification = async () => {
      const permission = Notification.permission;

      if (permission === "default") {
        localStorage.removeItem("preventPopup");
        if (popupClosedAt) {
          const popupClosedTime = parseInt(popupClosedAt, 10);
          const promptDelayInMillis = 60 * 1000;
          const timeElapsed = currentTime - popupClosedTime;

          if (config.promptDelay) {
            setTimeout(() => {
              setIsNotificationOpen(timeElapsed >= promptDelayInMillis);
            }, config.promptDelay * 1000);
          } else if (config.promptDelay == 0) {
            setIsNotificationOpen(timeElapsed >= promptDelayInMillis);
          }
        } else {
          if (config.promptDelay) {
            setTimeout(() => {
              setIsNotificationOpen(true);
            }, config.promptDelay * 1000);
          } else if (config.promptDelay == 0) {
            setIsNotificationOpen(true);
          }
        }
      } else {
        if (preventPopupValue) {
          setIsNotificationOpen(false);
          return;
        }
      }
    };

    checkPermissionAndShowNotification();
  }, [config.promptDelay]);

  useEffect(() => {
    if (config?.isEnabled) {
      const deviceType = getDeviceType(config?.devices_available_prompt);
      if (!config.availablePages.includes(router.pathname) && !config.isEnabled && deviceType) {
        setIsNotificationOpen(false);
      }
    }
  }, [config.availablePages, router.pathname, config.isEnabled]);

  // Handle user allowing notifications
  const handleAllow = async () => {
    const token = await getToken(messaging(), {
      vapidKey:
        "BDqFQ0c4zUaATMlRqqMRcyxHsA8cFRt4poP_S0iM3dT0Zmc_H5DoQRRblv9IT_NHccgDZ5c0cr6-DDCM0UtQok4",
    });

    if (token) {
      setIsNotificationOpen(false);
      setLoading(true);
      try {
        const response = await AxiosGraphQL("storeAmastySubscriber", {
          allow: true,
          token,
          visitor_id: Math.floor(Math.random() * 100000000),
          source: getBrowserName(),
          customer_id: customerToken ? customerToken : null,
        });
        const messageText = response?.data?.storeAmastySubscriber?.message;
        if (messageText) {
          setOpen(true);
          setConfig((prevConfig) => ({ ...prevConfig, successMessage: messageText }));
          localStorage.setItem("preventPopup", true);
          closeModal();
          setIsNotificationOpen(false);
        }
      } catch (error) {
        setIsNotificationOpen(true);
        console.error("Error in handleAllow:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle notification permission request
  const handleNotificationClick = async () => {
    if (!("Notification" in window)) {
      dispatch(
        SET_NOTIFICATION({
          status: true,
          message: "This browser does not support desktop notifications",
          type: "warning",
        })
      );
      setLoading(false);
      return;
    }

    try {
      setIsNotificationOpen(false);
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setIsNotificationOpen(false);
        await handleAllow();
      } else {
        setIsNotificationOpen(false);
        dispatch(
          SET_NOTIFICATION({
            status: true,
            message: "Notification permission denied. Please check your browser settings.",
            type: "warning",
          })
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  /** ######### @ADA compliance DO NOT REMOVE ######### */

  useEffect(() => {
    if (isNotificationOpen && !legalPopupStatus) {
      dialogRef.current.focus();
    }
  }, [isNotificationOpen, legalPopupStatus]);

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      // Shift key pressed for reverse tabbing
      if (event.shiftKey) {
        if (document.activeElement === agreeButtonRef.current) {
          dialogRef.current?.focus();
          event.preventDefault();
        } else if (document.activeElement === dialogRef.current) {
          agreeButtonRef.current?.focus();
          event.preventDefault();
        }
      } else {
        // Regular tabbing
        if (document.activeElement === dialogRef.current) {
          agreeButtonRef.current?.focus();
          event.preventDefault();
        } else if (document.activeElement === agreeButtonRef.current) {
          closeRef.current?.focus();
          event.preventDefault();
        } else if (document.activeElement === remindRef.current) {
          agreeButtonRef.current?.focus();
          event.preventDefault();
        } else if (document.activeElement === remindRef.current) {
          agreeButtonRef.current?.focus();
          event.preventDefault();
        }
      }
    } else if (event.key === "Escape") {
      closeModal();
    }
  };
  /** ######### @ADA compliance DO NOT REMOVE ######### */

  if (isNotificationOpen || open)
    return (
      <div role="alertdialog" onKeyDown={handleKeyDown} tabIndex={0}>
        {isNotificationOpen && (
          <dialog
            ref={dialogRef}
            className="footer-notification focus:outline-none"
            open={isNotificationOpen}
            style={{
              ...getDialogPosition(config.promptPosition),
            }}
          >
            <div className="notification-content">
              <button
                className="footer-close"
                onClick={closeModal}
                type="button"
                aria-label="Notification Close"
                tabIndex={2}
                ref={closeRef}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                  <path d="M 39.486328 6.9785156 A 1.50015 1.50015 0 0 0 38.439453 7.4394531 L 24 21.878906 L 9.5605469 7.4394531 A 1.50015 1.50015 0 0 0 8.484375 6.984375 A 1.50015 1.50015 0 0 0 7.4394531 9.5605469 L 21.878906 24 L 7.4394531 38.439453 A 1.50015 1.50015 0 1 0 9.5605469 40.560547 L 24 26.121094 L 38.439453 40.560547 A 1.50015 1.50015 0 1 0 40.560547 38.439453 L 26.121094 24 L 40.560547 9.5605469 A 1.50015 1.50015 0 0 0 39.486328 6.9785156 z" />
                </svg>
              </button>
              <p className="footer-message">{config.promptText}</p>
              <div className="footer-answer-wrapper">
                <button
                  className="footer-defer"
                  onClick={() => {
                    closeModal();
                    handleRemindMeLater(setIsNotificationOpen);
                  }}
                  role="button"
                  tabIndex={3}
                  ref={remindRef}
                >
                  Remind me later
                </button>
                <button
                  className="footer-submit rounded-[2px] transition-all ease-in-out duration-300 w-[110px] border-2 font-semibold py-2 hover:text-white"
                  onClick={handleNotificationClick}
                  ref={agreeButtonRef}
                  tabIndex={1}
                  aria-label="Allow Notification"
                >
                  Allow
                  {loading && <NotificationLoader />}
                </button>
              </div>
            </div>
          </dialog>
        )}

        {open && (
          <Dialog
            as="div"
            className="fixed z-[99999] inset-0 overflow-y-auto"
            onClose={() => setOpen(false)}
            open={open}
          >
            <div className="flex text-center md:block md:px-2 lg:px-4">
              <div
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay
                  className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity md:block"
                  style={{ display: "block" }}
                />
              </div>
              <span aria-hidden="true">&#8203;</span>
              <div
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <div className="flex text-base justify-center text-left transform transition w-full md:inline-block md:px-4 md:my-8 md:align-middle mt-6 md:max-w-md">
                  <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 w-4/5 md:w-auto">
                    <button
                      type="button"
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="w-full mt-2">
                      <Paragraph className="text-center text-sm font-medium mt-8 w-full whitespace-pre-line">
                        {config.successMessage}
                      </Paragraph>
                      <div className="flex justify-center">
                        <button
                          onClick={() => setOpen(false)}
                          type="button"
                          className="mt-4 bg-skin-secondary uppercase border border-transparent py-1 px-4 text-sm font-medium text-skin-inverted hover:text-skin-primary hover:border-skin-secondary hover:bg-skin-inverted"
                          autoFocus
                          aria-label={config.successMessage}
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
        )}
      </div>
    );
}

export default PushNotification;
