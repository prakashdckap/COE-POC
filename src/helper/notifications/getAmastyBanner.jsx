import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SET_ON_PAGE_TOP_PROMO_BANNER, SET_TOP_PROMO_BANNER } from "../../redux/actions";
import { AxiosGraphQL } from "../axios";

const useAmastyBanner = () => {
  const dispatch = useDispatch();
  const history = useRouter();

  const [promoBanner, setPromoBanner] = useState([]);
  const [bottomPromoBanner, setBottomPromoBanner] = useState([]);
  const [categoryTopPromoBanner, setCategoryTopPromoBanner] = useState([]);
  const [categoryBottomPromoBanner, setCategoryBottomPromoBanner] = useState([]);
  const [belowPromoBanner, setBelowPromoBanner] = useState([]);
  const [abovePromoBanner, setAbovePromoBanner] = useState([]);

  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  // Function to update the banner link
  const getPromoBanners = (sku, categoryId) => {
    let belowPromoBanner = [];
    let topPromoBanner = [];
    let bottomPromoBanners = [];
    AxiosGraphQL("amasty-promo-banners").then((response) => {
      if (response) {
        response?.getAmastyBanners?.forEach((banner) => {
          if (banner?.banner_type === "image" && banner?.is_active) {
            // Below cart button (PDP)
            if (
              banner?.banner_position?.split(",").includes("7") &&
              (banner?.to_date?.split(" ")[0] >= formattedDate || banner?.to_date === null)
            ) {
              let skuId = JSON.parse(banner?.actions_serialized)?.conditions?.find(
                (condition) => condition?.attribute === "sku"
              );

              let catId = JSON.parse(banner?.actions_serialized)?.conditions?.find(
                (condition) => condition.attribute === "category_ids"
              );

              if (
                banner?.show_on_products === null &&
                banner?.cats == "" &&
                !catId?.value &&
                !skuId?.value
              ) {
                belowPromoBanner?.push(banner);
                return false;
              }
              //sku
              if (banner?.show_on_products && banner?.show_on_products?.includes(sku)) {
                if (!skuId?.value) {
                  belowPromoBanner?.push(banner);
                } else if (
                  JSON.parse(banner?.actions_serialized)
                    ?.conditions?.find((condition) => condition?.attribute === "sku")
                    ?.value?.split(",")?.length == 1 &&
                  JSON.parse(banner?.actions_serialized)
                    ?.conditions?.find((condition) => condition?.attribute === "sku")
                    ?.value?.includes(sku)
                ) {
                  belowPromoBanner?.push(banner);
                }
              }

              if (banner?.show_on_products === null) {
                if (
                  JSON.parse(banner?.actions_serialized)?.conditions?.some(
                    (condition) => condition?.attribute === "sku"
                  ) &&
                  JSON.parse(banner?.actions_serialized)?.conditions?.some(
                    (condition) => condition.attribute === "category_ids"
                  )
                ) {
                  let categoryIdsCheck = JSON.parse(banner?.actions_serialized)
                    ?.conditions?.find((cond) => cond.attribute === "category_ids")
                    ?.value?.split(",")
                    .map((num) => parseInt(num.trim()));

                  let skuCheck = JSON.parse(banner?.actions_serialized)?.conditions?.find(
                    (cond) => cond.attribute === "sku"
                  )?.value;

                  if (
                    categoryIdsCheck?.some((num) => categoryId?.includes(num)) &&
                    skuCheck?.includes(sku)
                  ) {
                    belowPromoBanner?.push(banner);
                    return false;
                  }
                } else {
                  JSON.parse(banner?.actions_serialized)?.conditions?.map((actionCondtion) => {
                    if (actionCondtion?.attribute == "sku") {
                      if (
                        actionCondtion?.value?.includes(sku) &&
                        actionCondtion?.value?.split(",")?.length == 1
                      ) {
                        belowPromoBanner?.push(banner);
                        return false;
                      }
                    }
                    if (actionCondtion?.attribute == "category_ids") {
                      let categoryIdCheck = actionCondtion?.value
                        ?.split(",")
                        .map((num) => parseInt(num.trim()));

                      if (
                        categoryIdCheck?.some((num) => categoryId?.includes(num)) &&
                        actionCondtion?.operator == "=="
                      ) {
                        belowPromoBanner?.push(banner);
                        return false;
                      }
                    }
                  });
                }
              }
            }

            // product page top
            if (banner?.banner_position?.split(",").includes("3")) {
              if (banner?.to_date?.split(" ")[0] >= formattedDate || banner?.to_date === null) {
                if (banner?.show_on_products && banner?.show_on_products?.includes(sku)) {
                  topPromoBanner?.push(banner);
                }
              }
            }

            // product page bottom
            if (banner?.banner_position?.split(",").includes("6")) {
              if (banner?.to_date?.split(" ")[0] >= formattedDate || banner?.to_date === null) {
                if (banner?.show_on_products && banner?.show_on_products?.includes(sku)) {
                  bottomPromoBanners?.push(banner);
                }
              }
            }

            // on top of the page (PDP)
            if (banner?.banner_position?.split(",").includes("10")) {
              if (banner?.to_date?.split(" ")[0] >= formattedDate || banner?.to_date === null) {
                if (banner?.show_on_products && banner?.show_on_products?.includes(sku)) {
                  dispatch(SET_ON_PAGE_TOP_PROMO_BANNER([banner]));
                }
              }
            }

            // PLP
            // Category Page (Bottom)
            if (banner?.banner_position?.split(",").includes("5")) {
              if (banner?.to_date?.split(" ")[0] >= formattedDate || banner?.to_date === null) {
                if (categoryId && banner?.cats?.split(",").includes(String(categoryId))) {
                  setCategoryBottomPromoBanner([banner]);
                }
              }
            }
            if (banner?.banner_position?.split(",").includes("4")) {
              if (banner?.to_date?.split(" ")[0] >= formattedDate || banner?.to_date === null) {
                if (categoryId && banner?.cats.split(",")?.includes(String(categoryId))) {
                  setCategoryTopPromoBanner([banner]);
                }
              }
            }

            // On Top of Page (PLP)

            if (banner?.banner_position?.split(",").includes("10")) {
              if (banner?.to_date?.split(" ")[0] >= formattedDate || banner?.to_date === null) {
                if (categoryId && banner?.cats?.split(",").includes(String(categoryId))) {
                  dispatch(SET_ON_PAGE_TOP_PROMO_BANNER([banner]));
                }
              }
            }

            // search
            let conditionFailedBanner = [];
            let conditionSuccessBanner = [];
            // Catalog Search (Top)
            if (banner?.banner_position?.split(",").includes("9") && history?.query?.q) {
              if (banner?.to_date?.split(" ")[0] >= formattedDate || banner?.to_date === null) {
                if (banner?.show_on_search?.split(/\s*,\s*/).includes(history?.query?.q)) {
                  conditionSuccessBanner?.push(banner);
                }
                if (banner?.show_on_search == "") {
                  conditionFailedBanner?.push(banner);
                }
              }
              //  Find the minimum sort_order value from the filtered banners
              const minFailedSortOrder = Math.min(
                ...conditionFailedBanner?.map((banner) => banner?.sort_order)
              );
              const minSuccessSortOrder = Math.min(
                ...conditionSuccessBanner?.map((banner) => banner?.sort_order)
              );

              if (conditionSuccessBanner?.length) {
                conditionSuccessBanner?.forEach((banner) => {
                  if (banner?.sort_order === minSuccessSortOrder && banner?.banner_img) {
                    setCategoryTopPromoBanner([banner]);
                  }
                });
              } else {
                conditionFailedBanner?.forEach((banner) => {
                  if (banner?.sort_order === minFailedSortOrder && banner?.banner_img) {
                    setCategoryTopPromoBanner([banner]);
                  }
                });
              }
            }

            // cart page
            const banners = response?.getAmastyBanners;

            // Filter banners based on the initial conditions
            const filteredBanners = banners?.filter((banner) => {
              return (
                banner?.banner_type === "image" &&
                banner?.is_active &&
                (banner?.to_date?.split(" ")[0] >= formattedDate || banner?.to_date === null)
              );
            });

            //  Find the minimum sort_order value from the filtered banners
            const minSortOrder = Math.min(...filteredBanners?.map((banner) => banner?.sort_order));

            filteredBanners?.forEach((banner) => {
              if (banner?.sort_order === minSortOrder && banner?.banner_img) {
                if (banner?.banner_position?.split(",").includes("8")) {
                  setAbovePromoBanner([banner]);
                }
                // "Above Cart
                if (banner?.banner_position?.split(",").includes("0")) {
                  setBelowPromoBanner([banner]);
                }
              }
            });
          }
        });
      }

      // Sort function based on sort_order field
      belowPromoBanner?.sort((a, b) => b.sort_order - a.sort_order);
      setPromoBanner(belowPromoBanner);

      //top of the PDP page
      topPromoBanner?.sort((a, b) => b.sort_order - a.sort_order);
      dispatch(SET_TOP_PROMO_BANNER(topPromoBanner));

      //bottom of the PDP page
      bottomPromoBanners?.sort((a, b) => b.sort_order - a.sort_order);
      setBottomPromoBanner(bottomPromoBanners);
    });
  };

  return {
    getPromoBanners,
    promoBanner,
    bottomPromoBanner,
    categoryTopPromoBanner,
    categoryBottomPromoBanner,
    abovePromoBanner,
    belowPromoBanner,
  };
};

export default useAmastyBanner;
