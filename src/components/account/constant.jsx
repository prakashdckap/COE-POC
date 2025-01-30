const SideNavigation = [
  { name: "My Account", href: "/account", current: true },
  { name: "My Orders", href: "/account/my-orders", current: false },
  { name: "My Wish List", href: "/account/my-wishlist", current: false },
  { name: "Address Book", href: "/account/address-book", current: false },
  { name: "Account Information", href: "/account/account-information", current: false },
  { name: "Privacy Settings", href: "/account/privacy-settings", current: false },
  { name: "Newsletter Subscriptions", href: "/account/newsletter-subscriptions", current: false },
  { name: "Store Credit & Refunds", href: "/account/store-credit-and-refunds", current: false },
  { name: "My Reward Points", href: "/account/rewards", current: false },
];

const Rewards = [
  { name: "My points", href: "/account/rewards", current: true },
  { name: "Share & Save", href: "/account/rewards/share", current: false },
  { name: "My Referrals", href: "/account/rewards/my-referrals", current: false },
  { name: "History", href: "/account/rewards/history", current: false },
];
const exportObj = { SideNavigation, Rewards };

export default exportObj;
