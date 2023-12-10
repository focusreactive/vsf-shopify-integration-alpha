import { GET_CART_QUERY, CART_DETAILS_FRAGMENT } from '../../model/queries';
import { CartDetails, CartResponseType } from '../../model/types';
import { ShopifyIntegrationContext, FragmentInstance } from '../../types';

// Define the function type for getCart
export type GetCartProps = {
  cartId: string;
  productFragment: FragmentInstance;
};

export const getCart = async (
  context: ShopifyIntegrationContext,
  params: GetCartProps
): Promise<CartResponseType> => {
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

    return { data: response?.body?.data?.cart };

  } catch (error) {
    console.error('Error retrieving cart:', error);
    throw new Error('Failed to retrieve cart. Please try again later.');
  }
};
