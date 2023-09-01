import { LATEST_API_VERSION } from '@shopify/shopify-api';

import { Endpoints } from '../../types';

export const customQuery: Endpoints['customQuery'] = async (
  context,
  params
) => {
  const { storefrontClient } = context.client;

  const response = await storefrontClient.query<{ data: { products: {}[] } }>({
    data: params.query,
  });
  const data = response?.body?.data;

  return { data };
};
