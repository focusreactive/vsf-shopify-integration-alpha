import { Endpoints, ShopifyIntegrationContext } from '../../types';

export type GetProducts = (
  context: ShopifyIntegrationContext,
  params: any
) => Promise<any>;

const variant = `#graphql
{
  id
  title
}
`;

const product = `#graphql
{
  id
  title
  description
  availableForSale
  variants(first: 10) {
    edges {
      node {
        ...variant
      }
    }
  }
}

fragment variant on ProductVariant ${variant}
`;

export const getProducts: GetProducts = async (
  context,
  params
) => {
  const { storefrontClient } = context.client;
  const { productFragment } = params;

  const response = await storefrontClient.query<{ data: { products: {}[] } }>({
    data: `#graphql
   {
      products (first: 10) {
        edges {
          node {
            ...product
          }
        }
      }
    }

    fragment product on Product ${productFragment || product}

    `,
  });
  const data = response?.body?.data;

  return { data };
};
