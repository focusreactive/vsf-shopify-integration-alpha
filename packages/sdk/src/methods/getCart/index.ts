import { client } from '../../client';
import { CartDetails } from '../../types/cart';

type GetCartProps = {
  cartId: string;
};

type GetCartReturns = CartDetails;

/**
 * Retrieves an existing shopping cart based on the provided cart ID.
 *
 * @remarks
 * This method calls the 'getCart' endpoint from the API middleware.
 * It is typically used to fetch the state of a specific cart, identified by `cartId`.
 *
 * @param props - The properties for retrieving a cart.
 *
 * @returns The details of the retrieved cart.
 *
 * @example
 * getCart({ cartId: "gid://shopify/Cart/67890" });
 */
export async function getCart(props: GetCartProps): Promise<GetCartReturns> {
  if (!props.cartId) {
    throw new Error('Cart ID is required to retrieve a cart.');
  }

  try {
    const { data } = await client.post<GetCartReturns>('getCart', props);
    return data;
  } catch (error) {
    console.error('Error retrieving cart:', error);
    throw new Error('Failed to retrieve cart. Please try again later.');
  }
}