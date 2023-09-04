import { Endpoints, ShopifyIntegrationContext } from '../../types';

type GetProducts = (
  context: ShopifyIntegrationContext,
  params: any
) => Promise<any>;

export const getProducts: Endpoints['getProducts'] = async (
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

    fragment product on Product ${productFragment}

    `,
  });
  const data = response?.body?.data;

  return { data };
};
