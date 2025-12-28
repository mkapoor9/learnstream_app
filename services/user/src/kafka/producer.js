import { Kafka } from "kafkajs";
import "dotenv/config";

const kafka = new Kafka({
  clientId: "user-service",
  brokers: process.env.KAFKA_BROKERS.split(","),
});

export const producer = kafka.producer();

export const connectProducer = async () => {
  await producer.connect();
};

export const emitUserEvent = async (event) => {
  await producer.send({
    topic: "user-events",
    messages: [{ value: JSON.stringify(event) }],
  });
};
