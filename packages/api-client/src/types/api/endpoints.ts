import { ShopifyIntegrationContext, TODO } from '..';

type QueryString = string;

/**
 * Definition of all API-client methods available in {@link https://docs.vuestorefront.io/v2/advanced/context.html#context-api | context}.
 */
export interface Endpoints {
  /**
   * Here you can find an example endpoint definition. Based on this example, you should define how your endpoint will look like.
   * This description will appear in the API extractor, so try to document all endpoints added here.
   */
  exampleEndpoint(
    context: ShopifyIntegrationContext,
    params: TODO
  ): Promise<TODO>;
  getProduct(context: ShopifyIntegrationContext, params: TODO): Promise<TODO>;
  customQuery(
    context: ShopifyIntegrationContext,
    params: CustomQueryParams
  ): Promise<CustomQueryResults>;
  getProducts(context: ShopifyIntegrationContext, params?: TODO): Promise<TODO>;
}

export type CustomQueryParams = {
  query: QueryString;
};

export type CustomQueryResults = {
  data: Object;
};
