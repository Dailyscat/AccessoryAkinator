import gql from "graphql-tag";

export default gql`
  query listEarring {
    listEarring {
      items {
        earringName
        ingredients
        sytles
        price
      }
    }
  }
`;
