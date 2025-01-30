export const getHeadingFromPathname = (pathname) => {
  switch (pathname) {
    case "/account/my-orders":
      return "My Orders";
    case "/account/my-wishlist":
      return "My Wishlist";
    case "/account/address-book":
      return "Address Book";
    case "/account/add-address":
      return "Add New Address";
    case "/account/edit-address":
      return "Edit Address";
    case "/account/account-information":
      return "Edit Account Information";
    case "/account/privacy-settings":
      return "Privacy Settings";
    case "/account/newsletter-subscriptions":
      return "Newsletter Subscriptions";
    case "/account/store-credit-and-refunds":
      return "Store Credit & Refunds";
    case "/account/rewards":
    case "/account/rewards/share":
    case "/account/rewards/my-referrals":
    case "/account/rewards/history":
      return "My Rewards";
    default:
      return "My Account";
  }
};

export const validatePassword = (password) => {
  if (password?.length < 6) {
    return "Minimum length of this field must be equal or greater than 6 symbols. Leading and trailing spaces will be ignored.";
  }
  if (
    !/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/.test(password)
  ) {
    return "Minimum of different classes of characters in password is 4. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.";
  }
  return "";
};

export const validateConfirmPassword = (newPassword, confirmPassword) => {
  if (newPassword !== confirmPassword) {
    return "Password doesn't match";
  }
  return "";
};

export const getDefaultCountryAndRegion = (countries, regions, country, region) => {
  const defaultCountryObj = countries?.find((con) => con?.code === country);
  const defaultRegionObj = regions?.find((reg) => reg?.code === region?.code);
  return { defaultCountryObj, defaultRegionObj };
};

export const getTitleFromPathname = (pathname) => {
  switch (pathname) {
    case "/account/my-orders":
      return "My Orders";
    case "/account/my-wishlist":
      return "My Wishlist";
    case "/account/address-book":
      return "Address Book";
    case "/account/add-address":
      return "Add New Address";
    case "/account/edit-address":
      return "Edit Address";
    case "/account/account-information":
      return "Account Information";
    case "/account/privacy-settings":
      return "Privacy Settings";
    case "/account/newsletter-subscriptions":
      return "Newsletter Subscriptions";
    case "/account/store-credit-and-refunds":
      return "Store Credit & Refunds";
    case "/account/rewards":
    case "/account/rewards/share":
    case "/account/rewards/my-referrals":
    case "/account/rewards/history":
      return "My Reward Points";
    default:
      return "My Account";
  }
};
