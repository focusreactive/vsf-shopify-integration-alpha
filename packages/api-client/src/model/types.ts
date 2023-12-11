export type CartResponseType = {
  data: CartDetails;
};

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

export type VariantDetails = {
  id: string;
  sku: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
};

export type ProductQueryResponseType = {
  id: string;
  title: string;
  description: string;
  slug: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: {
    edges: { node: VariantDetails }[];
  };
};

export type ProductResponseType = {
  id: string;
  title: string;
  description: string;
  slug: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants: VariantDetails[];
};
