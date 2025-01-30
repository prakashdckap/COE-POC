import { easeOfUse, recommendFriend } from "./ReviewOptions";

export const getSocialIcons = (hostName) => {
  return [
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${hostName}`,
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      ),
      title: "Share on Facebook",
    },
    {
      name: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${hostName}`,
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
      title: "Share on Twitter",
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${hostName}`,
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
        </svg>
      ),
      title: "Share on LinkedIn",
    },
  ];
};

export const validateEmail = (email) => {
  const mail = email?.replace(/ /g, "")?.split(",");
  if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail)) {
    return true;
  }
  return false;
};

export const reviewArray = [
  {
    id: 1,
    label: "rating",
    defaultbuttonName: "Rating",
    buttonName: "Rating",
    listItems: [
      { name: "all", selected: false },
      { name: "5", selected: false },
      { name: "4", selected: false },
      { name: "3", selected: false },
      { name: "2", selected: false },
      { name: "1", selected: false },
    ],
  },
  {
    id: 2,
    label: "images",
    defaultbuttonName: "Images & Videos",
    buttonName: "Images & Videos",
    listItems: [
      { name: "all", selected: false },
      { name: "With Images & Videos", selected: false },
    ],
  },
  {
    id: 3,
    label: "recommendation_status",
    defaultbuttonName: "Recommendation Status",
    buttonName: "Recommendation Status",
    listItems: [
      { name: "all", selected: false },
      ...recommendFriend.map((recommend) => {
        return { name: recommend, selected: false };
      }),
    ],
  },
  {
    id: 4,
    label: "ease_of_use",
    defaultbuttonName: "Ease of Use",
    buttonName: "Ease of Use",
    listItems: [{ name: "all", selected: false }, ...easeOfUse],
  },
  {
    id: 5,
    label: "sort",
    defaultbuttonName: "sort",
    buttonName: "sort",
    listItems: [
      { name: "Select", selected: true },
      { name: "Newest", selected: false },
      { name: "Highest Rating", selected: false },
      { name: "Lowest Rating", selected: false },
      { name: "Helpful", selected: false },
    ],
  },
];

export const reviewErros = {
  score: false,
  title: false,
  review: false,
  name: false,
  email: false,
  vapeProducts: false,
};

export const errorText = {
  score: "Please enter a star rating for this review",
  title: "Review's title & body can't be empty",
  review: "Review's title & body can't be empty",
  name: " Name field cannot be empty",
  email: " Invalid email",
  vapeProducts: "Please fill out all of the mandatory (*) fields",
};
