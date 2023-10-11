import { FragmentInstance, ShopifyIntegrationContext } from '../../types';

export type GetProduct = (
  context: ShopifyIntegrationContext,
  params: {
    productFragment: FragmentInstance;
    handle: string;
  }
) => Promise<{ product: Object }>;

export const getProduct: GetProduct = async (context, params) => {
  const { storefrontClient } = context.client;
  const { productFragment } = params;

  const response = await storefrontClient.query<{ data: { product: Object } }>({
    // TODO: switch to handle instead of id
    data: {
      query: `#graphql
        query Product($handle: String!) {
          product(handle: $handle) {
            ...product
          }
        }

        fragment product on Product ${productFragment}
    `,
      variables: {
        handle: params.handle,
      },
    },
  });
  const data = response?.body?.data;

  return data;
};
