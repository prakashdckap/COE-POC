import { memo } from "react";
import { SearchIcon } from "@heroicons/react/solid";

import Paragraph from "../../../theme-files/paragraph";

export default function HandleReviewFilters({
  searchOpen,
  setSearchOpen,
  setSearchText,
  searchText,
  handleSearch,
}) {
  return (
    <div className="flex items-center mr-2">
      {!searchOpen && (
        <button
          onClick={() => setSearchOpen(true)}
          type="button"
          className="w-[36px] min-h-[36px] inline-block bg-[#eee] text-[#6B6D76] rounded-full p-1.5"
          aria-label="Search Review"
        >
          <SearchIcon />
        </button>
      )}

      {searchOpen && (
        <div className="flex items-center">
          <form onSubmit={handleSearch}>
            <input
              type="search"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              placeholder="Search Reviews"
              className="border-[1px] border-[#575757] border-solid rounded-full h-10 w-60 sm:w-72 pl-4 pr-3 focus:border-[0px] focus:border-[#575757]"
            />
          </form>

          <button
            className="ml-2 text-sm text-[#136bea]"
            onClick={() => setSearchOpen(false)}
            type="button"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

function ClearFilter({ clearAllFilters }) {
  return (
    <div className="ml-1 md:ml-[80px] lg:ml-[350px]">
      <button
        type="button"
        className="text-center w-[80px]  text-[#6B6D76] text-[12px] py-[6px] px-[11px] rounded-[3px] mt-1 capitalize border border-solid bg-transparent border-[#e3e3e3] font-medium hover:border-[#6B6D76]"
        onClick={() => clearAllFilters()}
      >
        Clear All
      </button>
    </div>
  );
}

function NoReviewFound({ clearAllFilters }) {
  return (
    <div className="w-[200px] mx-auto">
      <Paragraph className="  text-center text-[#6a6c77] text-[14px]">
        Sorry, no reviews match your criteria. Clear or modify your filters and try again.
      </Paragraph>

      <button
        type="button"
        className="text-center w-full text-[14px] mt-1 capitalize font-semibold hover:opacity-70 pointer"
        onClick={() => clearAllFilters()}
      >
        Clear All Filters
      </button>
    </div>
  );
}

export const ReviewsNotFound = memo(NoReviewFound);
export const ClearAllFilter = memo(ClearFilter);
