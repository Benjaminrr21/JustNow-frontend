// setupProxy.js
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
  app.use(
    '/adminNotificationHub',
    createProxyMiddleware({
      target: 'http://benjamin002-001-site1.jtempurl.com',
      changeOrigin: true,
    })
  );
};
