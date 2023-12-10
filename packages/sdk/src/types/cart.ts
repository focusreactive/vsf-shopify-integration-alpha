export type CartDetails = {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: {
        id: string;
        merchandise: {
          product: {
            title: string;
          };
        };
        quantity: number;
      };
    }>;
  };
};

export type FlatCartLine = {
  id: string;
  merchandise: {
    product: {
      title: string;
    };
  };
  quantity: number;
};
