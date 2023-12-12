import {
  shopifyApi,
  LATEST_API_VERSION,
  Shopify,
  ShopifyRestResources,
  RequestReturn,
} from '@shopify/shopify-api';

import { apiClientFactory } from '@vue-storefront/middleware';
import { MiddlewareConfig } from './index';
import * as apiEndpoints from './api';

const buildClient = (settings: MiddlewareConfig) => {
  const shopify = shopifyApi({
    apiKey: settings.app.apiKey,
    apiSecretKey: settings.app.apiSecretKey,
    scopes: settings.app.scopes,
    hostName: settings.app.hostName,
    apiVersion: LATEST_API_VERSION,
    isEmbeddedApp: false,
    ...settings.app,
  });

  const client = new shopify.clients.Storefront({
    domain: settings.storeFrontClient.domain,
    storefrontAccessToken: settings.storeFrontClient.storefrontAccessToken,
    apiVersion: LATEST_API_VERSION,
  });

  // const storefrontClient = client;

  async function query<T>(
    props: Parameters<typeof client.query>[0]
  ): Promise<RequestReturn<T>> {
    try {
      const result = await client.query<T>(props);
      return result;
    } catch (error) {
      console.error(
        `🍏🍏🍏🍏🍏🍏🍏🍏🍏🍏🍏\nError in GraphQL query:\n`,
        // @ts-ignore
        props.data.query
          .split('\n')
          .map((s, i) => `${(i + 1).toString().padStart(3, '0')} ${s}`)
          .join('\n'),
        '\n🍏🍏🍏🍏🍏🍏🍏🍏🍏🍏🍏'
      );
      throw error;
    }
  }

  return {
    storefrontClient: {
      ...client,
      query,
    },
  };
};

const onCreate = (settings: MiddlewareConfig) => {
  const { storefrontClient } = buildClient(settings);

  return {
    config: settings,
    client: { storefrontClient },
  };
};

const { createApiClient } = apiClientFactory<any, any>({
  onCreate,
  api: apiEndpoints,
});

export { createApiClient };
