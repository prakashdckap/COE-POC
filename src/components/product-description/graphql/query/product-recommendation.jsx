import { gql } from "@apollo/client";

const PRODUCT_RECOMMENDATION = gql`
  query GetRecommendations(
    $pageType: PageType!
    $category: String
    $currentSku: String
    $cartSkus: [String]
    $userPurchaseHistory: [PurchaseHistory]
    $userViewHistory: [ViewHistory]
  ) {
    recommendations(
      cartSkus: $cartSkus
      category: $category
      currentSku: $currentSku
      pageType: $pageType
      userPurchaseHistory: $userPurchaseHistory
      userViewHistory: $userViewHistory
    ) {
      results {
        displayOrder
        pageType
        productsView {
          name
          sku
          url
          inStock
          images {
            url
          }
          externalId
          __typename
        }
        storefrontLabel
        totalProducts
        typeId
        unitId
        unitName
      }
      totalResults
    }
  }
`;

export default PRODUCT_RECOMMENDATION;
