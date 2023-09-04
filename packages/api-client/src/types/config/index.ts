import { ConfigParams, ShopifyRestResources, StorefrontClientParams } from "@shopify/shopify-api";

/**
 * Settings to be provided in the `middleware.config.js` file.
 */
export interface MiddlewareConfig {
  app: ConfigParams<ShopifyRestResources>,
  storeFrontClient: StorefrontClientParams
}

export type FragmentInstance = string;
