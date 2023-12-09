import { CREATE_CART_MUTATION, GET_CART_QUERY } from '../../lib/queries';
import { CartDetails, CartResponseType } from '../../lib/types';
import { ShopifyIntegrationContext } from '../../types';




// Define the function type for initCart
export type InitCartFunction = (
  context: ShopifyIntegrationContext,
  params: {
    cartId?: string;
    lines?: Array<{ merchandiseId: string; quantity: number }>;
  }
) => Promise<CartResponseType>;

// Implement the initCart function
export const initCart: InitCartFunction = async (context, params) => {
  const { storefrontClient } = context.client;

  if (params.cartId) {
    // Fetching an existing cart
    const response = await storefrontClient.query<{
      data: { cart: CartDetails };
    }>({
      data: {
        query: GET_CART_QUERY,
        variables: { cartId: params.cartId },
      },
    });
    return { data: response?.body?.data?.cart };
  } else if (params.lines) {
    // Creating a new cart
    const response = await storefrontClient.query<{
      data: { cartCreate: { cart: CartDetails } };
    }>({
      data: {
        query: CREATE_CART_MUTATION,
        variables: { lines: params.lines },
      },
    });
    return { data: response?.body?.data?.cartCreate.cart };
  }

  throw new Error('Insufficient parameters provided for cart initialization');
};
