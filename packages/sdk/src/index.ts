import { shopifyConnector } from './connector';
import { initOptions } from './options';
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
  initOptions(options);
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

type FragmentInstance = {
  [name: string]: {
    fragment: string;
    dependencies: Array<FragmentInstance>;
  };
};

type FragmentFn = (
  name: string,
  fragment: string,
  dependencies?: Array<FragmentInstance>
) => FragmentInstance;

export const frg: FragmentFn = (name, fragment, dependencies) => ({
  [name]: {
    fragment,
    dependencies,
  },
});
