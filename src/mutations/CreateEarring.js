import gql from "graphql-tag";

export default gql`
  mutation createEarring(
    $earringName: String!
    $ingredients: [String!]
    $styles: [String!]
    $price: String!
  ) {
    createRecipe(
      input: {
        earringName: $earringName
        ingredients: $ingredients
        sytles: $styles
        price: $price
      }
    ) {
      id
      earringName
      ingredients
      sytles
      price
    }
  }
`;
