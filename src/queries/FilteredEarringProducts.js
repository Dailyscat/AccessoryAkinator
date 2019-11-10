import gql from "graphql-tag";

export default gql`
  query filteredEarringProducts {
    filteredEarringProducts(
      startPrice: Int
      endPrice: Int
      selectedStyle: SS
      selectedElement: SS
    ) {
      items {
        earringName
        earringElement
        earringStyle
        earringThumbnailUrl
        earringRemovedBgImg
        color
        shopName
        shopUrl
      }
    }
  }
`;
