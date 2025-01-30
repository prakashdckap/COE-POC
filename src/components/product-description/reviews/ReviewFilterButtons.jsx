import React from "react";
import PropTypes from "prop-types";
import StarRatings from "../../review/StarRatings";

export default function ProductReviewFilterButtons({
  buttonName,
  defaultButtonName,
  listItems,
  id,
  selectedDropDown,
  setselectedDropDown,
  setfilterArr,
  filterArr,
  label,
}) {
  const handleSelectOption = (item) => {
    const dupArr = [...filterArr];
    const findObj = dupArr?.find((obj) => obj.id === selectedDropDown?.id);
    const parentIndex = dupArr?.indexOf(findObj);
    const childIndex = listItems?.indexOf(item);

    if (item?.name?.toLowerCase() === "all") {
      dupArr[parentIndex].buttonName = defaultButtonName;
    } else {
      dupArr[parentIndex].buttonName = item?.name;
    }

    const dupListItems = listItems?.map((listItem, i) => {
      if (i !== childIndex) {
        return { ...listItem, selected: false };
      }
      return { ...listItem, selected: true };
    });

    dupArr[parentIndex].listItems = dupListItems;
    setfilterArr(dupArr);
  };

  let dynamicButtonName = "";
  if (defaultButtonName?.toLowerCase() === "sort") {
    dynamicButtonName = "sort";
  } else if (
    label === "rating" &&
    listItems?.find((item) => item?.selected)?.name?.toLowerCase() !== "all" &&
    defaultButtonName?.toLowerCase() === "rating" &&
    listItems?.find((item) => item?.selected)
  ) {
    dynamicButtonName =
      selectedDropDown.status && id === selectedDropDown?.id ? (
        <StarRatings
          star={Number(listItems?.find((item) => item.selected)?.name)}
          color="black"
          focus
          selected
        />
      ) : (
        <StarRatings
          star={Number(listItems?.find((item) => item.selected)?.name)}
          color="black"
          selected
        />
      );
  } else {
    dynamicButtonName = buttonName;
  }

  const handleClick = () => {
    if (id === selectedDropDown?.id) {
      setselectedDropDown({ ...selectedDropDown, id, status: !selectedDropDown.status });
    } else {
      setselectedDropDown({ ...selectedDropDown, id, status: true });
    }
  };

  const handleSelectDropDown = () => {
    setTimeout(() => {
      setselectedDropDown({ ...selectedDropDown, id, status: false });
    }, 200);
  };

  return (
    <div
      className={`${id === selectedDropDown.id ? "relative" : null}`}
      role="button"
      tabIndex="0"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.keyCode === 13 || e.keyCode === 32) {
          handleClick();
        }
      }}
    >
      <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        className={`${
          selectedDropDown.status
            ? "focus:bg-black focus:text-white focus:ring-black focus:ring-1 ring-offset-2 "
            : null
        } mr-2 text-black bg-[#eee] whitespace-pre font-normal text-[13px] min-h-[36px] rounded-full px-4 py-2.5 text-center inline-flex items-center capitalize`}
        type="button"
        onClick={handleClick}
        tabIndex={"-1"}
      >
        {dynamicButtonName}
        {selectedDropDown.status && id === selectedDropDown?.id ? (
          <i className="fa fa-chevron-up ml-1" aria-hidden="true" />
        ) : (
          <i className="fa fa-chevron-down ml-1" aria-hidden="true" />
        )}
      </button>
      {selectedDropDown.id === id && selectedDropDown?.status ? (
        <div
          id="dropdown"
          className={`${
            id === selectedDropDown.id
              ? "absolute top-[44px]  shadow-[rgb(0_0_0_/_20%)_0px_0px_6px_0px] rounded-[6px]  border box-border py-[2px] px-[1px]"
              : "hidden"
          }  m-0 w-[220px] pdp-mobile-ratings border-0`}
          data-popper-placement="bottom"
        >
          <ul
            className="py-1 text-sm text-gray-700 bg-white pb-6 pt-5 md:pt-1 md:pb-1 rounded-none rounded-t-md font-open-sans"
            aria-labelledby="dropdownDefault"
          >
            <span
              role="button"
              tabIndex="0"
              onClick={handleSelectDropDown}
              onKeyUp={handleSelectDropDown}
              className="absolute right-0 top-1 px-[10px] py-[5px] md:hidden"
            >
              <svg
                className="h-[24px] w-[24px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
              </svg>
            </span>
            {listItems?.map((item) => (
              <li key={item?.name} className="block w-full hover:bg-gray-100">
                <button
                  type="button"
                  className={`${
                    item?.selected ? "font-semibold" : null
                  } w-full text-left py-2 px-4 capitalize `}
                  onClick={() => handleSelectOption(item)}
                >
                  {label === "rating" && item?.name.toLowerCase() !== "all" ? (
                    <StarRatings star={parseInt(item?.name, 10)} color="black" />
                  ) : (
                    item.name
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

ProductReviewFilterButtons.propTypes = {
  id: PropTypes.number.isRequired,
  defaultButtonName: PropTypes.string.isRequired,
  buttonName: PropTypes.string.isRequired,
  listItems: PropTypes.arrayOf().isRequired,
  selectedDropDown: PropTypes.shape().isRequired,
  setselectedDropDown: PropTypes.func.isRequired,
  setfilterArr: PropTypes.func.isRequired,
  filterArr: PropTypes.arrayOf().isRequired,
  label: PropTypes.string.isRequired,
};
