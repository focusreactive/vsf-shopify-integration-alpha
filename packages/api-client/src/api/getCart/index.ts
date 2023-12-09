import { GET_CART_QUERY } from '../../lib/queries';
import { CartDetails, CartResponseType } from '../../lib/types';
import { ShopifyIntegrationContext} from '../../types';

// Define the function type for getCart
export type GetCartFunction = (
  context: ShopifyIntegrationContext,
  params: { cartId: string }
) => Promise<CartResponseType>;

// Implement the getCart function
export const getCart: GetCartFunction = async (context, params) => {
  const { storefrontClient } = context.client;

  if (!params.cartId) {
    throw new Error('Cart ID is required to retrieve a cart');
  }

  const response = await storefrontClient.query<{
    data: { cart: CartDetails };
  }>({
    data: {
      query: GET_CART_QUERY,
      variables: { cartId: params.cartId },
    },
  });

  return { data: response?.body?.data?.cart };
};
