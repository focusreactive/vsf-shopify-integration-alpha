import {
  shopifyApi,
  LATEST_API_VERSION,
  Shopify,
  ShopifyRestResources,
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

  const storefrontClient = new shopify.clients.Storefront({
    domain: settings.storeFrontClient.domain,
    storefrontAccessToken: settings.storeFrontClient.storefrontAccessToken,
    apiVersion: LATEST_API_VERSION,
  });

  return { storefrontClient };
};

// const getSession =  (shopify: Shopify<ShopifyRestResources>) => async (req, res) => {
//   shopify.auth()
// };

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
