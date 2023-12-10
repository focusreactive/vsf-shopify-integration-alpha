import { client } from '../../client';
import { getFragment } from '../../fragments';
import { FragmentInstance, FragmentName } from '../../types';
import { CartDetails, FlatCartLine } from '../../types/cart';


type InitCartProps = {
  lines: Array<{ merchandiseId: string; quantity: number }>;
  productFragment?: FragmentInstance;
};

type InitCartReturns = {
  id: CartDetails['id'];
  checkoutUrl: CartDetails['checkoutUrl'];
  lines: Array<FlatCartLine>;
};

/**
 * Initiates a new shopping cart with specified line items and product fragment.
 *
 * @remarks
 * This method is used to create a new cart with line items. It allows passing a custom product fragment
 * to shape the product data in the response. The method interacts with the 'initCart' endpoint of the API middleware.
 *
 * @param props - The properties for cart creation, including line items and an optional productFragment.
 * @returns The details of the newly created cart.
 *
 * @example
* // To create a new cart with a single product
* initCart({
*   lines: [{ merchandiseId: "gid://shopify/ProductVariant/12345", quantity: 1 }],
*   productFragment: yourCustomProductFragment, // Optional, falls back to default if not provided
* });
*/
export async function initCart(props: InitCartProps): Promise<InitCartReturns> {
  if (!props.lines || props.lines.length === 0) {
    throw new Error('Lines are required to create a new cart.');
  }

  const productFragment = props.productFragment || getFragment(FragmentName.product);

  try {
    const { data } = await client.post<InitCartReturns>('initCart', { ...props, productFragment });
    if (!data || !data.id || !data.checkoutUrl || !data.lines) {
      throw new Error('Invalid response structure from initCart endpoint');
    }
    return data;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw new Error('Failed to create cart. Please try again later.');
  }
}
