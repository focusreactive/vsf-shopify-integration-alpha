type CartLineNode = {
  id: string;
  merchandise: {
    product: {
      title: string;
    };
  };
  quantity: number;
};

type CartResponse = {
  data: {
    id: string;
    checkoutUrl: string;
    lines: {
      edges: Array<{
        node: CartLineNode;
      }>;
    };
  };
};

type FlatCartLine = {
  id: string;
  merchandise: {
    product: {
      title: string;
    };
  };
  quantity: number;
};

export const flattenCartLines = (
  cartResponse: CartResponse
): { data: FlatCartLine[] } => {
  const lines = cartResponse.data.lines.edges.map((edge) => edge.node);
  return { data: lines };
};
