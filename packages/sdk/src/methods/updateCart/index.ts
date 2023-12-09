import { client } from '../../client';
import { CartDetails } from '../../types/cart';

export type UpdateCartProps = {
  cartId: string;
  addLines?: Array<{ merchandiseId: string; quantity: number }>;
  removeLineIds?: Array<string>;
  updateLines?: Array<{ id: string; quantity: number }>;
};

export type UpdateCartReturns = CartDetails;

/**
 * Updates the contents of an existing shopping cart.
 *
 * @param props - The properties for cart update, including the cart ID and details for add, remove, and update operations.
 *
 * @returns The details of the updated cart.
 *
 * @example
 * // To add a new line item to the cart
 * updateCart({
 *   cartId: "gid://shopify/Cart/12345",
 *   addLines: [{ merchandiseId: "gid://shopify/ProductVariant/67890", quantity: 2 }]
 * });
 *
 * @example
 * // To remove a line item from the cart
 * updateCart({
 *   cartId: "gid://shopify/Cart/12345",
 *   removeLineIds: ["gid://shopify/CartLine/23456"]
 * });
 *
 * @example
 * // To update the quantity of a line item in the cart
 * updateCart({
 *   cartId: "gid://shopify/Cart/12345",
 *   updateLines: [{ id: "gid://shopify/CartLine/23456", quantity: 3 }]
 * });
 */
export async function updateCart(props: UpdateCartProps): Promise<UpdateCartReturns> {
  if (!props.cartId) {
    throw new Error('Cart ID is required for updating the cart');
  }
  if (!props.addLines && !props.removeLineIds && !props.updateLines) {
    throw new Error('No update operation specified. Please provide addLines, removeLineIds, or updateLines');
  }

  try {
    const { data } = await client.post<UpdateCartReturns>('updateCart', props);
    return data;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw new Error('Failed to update cart. Please try again later.');
  }
}
