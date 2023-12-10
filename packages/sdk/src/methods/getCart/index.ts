import { client } from '../../client';
import { getFragment } from '../../fragments';
import { CartDetails, FlatCartLine } from '../../types/cart';
import { FragmentInstance, FragmentName } from '../../types';

type GetCartProps = {
  cartId: string;
  productFragment?: FragmentInstance;
};

type GetCartReturns = {
  id: CartDetails['id'];
  checkoutUrl: CartDetails['checkoutUrl'];
  lines: Array<FlatCartLine>;
};

/**
 * Retrieves an existing shopping cart based on the provided cart ID.
 *
 * @remarks
 * This method calls the 'getCart' endpoint from the API middleware.
 * It is typically used to fetch the state of a specific cart, identified by `cartId`.
 * A custom product fragment can be provided to shape the product data in the response.
 *
 * @param props - The properties for retrieving a cart.
 * @returns The details of the retrieved cart.
 *
 * @example
 * getCart({ cartId: "gid://shopify/Cart/67890" });
 */
export async function getCart(props: GetCartProps): Promise<GetCartReturns> {
  if (!props.cartId) {
    throw new Error('Cart ID is required to retrieve a cart.');
  }

  const productFragment = props.productFragment || getFragment(FragmentName.product);

  try {
    const { data } = await client.post<GetCartReturns>('getCart', { ...props, productFragment });
    return data;
  } catch (error) {
    console.error('Error retrieving cart:', error);
    throw an Error('Failed to retrieve cart. Please try again later.');
  }
}
