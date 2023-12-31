// GraphQL fragment for cart details
export const CART_DETAILS_FRAGMENT = (productFragment) => `#graphql
  fragment cartDetails on Cart {
    id
    checkoutUrl
    cost {
      subtotalAmount {
        amount
      }
      totalTaxAmount {
        amount
      }
      totalAmount {
        amount
      }
    }
    lines(first: 20) {
      edges {
        node {
          id
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              image {
                url
                altText
              }
              price {
                amount
                currencyCode
              }
              unitPrice {
                amount
                currencyCode
              }
              product {
                ...product
              }
            }
          }
          quantity
        }
      }
    }
  }

  fragment product on Product
  ${productFragment}
`;

export const PRODUCT_DETAILS_FRAGMENT = (productAdditionalFields) => `#graphql
  fragment productDetails on Product ${productAdditionalFields}
`;

export const COLLECTION_DETAILS_FRAGMENT = (
  collectionAdditionalFields
) => `#graphql
  fragment collectionDetails on Collection ${collectionAdditionalFields}
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

export const GET_PRODUCTS_FROM_COLLECTION_QUERY = `#graphql
  query GetProductsFromCollection($collectionHandle: String!, $first: Int = 24, $after: String, $sortKey: ProductCollectionSortKeys, $reverse: Boolean, $filters: [ProductFilter!]) {
    collection(handle: $collectionHandle) {
      ...collectionDetails
      products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse, filters: $filters) {
        edges {
          node {
            ...productDetails
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export const GET_PRODUCTS_QUERY = `#graphql
  query GetAllProducts($first: Int = 24, $after: String, $sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
    products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse, query: $query) {
      edges {
        node {
          ...productDetails
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
