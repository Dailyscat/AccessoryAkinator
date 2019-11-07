import gql from "graphql-tag";

export default gql`
  subscription NewEarringSub {
    onCreateEarring {
      earringName
      ingredients
      sytles
      price
    }
  }
`;
