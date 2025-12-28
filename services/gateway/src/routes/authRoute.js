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
    req.url = "/auth" + req.url; // 
    console.log("Inside asdnansknad");
    next();
  },
  createProxyMiddleware({
    target: "http://auth:4001",
    changeOrigin: true,
    logLevel: "debug",
  })
);

export default router;
