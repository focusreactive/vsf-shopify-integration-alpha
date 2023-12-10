import { ShopifyIntegrationContext } from '..';
import { InitCartFunction } from '../../api/initCart';
import { GetCartFunction } from '../../api/getCart';
import { UpdateCartFunction } from '../../api/updateCart';
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

  initCart: InitCartFunction;

  getCart: GetCartFunction;

  updateCart: UpdateCartFunction;
}
