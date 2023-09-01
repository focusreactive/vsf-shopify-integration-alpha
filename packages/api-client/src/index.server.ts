import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

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
    // appUrl: settings.SHOPIFY_APP_URL || "",
    // authPathPrefix: "/auth",
    // sessionStorage: new PrismaSessionStorage(prisma),
    // distribution: AppDistribution.AppStore,
    // restResources,
    // webhooks: {
    //   APP_UNINSTALLED: {
    //     deliveryMethod: DeliveryMethod.Http,
    //     callbackUrl: "/webhooks",
    //   },
    // },
    // hooks: {
    //   afterAuth: async ({ session }) => {
    //     shopify.registerWebhooks({ session });
    //   },
    // },
    // ...(process.env.SHOP_CUSTOM_DOMAIN
    //   ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    //   : {}),
  });

  return shopify;
};

const onCreate = (settings: MiddlewareConfig) => {
  const client = buildClient(settings);

  return {
    config: settings,
    client,
  };
};

const { createApiClient } = apiClientFactory<any, any>({
  onCreate,
  api: apiEndpoints,
});

export { createApiClient };
