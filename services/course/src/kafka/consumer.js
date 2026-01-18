import {Kafka} from 'kafkajs';
import prisma from '../db/prisma.js';
import 'dotenv/config';
import { title } from 'node:process';
import { type } from 'node:os';

const kafka = new Kafka({
    clientId:"course-service",
    brokers:process.env.KAFKA_BROKERS.split(","),
})

const consumer = kafka.consumer({
    groupId:"course-service-group"
})

export const startCourseConsumer = async() =>{
    console.log("IN THE COURSE CONSUMER")
    await consumer.connect();

    await consumer.subscribe({topic:"payment-events"});

    await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const event = JSON.parse(message.value.toString());

      switch (event.type) {
        case "PAYMENT_SUCCESS":
          await prisma.enrollment.create({
                    data: {
                    userId: event.userId,
                    courseId: event.courseId,
                    },
            });
        console.log("PAYMENT SUCCESFULL:", event.userId);
          break;
        default:
          // Ignore other events
          break;
      }
    },
  });

  console.log("Notification Kafka consumer running");
}