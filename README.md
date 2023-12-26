# VSF Shopify Boilerplate

Included:

- Shopify Integration:
  - Shopify Middleware
  - Shopify SDK
- Shopify Storefront SDK

### How to develop locally:

```console
yarn
yarn dev
```

open your in browser http://localhost:3000/

start editing NextSJ app in `/storefront/apps/web` in your IDE

Note: you need to setup your Shopify account and provide credentials to `playground/middleware/middleware.config.js`

Additionally you have to setup some custom metaobject schemas to consume and generate landing pages

To setup these metaobjects you can utilize GraphQL mutation through Admin endpoint:

```GraphQL

mutation ($schema: MetaobjectCreateInput!) {
  metaobjectCreate(metaobject: $schema) {
    metaobject {
      id
    }
  }
}

```

you can find the metaobject definitions in the documentation in JSON file. It contains the result of calling the following query:

```graphql
{
  metaobjectDefinitions(first: 50) {
    edges {
      node {
        id
        type
        name
        description
        fieldDefinitions {
          name
          key
          description
          type {
            category
            name
          }
          required
        }
      }
    }
  }
}
```

### Build & Run the project locally

1. `yarn build` - this will build the middleware and SDK
2. `yarn dev:middleware` - this will launch middleware locally
3. `cd storefront/apps/web && yarn build` - this will start NextJS build and pages generation. On the build step NextJS will perform calls to Shopify through middleware
4. `cd storefront/apps/web && yarn start` - to launch NextJS production ready app (middleware should be launched `yarn dev:middleware`)

## Features

Project utilize the best from SSG, SSR and client side fetching, combining this methods for providing the best performance and experience for storefront visitors.

- Product pages

