import { FragmentInstance, ShopifyIntegrationContext } from '../../types';
import {
  ProductQueryResponseType,
  ProductResponseType,
} from '../../model/types';
import {
  GET_PRODUCT_BY_HANDLE_QUERY,
  PRODUCT_DETAILS_FRAGMENT,
} from '../../model/queries';
import { flattenVariantData } from '../../model/products';

type GetProductProps = {
  productHandle: string;
  productFragment: FragmentInstance;
};

type GetProductQueryResponse = {
  data: {
    productByHandle: ProductQueryResponseType;
  };
};

export type GetProductFunction = (
  context: ShopifyIntegrationContext,
  params: GetProductProps
) => Promise<ProductResponseType>;

/**
 * Retrieves product details by product handle.
 * Ensures that the response includes all mandatory fields for the product and its variants.
 * Required fields in product fragment: id, title, description, slug, priceRange, variants.
 * Required fields in variant fragment: id, sku, title, price.
 *
 * @param {ShopifyIntegrationContext} context - The Shopify integration context.
 * @param {GetProductProps} params - Parameters including product handle and product fragment.
 * @returns {Promise<ProductResponseType>} - The product details with flattened variant data.
 * @throws {Error} If required fields are missing in the response.
 */
export const getProduct: GetProductFunction = async (context, params) => {
  const { storefrontClient } = context.client;

  if (!params.productHandle) {
    throw new Error('Product handle is required to retrieve product details');
  }
  if (!params.productFragment) {
    throw new Error('Product fragment is required to shape the product data');
  }

  const productFragment = PRODUCT_DETAILS_FRAGMENT(params.productFragment);

  try {
    const response = await storefrontClient.query<GetProductQueryResponse>({
      data: {
        query: `${GET_PRODUCT_BY_HANDLE_QUERY}
                ${productFragment}`,
        variables: { productHandle: params.productHandle },
      },
    });

    const product = response?.body?.data?.productByHandle;
    if (!product) {
      throw new Error('Failed to retrieve product details');
    }

    // Check for required product fields
    const { id, title, description, slug, priceRange, variants } = product;
    if (!id || !title || description === undefined || !slug || !variants) {
      throw new Error('Missing required fields in product data');
    }

    // Flatten variants and check for required fields
    const flattenedVariants = flattenVariantData(product.variants);

    return {
      ...product,
      variants: flattenedVariants,
    };
  } catch (error) {
    console.error('Error retrieving product:', error);
    throw new Error('Failed to retrieve product. Please try again later.');
  }
};
