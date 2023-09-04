import { Endpoints } from '../../types';

export const getProduct: Endpoints['getProduct'] = async (context, params) => {
  const { storefrontClient } = context.client;
  const { productFragment } = params;

  const response = await storefrontClient.query<{ data: { products: {}[] } }>({
    data: {
      query: `#graphql
    query Product($ID: ID!) {
        product(id: $ID) {
          ...product
        }
      }

      fragment product on Product {
        id
        title
      }
    `,
      variables: {
        ID: params.ID,
      },
    },
  });
  const data = response?.body?.data;

  return { data };
};
