export type VariantDetails = {
  id: string;
  sku: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  [key: string]: any;
};

export type ProductResponseType = {
  id: string;
  title: string;
  description: string;
  slug: string; // SEO-friendly URL slug for the product
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
  [key: string]: any;
  variants: VariantDetails[]; // Simplified flat array of variants
};
