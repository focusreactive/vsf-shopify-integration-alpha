import { ShopifyIntegrationContext, FragmentInstance } from '../../types';
import { CartDetails, CartResponseType } from '../../model/types';
import {
  ADD_CART_LINES_MUTATION,
  REMOVE_CART_LINES_MUTATION,
  UPDATE_CART_LINES_MUTATION,
  CART_DETAILS_FRAGMENT
} from '../../model/queries';

export type UpdateCartProps = {
  cartId: string;
  addLines?: Array<{ merchandiseId: string; quantity: number }>;
  removeLineIds?: Array<string>;
  updateLines?: Array<{ id: string; quantity: number }>;
  productFragment: FragmentInstance;
};

export const updateCart = async (
  context: ShopifyIntegrationContext,
  params: UpdateCartProps
): Promise<CartResponseType> => {
  const { storefrontClient } = context.client;

  if (!params.cartId) {
    throw new Error('Cart ID is required to update a cart');
  }
  if (!params.productFragment) {
    throw new Error('Product fragment is required to shape the product data');
  }

  const cartFragment = CART_DETAILS_FRAGMENT(params.productFragment);

  try {
    let updatedCartDetails: CartDetails | null = null;

    // Handle adding new lines
    if (params.addLines && params.addLines.length > 0) {
      const addResponse = await storefrontClient.query<{
        data: { cartLinesAdd: { cart: CartDetails } };
      }>({
        data: {
          query: `${ADD_CART_LINES_MUTATION}
                  ${cartFragment}`,
          variables: {
            cartId: params.cartId,
            lines: params.addLines,
          },
        },
      });
      updatedCartDetails = addResponse?.body?.data?.cartLinesAdd?.cart;
    }

    // Handle removing lines
    if (params.removeLineIds && params.removeLineIds.length > 0) {
      const removeResponse = await storefrontClient.query<{
        data: { cartLinesRemove: { cart: CartDetails } };
      }>({
        data: {
          query: `${REMOVE_CART_LINES_MUTATION}
                  ${cartFragment}`,
          variables: {
            cartId: params.cartId,
            lineIds: params.removeLineIds,
          },
        },
      });
      updatedCartDetails = removeResponse?.body?.data?.cartLinesRemove?.cart;
    }

    // Handle updating existing lines
    if (params.updateLines && params.updateLines.length > 0) {
      const updateResponse = await storefrontClient.query<{
        data: { cartLinesUpdate: { cart: CartDetails } };
      }>({
        data: {
          query: `${UPDATE_CART_LINES_MUTATION}
                  ${cartFragment}`,
          variables: {
            cartId: params.cartId,
            lines: params.updateLines,
          },
        },
      });
      updatedCartDetails = updateResponse?.body?.data?.cartLinesUpdate?.cart;
    }

    if (!updatedCartDetails) {
      throw new Error('No changes were made to the cart');
    }

    return { data: updatedCartDetails };

  } catch (error) {
    console.error('Error updating cart:', error);
    throw new Error('Failed to update cart. Please try again later.');
  }
};
