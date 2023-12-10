import {
  CART_DETAILS_FRAGMENT,
  CREATE_CART_MUTATION,
} from '../../model/queries';
import { CartDetails, FlatCartLine } from '../../model/types';
import { FragmentInstance, ShopifyIntegrationContext } from '../../types';
import { flattenCartLines } from '../../model/cart';

export type InitCartProps = {
  lines: Array<{ merchandiseId: string; quantity: number }>;
  productFragment: FragmentInstance;
};

export type InitCartFunction = (
  context: ShopifyIntegrationContext,
  params: InitCartProps
) => Promise<{
  id: CartDetails['id'];
  checkoutUrl: CartDetails['checkoutUrl'];
  lines: Array<FlatCartLine>;
}>;

export const initCart: InitCartFunction = async (context, params) => {
  const { storefrontClient } = context.client;

  if (!params.lines || params.lines.length === 0) {
    throw new Error('Lines are required to initialize a new cart');
  }
  if (!params.productFragment) {
    throw new Error('Product fragment is required to shape the product data');
  }

  const cartFragment = CART_DETAILS_FRAGMENT(params.productFragment);

  const response = await storefrontClient.query<{
    data: { cartCreate: { cart: CartDetails } };
  }>({
    data: {
      query: `${CREATE_CART_MUTATION}
      ${cartFragment}`,
      variables: { lines: params.lines },
    },
  });

  const cart = response?.body?.data?.cartCreate.cart;

  if (!cart) {
    throw new Error('Failed to initialize cart');
  }

  return { ...cart, lines: flattenCartLines(cart) };
};
