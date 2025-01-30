import { gql } from "@apollo/client";

const YOTPO_REVIEWS = gql`
  query YotpoReviews($pageSize: Int!, $currentPage: Int!, $filter: YotpoReviewsFilter) {
    yotpoReviews(pageSize: $pageSize, currentPage: $currentPage, filter: $filter) {
      totalCount
      bottomline {
        totalReview
        averageScore
        starDistribution {
          oneStar
          twoStar
          threeStar
          fourStar
          fiveStar
        }
      }
      items {
        archived
        content
        createdAt
        deleted
        email
        escalated
        id
        name
        product {
          imageUrl
          name
          url
        }
        reviewId
        reviewerType
        score
        sentiment
        sku
        title
        updatedAt
        userReference
        votesDown
        votesUp
      }
    }
  }
`;


export default YOTPO_REVIEWS;
