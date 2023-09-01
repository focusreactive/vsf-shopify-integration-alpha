import { initSDK, buildModule } from '@vue-storefront/sdk';
import { shopifyModule, ShopifyModuleType } from '../../../src';

const sdkConfig = {
  shopify: buildModule<ShopifyModuleType>(shopifyModule, {
    apiUrl: 'http://localhost:8181/shopify',
  }),
};

export const sdk = initSDK<typeof sdkConfig>(sdkConfig);
