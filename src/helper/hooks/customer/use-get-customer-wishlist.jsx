import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import CUSTOMER_WISHLIST from "../../../components/account/graphql/query/customer-wishlist";

export default function useGetCustomerWishlist(currentPage, contentLimit) {
  const [customerWishlistResponse, setcustomerWishlistResponse] = useState({});
  const customerToken = useSelector((state) => state.customerToken);

  const {
    data: customerWishlist,
    loading: customerWishlistLoading,
    refetch: customerWishlistRefetch,
  } = useQuery(CUSTOMER_WISHLIST, {
    skip: !customerToken,
    fetchPolicy: "no-cache",
    variables: {
      pageSize: contentLimit,
      currentPage,
    },
  });

  useEffect(() => {
    if (customerWishlist?.customerWishlist?.id)
      setcustomerWishlistResponse(customerWishlist?.customerWishlist);
  }, [customerWishlist]);

  return { customerWishlistResponse, customerWishlistLoading, customerWishlistRefetch };
}
