import { validateEmail } from "./helper";

export default function useReviewFilterParams(id = "", filterArr = [], setClearAll = () => {}) {
  // question id for custom field review filters
  const easyId = 106826;
  const recommendationId = 106825;

  // Selected Option Retrieval Function
  const getSelectedOption = (label) => {
    const sortObj = filterArr?.find((obj) => obj.label === label);
    const selectedItem = sortObj?.listItems?.find((item) => item.selected);
    return selectedItem;
  };

  const handleGetBodyParams = () => {
    const body = {
      domain_key: id, // Product Id
      sortings: [
        {
          sort_by: "date",
          ascending: false,
        },
      ],
    };

    // SORTING
    if (getSelectedOption("sort")?.name?.toLowerCase() === "highest rating") {
      body.sortings = [
        {
          sort_by: "score",
          ascending: false,
        },
      ];
      setClearAll(true);
    }
    if (getSelectedOption("sort")?.name?.toLowerCase() === "lowest rating") {
      body.sortings = [
        {
          sort_by: "score",
          ascending: true,
        },
      ];
      setClearAll(true);
    }
    if (getSelectedOption("sort")?.name?.toLowerCase() === "helpful") {
      body.sortings = [
        {
          sort_by: "votes_up",
          ascending: false,
        },
      ];
      setClearAll(true);
    }

    // RATING
    if (
      getSelectedOption("rating") &&
      getSelectedOption("rating")?.name?.toLocaleLowerCase() !== "all"
    ) {
      body.scores = [getSelectedOption("rating").name];
      setClearAll(true);
    }

    // IMAGES AND VIDEOS
    if (
      getSelectedOption("images") &&
      getSelectedOption("images")?.name?.toLocaleLowerCase() !== "all"
    ) {
      body.pictured = true;
      setClearAll(true);
    }

    // CUSTOM OPTIONS
    if (
      getSelectedOption("ease_of_use") &&
      getSelectedOption("ease_of_use")?.name?.toLocaleLowerCase() !== "all"
    ) {
      if (body.crfs) {
        body.crfs = [
          ...body.crfs,
          {
            question_id: easyId,
            answers: [getSelectedOption("ease_of_use")?.value],
          },
        ];
        setClearAll(true);
      } else {
        body.crfs = [
          {
            question_id: easyId,
            answers: [getSelectedOption("ease_of_use")?.value],
          },
        ];
        setClearAll(true);
      }
    }

    if (
      getSelectedOption("recommendation_status") &&
      getSelectedOption("recommendation_status")?.name?.toLocaleLowerCase() !== "all"
    ) {
      if (body.crfs) {
        body.crfs = [
          ...body.crfs,
          {
            question_id: recommendationId,
            answers: [getSelectedOption("recommendation_status").name],
          },
        ];
        setClearAll(true);
      } else {
        body.crfs = [
          {
            question_id: recommendationId,
            answers: [getSelectedOption("recommendation_status").name],
          },
        ];
        setClearAll(true);
      }
    }

    return body;
  };

  // Create Review Form Validation
  const handleCreateReviewValidaton = (values) => {
    const { score, title, review, name, email } = values;
    if (score && title && review && name && email && validateEmail(email)) {
      return true;
    }

    return {
      score: !score,
      title: !title,
      review: !review,
      name: !name,
      email: !!(!email || !validateEmail(email)),
    };
  };

  return {
    handleGetBodyParams,
    handleCreateReviewValidaton,
  };
}
