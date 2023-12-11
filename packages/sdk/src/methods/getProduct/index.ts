import { client } from '../../client';
import { getFragment } from '../../fragments';
import { FragmentInstance, FragmentName } from '../../types';
import { ProductResponseType } from '../../types/products';

/**
 * Retrieves product details by product slug.
 *
 * The method fetches product details from Shopify using a customizable GraphQL fragment. This allows
 * for flexible shaping of the product data structure based on frontend needs.
 *
 * The 'productFragment' parameter enables the customization of the product data shape. It allows
 * specifying which fields of the product and its variants should be included in the response from Shopify.
 * This is particularly useful for tailoring the product data structure to specific frontend requirements.
 *
 * Required fields in the product fragment include:
 * - id: Unique identifier for each product.
 * - title: Product title.
 * - description: Product description.
 * - slug: SEO-friendly URL slug for the product.
 * - variants: Variants available for the product, returned as a simplified flat array.
 *
 * Required fields in each variant fragment include:
 * - id: Unique identifier for each variant.
 * - sku: Stock Keeping Unit for tracking inventory.
 * - title: Title of the variant.
 * - price: Price of the variant.
 *
 * @param {object} props - Properties for fetching a product.
 * @param {string} props.slug - The slug of the product to be retrieved.
 * @param {FragmentInstance} [props.productFragment] - Optional override for the product GraphQL fragment.
 * @returns {Promise<ProductResponseType>} Promise resolving to the product details.
 * @throws {Error} If required parameters are missing or the API call fails.
 */
export const getProduct = async (props: {
    slug: string;
    productFragment?: FragmentInstance;
}): Promise<ProductResponseType> => {
    if (!props.slug) {
        throw new Error('Product slug is required to retrieve product details');
    }

    const productFragment = props.productFragment || getFragment(FragmentName.product);

    try {
        const response = await client.post<ProductResponseType>('/getProduct', {
            productHandle: props.slug, // Renamed from handle to slug for clarity
            productFragment,
        });

        if (response.data) {
            return response.data;
        } else {
            throw new Error('Failed to retrieve product details');
        }
    } catch (error) {
        console.error('Error retrieving product:', error);
        throw new Error('Failed to retrieve product. Please try again later.');
    }
};
