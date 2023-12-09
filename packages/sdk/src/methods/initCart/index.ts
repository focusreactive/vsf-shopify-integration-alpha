import { client } from '../../client';
import { CartDetails } from '../../types/cart';

// Define the structure for the input properties
type InitCartProps = {
  lines: Array<{ merchandiseId: string; quantity: number }>;
};

// Define the structure for the return type
type InitCartReturns = CartDetails;

/**
 * Creates a new shopping cart with the specified line items.
 *
 * @remarks
 * This method calls the 'initCart' endpoint from the API middleware.
 * It is used to create a new cart with the provided line items.
 *
 * @param props - The properties for cart creation, including the line items.
 *
 * @returns The details of the newly created cart.
 *
 * @example
 * // To create a new cart with a single product
 * initCart({ lines: [{ merchandiseId: "gid://shopify/ProductVariant/12345", quantity: 1 }] });
 */
export async function initCart(props: InitCartProps): Promise<InitCartReturns> {
  // Ensure that lines are provided for cart creation
  if (!props.lines || props.lines.length === 0) {
    throw new Error('At least one product must be provided to create a new cart.');
  }

  try {
    const { data } = await client.post<InitCartReturns>('initCart', props);
    return data;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw new Error('Failed to create cart. Please try again later.');
  }
}
