import { VariantDetails } from './types';

/**
 * Flattens the variant data from the product response.
 * Ensures that all required fields for each variant are present.
 *
 * @param {any} variants - The variants object from the product GraphQL response.
 * @returns {VariantDetails[]} - An array of flattened variant details.
 * @throws {Error} If required fields are missing in any of the variants.
 */
export const flattenVariantData = (variants: {
  edges: { node: VariantDetails }[];
}): VariantDetails[] => {
  return variants.edges.map((edge: any) => {
    const { id, sku, title, price } = edge.node;

    // Check for required fields
    if (!id || !sku || !title || !price) {
      throw new Error('Missing required fields in variant data');
    }

    return {
      ...edge.node,
      id,
      sku,
      title,
      price,
    };
  });
};
