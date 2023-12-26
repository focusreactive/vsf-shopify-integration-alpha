require('@shopify/shopify-api/adapters/node');
const { createServer } = require("@vue-storefront/middleware");
const { integrations } = require("./middleware.config");
const cors = require("cors");

(async () => {
  const app = await createServer({ integrations });
  const host = process.argv[2] ?? "localhost";
  const port = process.argv[3] ?? 8181;
  const CORS_MIDDLEWARE_NAME = "corsMiddleware";

  const corsMiddleware = app._router.stack.find(
    (middleware) => middleware.name === CORS_MIDDLEWARE_NAME
  );

  corsMiddleware.handle = cors({
    origin: [
      "http://localhost:3000",
      "https://localhost:3001",
      "https://02cb-2405-9800-b961-1e9f-8cbf-4f44-dd2c-5620.ngrok-free.app",
      ...(process.env.MIDDLEWARE_ALLOWED_ORIGINS?.split(",") ?? []),
    ],
    credentials: true,
  });

  app.listen(port, host, () => {
    console.log(`Middleware started: ${host}:${port}`);
  });
})();
