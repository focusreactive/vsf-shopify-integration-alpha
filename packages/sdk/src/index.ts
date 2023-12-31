import { shopifyConnector } from './connector';
import type { Options } from './types';
import type { Module } from '@vue-storefront/sdk';

/**
 * Boulerplate module type.
 */
export interface ShopifyModuleType extends Module {
  /**
   * The connector of the Boilerplate module.
   */
  connector: ReturnType<typeof shopifyConnector>;
}

/**
 * Boilerplate module.
 */
export const shopifyModule = (options: Options): ShopifyModuleType => {
  return {
    connector: shopifyConnector({
      apiUrl: options.apiUrl,
      fragments: options.fragments,
    }),
    utils: {},
    subscribers: {},
  };
};

export { client } from './client';

export * from './types';
export * from './fragments';

