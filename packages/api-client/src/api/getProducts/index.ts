import { Endpoints } from '../../types';

export const getProducts: Endpoints['getProducts'] = async (
  context,
  params
) => {
  const { storefrontClient } = context.client;

  const response = await storefrontClient.query<{ data: { products: {}[] } }>({
    data: `#graphql
   {
      products (first: 10) {
        edges {
          node {
            id
            title
            descriptionHtml
          }
        }
      }
    }`,
  });
  const data = response?.body?.data;

  return { data };
};
