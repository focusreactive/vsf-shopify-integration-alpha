import { FragmentInstance, ShopifyIntegrationContext } from '../../types';
import {
  ProductResponseType,
  ProductQueryResponseType,
} from '../../model/types';
import {
  GET_PRODUCTS_FROM_COLLECTION_QUERY,
  GET_PRODUCTS_QUERY,
  PRODUCT_DETAILS_FRAGMENT,
} from '../../model/queries';
import { flattenVariantData } from '../../model/products';

export type GetProductsProps = {
  productFragment: FragmentInstance;
  collectionHandle?: string;
  pagination?: {
    after?: string | null;
    first?: number;
  };
  sorting?: {
    sortKey: SortKey;
    direction?: 'ASC' | 'DESC';
  };
  query?: string;
};

enum SortKey {
  TITLE = 'TITLE',
  PRODUCT_TYPE = 'PRODUCT_TYPE',
  VENDOR = 'VENDOR',
  UPDATED_AT = 'UPDATED_AT',
  CREATED_AT = 'CREATED_AT',
  BEST_SELLING = 'BEST_SELLING',
  PRICE = 'PRICE',
  ID = 'ID',
  RELEVANCE = 'RELEVANCE',
}

type GetProductsQueryResponse = {
  data: {
    products?: {
      edges: Array<{ node: ProductQueryResponseType }>;
      pageInfo: PageInfo;
    };
    collection?: {
      products: {
        edges: Array<{ node: ProductQueryResponseType }>;
        pageInfo: PageInfo;
      };
    };
  };
};

type PageInfo = {
  hasNextPage: boolean;
  endCursor: string | null;
};

export type GetProductsFunction = (
  context: ShopifyIntegrationContext,
  params: GetProductsProps
) => Promise<{
  products: Array<ProductResponseType>;
  pageInfo: PageInfo;
}>;

/**
 * Retrieves a list of products, optionally from a specific collection, with support for pagination and sorting.
 *
 * The function fetches products based on the provided parameters. If a collection handle is provided,
 * it fetches products from that specific collection. Otherwise, it retrieves a general list of products.
 * The function also supports pagination and sorting of the products.
 *
 * Ensures that the response includes all mandatory fields for the products and their variants.
 * The function validates the presence of essential fields in the returned product data.
 *
 * Required fields in the product fragment include:
 * - id: Unique identifier for each product.
 * - title: Product title.
 * - description: Product description.
 * - slug: SEO-friendly URL slug for the product.
 * - variants: Variants available for the product.
 *
 * Required fields in each variant fragment include:
 * - id: Unique identifier for each variant.
 * - sku: Stock Keeping Unit for tracking inventory.
 * - title: Title of the variant.
 * - price: Price of the variant.
 *
 * @param {ShopifyIntegrationContext} context - The Shopify integration context, containing the client for API calls.
 * @param {GetProductsProps} params - Parameters for fetching products. Includes:
 *   - productFragment: A GraphQL fragment to shape product data.
 *   - collectionHandle: (Optional) Handle of the collection from which to fetch products.
 *   - pagination: (Optional) Pagination details, including 'after' cursor and 'first' (number of items).
 *   - sorting: (Optional) Sorting preferences, including sort key and direction.
 *   - query: (Optional) Additional query to filter products.
 * @returns {Promise<{ products: Array<ProductResponseType>, pageInfo: PageInfo }>}
 *   Returns an array of product details along with pagination information.
 * @throws {Error} Throws an error if the product fragment is not provided or if there are missing required fields in product data.
 */
export const getProducts: GetProductsFunction = async (context, params) => {
  const { storefrontClient } = context.client;

  if (!params.productFragment) {
    throw new Error('Product fragment is required to shape the product data');
  }

  const productFragment = PRODUCT_DETAILS_FRAGMENT(params.productFragment);
  const queryVariables = {
    first: params.pagination?.first || 24,
    after: params.pagination?.after || null,
    sortKey: params.sorting?.sortKey,
    reverse: params.sorting?.direction === 'DESC',
    query: params.query,
    collectionHandle: params.collectionHandle,
  };

  const query = params.collectionHandle
    ? GET_PRODUCTS_FROM_COLLECTION_QUERY
    : GET_PRODUCTS_QUERY;

  try {
    const response = await storefrontClient.query<GetProductsQueryResponse>({
      data: {
        query: `${query}
                ${productFragment}`,
        variables: queryVariables,
      },
    });

    const collectionData = params.collectionHandle
      ? response?.body?.data?.collection?.products
      : response?.body?.data?.products;

    const productsEdges = collectionData?.edges || [];
    const pageInfo = collectionData?.pageInfo;

    const products = productsEdges.map((edge) => {
      const product = edge.node;

      const { id, title, description, slug, variants } = product;
      if (!id || !title || description === undefined || !slug || !variants) {
        throw new Error('Missing required fields in product data');
      }

      return {
        ...product,
        variants: flattenVariantData(product.variants),
      };
    });

    return {
      products,
      pageInfo: {
        hasNextPage: pageInfo?.hasNextPage || false,
        endCursor: pageInfo?.endCursor || null,
      },
    };
  } catch (error) {
    console.error('Error retrieving products:', error);
    throw new Error('Failed to retrieve products. Please try again later.');
  }
};
