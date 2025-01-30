import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Paragraph from "../../theme-files/paragraph";
import Heading from "../../theme-files/heading";
import useCategoryFilters from "../../helper/hooks/use-category-filter";
import { SET_LAST_SELECTED_FILTER } from "../../redux/actions";

export default function SelectedFilters({
  setfilters,
  filters,
  categoryId,
  setclient,
  setcurrentPage,
  priceObj,
  setpriceObj,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { updateFilter } = useCategoryFilters(categoryId, router?.query?.q);
  const [filter, setfilter] = useState([]);

  useEffect(() => {
    if (router?.query?.filters) {
      const urlFilter = JSON.parse(router?.query?.filters);
      setfilter(urlFilter);
    } else {
      setfilter([]);
    }
  }, [router]);

  // Clearing all the filters
  const clearFiltersfunc = () => {

    if (setpriceObj) {
      setpriceObj({ min: 0, max: 100 });
    }
    router.replace(
      `/${router?.query?.q ? `productSearch?q=${router?.query?.q}` : router?.query?.slug[0]}`,
      undefined,
      { shallow: true }
    );
    if (filters?.length) {
      const resetArr = [];
      filters?.map((filt) => {
        const changedOptions = filt?.options?.map((option) => ({ ...option, checked: false }));
        resetArr?.push({
          code: filt?.code,
          name: filt?.name,
          options: changedOptions,
        });
        return filt;
      });
      setfilters(resetArr);
      setfilter([]);
      setclient(true);
      dispatch(SET_LAST_SELECTED_FILTER(""));
    }
  };

  // Remove single filter
  const handleRemoveFilter = (filt, option) => {
    if (filter?.length) {
      // For top filter display
      let availableFilterArr = [...filter];
      const removedFilterObj = filter?.find((item) => item?.code === filt?.code);

      const removedOptionArr = removedFilterObj?.options?.filter(
        (opt) => opt?.label !== option?.label
      );

      if (removedOptionArr?.length) {
        removedFilterObj.options = removedOptionArr;
        availableFilterArr[filter?.indexOf(removedFilterObj)] = removedFilterObj;
      } else {
        availableFilterArr = filter?.filter((item) => item?.code !== filt?.code);
      }

      // setfilter(availableFilterArr);
      if (!availableFilterArr?.length) {
        router.replace(
          `/${router?.query?.q ? `productSearch?q=${router?.query?.q}` : router?.query?.slug[0]}`,
          undefined,
          { shallow: true }
        );
      }

      // For rendering the page and changing the overall filters
      const duplicateFilters = [...filters];
      const removedArr = filters?.filter((fil) => fil?.code === filt?.code);
      const rem = filters?.find((item) => item?.code === filt?.code);

      const resetArr = [];
      removedArr?.map((fi) => {
        const changedOptions = fi?.options?.map((opt) => {
          if (opt?.label === option?.label) return { ...opt, checked: false };
          return { ...opt };
        });
        resetArr?.push({
          code: fi?.code,
          name: fi?.name,
          options: changedOptions,
        });
        return fi;
      });

      const [changeObj] = resetArr;
      duplicateFilters[duplicateFilters?.indexOf(rem)] = changeObj;
      // setfilters(duplicateFilters);
      updateFilter(false, filters, () => {}, filt?.code, option?.value, setclient, setcurrentPage);
    }
  };

  return filter.length || priceObj?.min ? (
    <>
      <Heading className="text-[#282828] text-[16px] font-semibold mb-[10px]">
        NOW SHOPPING BY
      </Heading>
      <div className="bg-[#f9f9f9] p-[10px] my-[10px]">
        {filter.length ? (
          filter?.map((filt) => (
            <>
              <Paragraph className="text-[14px] font-medium mb-[10px]">{filt.name}:</Paragraph>
              <div className="flex flex-wrap w-full">
                {filt.options.map((option) => (
                  <div key={option.value} className="flex items-center text-[13px] mb-2">
                    {option.label}
                    <button
                      onClick={() => handleRemoveFilter(filt, option)}
                      type="button"
                      className="flex items-center justify-center mx-[5px] w-[18px] h-[18px] hover:bg-[#000] hover:text-skin-inverted"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </>
          ))
        ) : (
          <></>
        )}
        <div>
          {priceObj?.min && priceObj?.max ? (
            <>
              <Paragraph className="text-[14px] font-medium mb-[10px]">{"Price"}:</Paragraph>
              <div className="flex flex-wrap w-full">
                <div className="flex items-center text-[13px] mb-2">
                  $ {priceObj?.min}-$ {priceObj?.max}
                  <button
                    onClick={() => setpriceObj({ min: 0, max: 100 })}
                    type="button"
                    className="flex items-center justify-center mx-[5px] w-[18px] h-[18px] hover:bg-[#000] hover:text-skin-inverted"
                  >
                    x
                  </button>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <button
        onClick={() => clearFiltersfunc()}
        className="bg-skin-secondary text-skin-inverted hover:text-[#000] mb-[30px] text-[12px] border py-[5px] px-[10px] hover:bg-skin-inverted hover:border hover:border-[#000]"
        type="button"
      >
        CLEAR ALL
      </button>
    </>
  ) : null;
}

SelectedFilters.defaultProps = {
  filters: [],
};

SelectedFilters.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string,
      name: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          checked: PropTypes.bool,
          label: PropTypes.string,
          value: PropTypes.string,
        })
      ),
    })
  ),
  setfilters: PropTypes.func.isRequired,
  categoryId: PropTypes.number.isRequired,
  setclient: PropTypes.func.isRequired,
  setcurrentPage: PropTypes.func.isRequired,
};
