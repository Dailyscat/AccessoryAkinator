import gql from "graphql-tag";

export default gql`
  query listEarringProducts {
    listEarringProducts {
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
