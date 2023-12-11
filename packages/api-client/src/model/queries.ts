// GraphQL fragment for cart details
export const CART_DETAILS_FRAGMENT = (productFragment) => `#graphql
  fragment cartDetails on Cart {
    id
    checkoutUrl
    lines(first: 20) {
      edges {
        node {
          id
          merchandise {
            ... on ProductVariant {
              product {
                ${productFragment}
              }
            }
          }
          quantity
        }
      }
    }
  }
`;

export const PRODUCT_DETAILS_FRAGMENT = (productAdditionalFields) => `#graphql
  fragment productDetails on Product {
    id
    title
    description
    images(first: 5) {
      edges {
        node {
          src
          altText
        }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          price
        }
      }
    }
    ${productAdditionalFields}
  }
`;



// GraphQL mutation for creating a new cart
export const CREATE_CART_MUTATION = `#graphql
  mutation CreateCart($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        ...cartDetails
      }
    }
  }
`;


// GraphQL query for retrieving an existing cart
export const GET_CART_QUERY = `#graphql
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ...cartDetails
    }
  }
`;

// GraphQL mutation for adding lines to a cart
export const ADD_CART_LINES_MUTATION = `#graphql
  mutation AddCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cartDetails
      }
    }
  }
`;

// GraphQL mutation for removing lines from a cart
export const REMOVE_CART_LINES_MUTATION = `#graphql
  mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cartDetails
      }
    }
  }
`;

// GraphQL mutation for updating cart lines
export const UPDATE_CART_LINES_MUTATION = `#graphql
  mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cartDetails
      }
    }
  }
`;

export const GET_PRODUCT_QUERY = `#graphql
  query GetProduct($productId: ID!) {
    product(id: $productId) {
      ...productDetails
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE_QUERY = `#graphql
  query GetProductByHandle($productHandle: String!) {
    productByHandle(handle: $productHandle) {
      ...productDetails
    }
  }
`;
