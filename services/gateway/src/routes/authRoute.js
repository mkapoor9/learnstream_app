import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const router = express.Router();

// Debug
router.use((req, res, next) => {
  console.log("🔥 Inside authRoutes:", req.method, req.url);
  next();
});

router.use(
    (req, res, next) => {
    req.url = "/auth" + req.url; // <-- THIS is the missing piece!
    next();
  },
  createProxyMiddleware({
    target: "http://localhost:4001",
    changeOrigin: true,
    logLevel: "debug",
  })
);

export default router;
