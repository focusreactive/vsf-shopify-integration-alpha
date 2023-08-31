module.exports = {
  integrations: {
    boilerplate: {
      location: '@vue-storefront/integration-boilerplate-api/server',
      configuration: {
        app: {
          apiKey: 'd17c427186312f23db090ae337ddb34a',
          apiSecretKey: '14af09a82e4d92653594884088be7357',
          scopes: ['read_products'],
          hostName: '0.0.0.0:8181',

        }
      },
    },
  },
};