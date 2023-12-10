import { GET_CART_QUERY, CART_DETAILS_FRAGMENT } from '../../model/queries';
import { CartDetails, CartResponseType, FlatCartLine } from '../../model/types';
import { ShopifyIntegrationContext, FragmentInstance } from '../../types';
import { flattenCartLines } from '../../model/cart';

export type GetCartProps = {
  cartId: string;
  productFragment: FragmentInstance;
};

export type GetCartFunction = (
  context: ShopifyIntegrationContext,
  params: GetCartProps
) => Promise<{
  id: CartDetails['id'];
  checkoutUrl: CartDetails['checkoutUrl'];
  lines: Array<FlatCartLine>;
}>;

export const getCart: GetCartFunction = async (context, params) => {
  const { storefrontClient } = context.client;

  if (!params.cartId) {
    throw new Error('Cart ID is required to retrieve a cart');
  }
  if (!params.productFragment) {
    throw new Error('Product fragment is required to shape the product data');
  }

  const cartFragment = CART_DETAILS_FRAGMENT(params.productFragment);

  try {
    const response = await storefrontClient.query<{
      data: { cart: CartDetails };
    }>({
      data: {
        query: `${GET_CART_QUERY}
                ${cartFragment}`,
        variables: { cartId: params.cartId },
      },
    });

    const cart = response?.body?.data?.cart;

    if (!cart) {
      throw new Error('Failed to initialize cart');
    }

    return { ...cart, lines: flattenCartLines(cart) };
  } catch (error) {
    console.error('Error retrieving cart:', error);
    throw new Error('Failed to retrieve cart. Please try again later.');
  }
};
