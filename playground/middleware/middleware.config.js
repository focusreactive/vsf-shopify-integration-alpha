module.exports = {
  integrations: {
    shopify: {
      location: '@vue-storefront/shopify-api/server',
      configuration: {
        app: {
          apiKey: 'd17c427186312f23db090ae337ddb34a',
          apiSecretKey: '14af09a82e4d92653594884088be7357',
          scopes: ['read_products'],
          hostName: '0.0.0.0:8181',
        },
        storeFrontClient: {
          domain: 'vsf-plugin-alfa.myshopify.com',
          storefrontAccessToken: '65809bb82349c99f77c4cefbb00f5537',
        },
      },
    },
  },
};
