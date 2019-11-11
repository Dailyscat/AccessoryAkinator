import gql from "graphql-tag";

export default gql`
  query listEarringProducts {
    listEarringProducts {
      items {
        earringName
        earringElement
        earringStyle
        earringPrice
        earringThumbnailUrl
        earringRemovedBgImg
        color
        shopName
        shopUrl
      }
    }
  }
`;
