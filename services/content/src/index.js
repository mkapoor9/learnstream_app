import express from "express";
import cors from "cors";
import "dotenv/config";
import contentRoutes from "./routes/contentRoutes.js";
import { connectContentProducer } from "./kafka/producer.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", contentRoutes);

const PORT = process.env.PORT || 4004;
app.listen(PORT, async () => {
  console.log(`Content Service running on ${PORT}`);
  await connectContentProducer();
});

