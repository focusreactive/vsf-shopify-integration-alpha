import { LATEST_API_VERSION } from '@shopify/shopify-api';

import { Endpoints } from '../../types';

export const customQuery: Endpoints['customQuery'] = async (
  context,
  params
) => {
  const q = `
  {
    shop {
      name
    }
  }
  `;

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
  console.log('🚀 ~ file: index.ts:36 ~ products:', data);

  return { data: `products: ${JSON.stringify(data.products)}` };
};
