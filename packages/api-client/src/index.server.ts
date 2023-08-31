import "@shopify/shopify-app-remix/adapters/node";
import {
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
  LATEST_API_VERSION,
  // @ts-ignore
} from "@shopify/shopify-app-remix/server";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-07";

import { apiClientFactory } from '@vue-storefront/middleware';
import { MiddlewareConfig } from './index';
import * as apiEndpoints from './api';

/**
 * In here you should create the client you'll use to communicate with the backend.
 * Axios is just an example.
 */
const buildClient = (settings: MiddlewareConfig) => {
  const shopify = shopifyApp({
    apiKey: settings.app.apiKey,
    apiSecretKey: settings.app.apiSecretKey,
    scopes: settings.app.scopes,
    hostName: settings.app.hostName,
    apiVersion: LATEST_API_VERSION,
    isEmbeddedApp: false,
    appUrl: 'vsf-plugin-alfa.myshopify.com',
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
