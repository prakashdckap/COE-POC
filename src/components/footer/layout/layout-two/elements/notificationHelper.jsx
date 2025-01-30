// Handle the position of the popup
export const getDialogPosition = (promptPosition) => {
  switch (promptPosition) {
    case "left":
      return { right: "auto" };
    case "right":
      return { left: "auto" };
    case "top":
      return { top: 0, bottom: "auto" };
    case "bottom":
      return { bottom: 0, top: "auto" };
    case "center":
      return {
        left: "50%",
        bottom: 20,
        transform: "translateX(-50%)",
      };
    default:
      return { bottom: 0, top: "auto" };
  }
};

// Handle 'Remind me later' click
export const handleRemindMeLater = (setIsNotificationOpen) => {
  try {
    const currentTime = new Date().getTime();
    const delayUntil = currentTime + 60 * 1000;
    localStorage.setItem("popupClosedAt", delayUntil);
    setIsNotificationOpen(false);
  } catch (error) {
    const currentTime = new Date().getTime();
    const delayUntil = currentTime + 60 * 1000;
    localStorage.setItem("popupClosedAt", delayUntil);
  }
};

export const NotificationLoader = () => {
  return (
    <svg
      className="h-4 w-4 animate-spin loading-spinner inline-block align-middle"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};
