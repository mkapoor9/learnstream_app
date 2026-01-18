import dotenv from "dotenv";
dotenv.config();

import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: process.env.KAFKA_BROKERS.split(","),
});

const producer = kafka.producer();
let connected = false;

export const emitPaymentEvent = async (event) => {
  if (!connected) {
    await producer.connect();
    connected = true;
  }

  await producer.send({
    topic:'payment-events',
    messages: [{ value: JSON.stringify(event) }],
  });
};
