import { CartDetails, CartResponseType, FlatCartLine } from "./types";


export const flattenCartLines = (
  cartResponse: CartDetails
): FlatCartLine[] => {
  const lines = cartResponse.lines.edges.map((edge) => edge.node);
  return lines;
};
