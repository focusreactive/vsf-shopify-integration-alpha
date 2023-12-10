import { ShopifyIntegrationContext } from '..';
import { CartResponseType } from '../../model/types';
import { InitCartProps } from '../../api/initCart';
import { GetCartProps } from '../../api/getCart';
import { UpdateCartProps } from '../../api/updateCart';
import { GetProduct } from '../../api/getProduct';
import { GetProducts } from '../../api/getProducts';

/**
 * Definition of all API-client methods available in {@link https://docs.vuestorefront.io/v2/advanced/context.html#context-api | context}.
 */
export interface Endpoints {
  exampleEndpoint(
    context: ShopifyIntegrationContext,
    params: any // Update with specific type if available
  ): Promise<any>; // Update with specific return type if available

  getProduct: GetProduct;

  customQuery(
    context: ShopifyIntegrationContext,
    params: any // Update with specific type if available
  ): Promise<any>; // Update with specific return type if available

  getProducts: GetProducts;

  initCart: (
    context: ShopifyIntegrationContext,
    params: InitCartProps
  ) => Promise<CartResponseType>;

  getCart: (
    context: ShopifyIntegrationContext,
    params: GetCartProps
  ) => Promise<CartResponseType>;

  updateCart: (
    context: ShopifyIntegrationContext,
    params: UpdateCartProps
  ) => Promise<CartResponseType>;
}
