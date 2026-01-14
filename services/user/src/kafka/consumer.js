import {Kafka} from 'kafkajs';
import prisma from '../db/prisma.js';
import 'dotenv/config';
import { title } from 'node:process';
import { type } from 'node:os';

const kafka = new Kafka({
    clientId:"user-service",
    brokers:process.env.KAFKA_BROKERS.split(","),
})

const consumer = kafka.consumer({
    groupId:"user-service-group"
})

export const startUserConsumer = async() =>{
    console.log("IN THE USER CONSUMER")
    await consumer.connect();

    await consumer.subscribe({topic:"user-activity"});

    await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const event = JSON.parse(message.value.toString());

      switch (event.type) {
        case "USER_SIGNUP":
          await prisma.userProfile.upsert({
          where: { email:event.metadata.email},
          update: {},
          create: {
            id: event.userId,
            email: event.metadata.email,
          },
        });
        console.log("User profile auto-created:", event.userId);
          break;
        default:
          // Ignore other events
          break;
      }
    },
  });

  console.log("Notification Kafka consumer running");
}