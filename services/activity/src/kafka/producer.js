import dotenv from "dotenv";
dotenv.config();

import { Kafka, Partitioners } from "kafkajs";

if (!process.env.KAFKA_BROKERS) {
  throw new Error("KAFKA_BROKERS is not defined in .env");
}

const kafka = new Kafka({
  clientId: "activity-service",
  brokers: process.env.KAFKA_BROKERS.split(","), // ✅ FIX
});

export const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

let isConnected = false;

export const connectProducer = async () => {
  if (!isConnected) {
    await producer.connect();
    isConnected = true;
    console.log("Kafka producer connected");
  }
};

export const sendEvent = async (topic, message) => {
  await connectProducer();

  await producer.send({
    topic,
    messages: [
      {
        value: JSON.stringify(message),
      },
    ],
  });

  console.log(`Event sent to ${topic}`);
};
