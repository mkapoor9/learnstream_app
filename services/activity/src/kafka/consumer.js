import dotenv from "dotenv";
dotenv.config();

import { Kafka } from "kafkajs";
import activity from "../db/models/activity.js";
import { sendToTopic } from "./producer.js"; // ✅ REQUIRED

console.log("KAFKA_BROKERS =", process.env.KAFKA_BROKERS);

const MAX_RETRIES = 3;

const kafka = new Kafka({
  clientId: "activity-service",
  brokers: process.env.KAFKA_BROKERS.split(","),
  retry: {
    retries: 10,
    initialRetryTime: 500,
  },
});

export const consumer = kafka.consumer({
  groupId: "activity-consumer-group",
});

export const startConsumer = async () => {
  console.log("🚀 Starting Kafka consumer...");

  await consumer.connect();

  await consumer.subscribe({
    topic: "user-activity",
    fromBeginning: false,
  });

  await consumer.subscribe({
    topic: "user-activity-retry",
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      let event;

      try {
        event = JSON.parse(message.value.toString());
      } catch (err) {
        console.error("❌ Invalid JSON, sending to DLQ:", message.value.toString());
        await sendToTopic("user-activity-dlq", {
          raw: message.value.toString(),
          error: "INVALID_JSON",
        });
        return;
      }

      console.log("🔥 EVENT RECEIVED:", event);

      try {
        await activity.create({
          userId: event.userId,
          type: event.type,
          metadata: event.metadata || {},
          timestamp: event.timestamp || new Date(),
          retryCount: event.retryCount || 0,
        });

        console.log("✅ Activity Logged:", event);
      } catch (err) {
        console.error("❌ Mongo write failed:", err.message);

        event.retryCount = (event.retryCount || 0) + 1;

        if (event.retryCount <= MAX_RETRIES) {
          console.log("🔁 Retrying event:", event.retryCount);
          await sendToTopic("user-activity-retry", event);
        } else {
          console.log("☠️ Sending to DLQ");
          await sendToTopic("user-activity-dlq", event);
        }
      }
    },
  });
};
