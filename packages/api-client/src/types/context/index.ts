import { IntegrationContext } from '@vue-storefront/middleware';
import { MiddlewareConfig, ContextualizedEndpoints } from '../index';
import { Shopify, ShopifyRestResources } from '@shopify/shopify-api';
import { StorefrontClient } from '@shopify/shopify-api/lib/clients/graphql/storefront_client';

type ShopifyClientInstance = {
  storefrontClient: StorefrontClient;
};

export type ShopifyIntegrationContext = IntegrationContext<
  ShopifyClientInstance,
  MiddlewareConfig,
  ContextualizedEndpoints
>;

/**
 * Global context of the application which includes runtime integration context.
 **/
export interface Context {
  $shopify: ShopifyIntegrationContext;
}
