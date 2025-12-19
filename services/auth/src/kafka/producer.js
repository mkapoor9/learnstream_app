
import dotenv from "dotenv";
dotenv.config();

import { Kafka } from "kafkajs";


const kafka = new Kafka({
  clientId: "auth-service",
  brokers: process.env.KAFKA_BROKERS.split(","),
});

const producer = kafka.producer();
let connected = false;

export const sendEvent = async (topic, payload) => {
  if (!connected) {
    await producer.connect();
    connected = true;
  }

  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(payload) }],
  });
};
