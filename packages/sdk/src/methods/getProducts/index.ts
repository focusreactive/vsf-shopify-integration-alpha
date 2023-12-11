import { client } from '../../client';
import { getFragment } from '../../fragments';
import { FragmentInstance, FragmentName } from '../../types';
import { ProductResponseType } from '../../types/products';

/**
 * Retrieves a list of products, optionally from a specific collection, with support for pagination and sorting.
 *
 * The 'productFragment' parameter allows for customization of the product data shape, specifying the fields of the product
 * and its variants to be included in the response from Shopify. This enables tailoring the product data structure
 * to specific frontend requirements.
 *
 * The method also supports pagination and sorting, allowing for efficient data retrieval based on frontend needs.
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
 * @param {object} props - Properties for fetching products.
 * @param {FragmentInstance} [props.productFragment] - Optional override for the product GraphQL fragment.
 * @param {string} [props.collectionHandle] - Optional collection handle to fetch products from a specific collection.
 * @param {object} [props.pagination] - Optional pagination details.
 * @param {object} [props.sorting] - Optional sorting preferences.
 * @returns {Promise<Array<ProductResponseType>>} Promise resolving to the list of product details.
 * @throws {Error} If the API call fails.
 */
export const getProducts = async (props: {
    productFragment?: FragmentInstance;
    collectionHandle?: string;
    pagination?: {
        after?: string | null;
        first?: number;
    };
    sorting?: {
        sortKey: string;
        direction?: 'ASC' | 'DESC';
    };
}): Promise<Array<ProductResponseType>> => {
    const productFragment = props.productFragment || getFragment(FragmentName.product);

    try {
        const response = await client.post<Array<ProductResponseType>>('/getProducts', {
            productFragment,
            collectionHandle: props.collectionHandle,
            pagination: props.pagination,
            sorting: props.sorting,
        });

        if (response.data) {
            return response.data;
        } else {
            throw new Error('Failed to retrieve products');
        }
    } catch (error) {
        console.error('Error retrieving products:', error);
        throw new Error('Failed to retrieve products. Please try again later.');
    }
};
