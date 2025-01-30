import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import GET_REGION_LIST from "../../theme-files/region-combo-box/graphql";

export default function UseRegionList(countryId) {
  const { data: regions, refetch } = useQuery(GET_REGION_LIST, {
    skip: !countryId,
    variables: { countryCode: countryId },
  });

  useEffect(() => {
    refetch();
  }, [countryId, refetch]);

  return { regions: regions?.countries };
}

UseRegionList.defaultProps = {
  countryId: "",
};

UseRegionList.propTypes = {
  countryId: PropTypes.string,
};
