export type CartDetails = {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: {
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