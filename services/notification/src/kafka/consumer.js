import {Kafka} from 'kafkajs';
import prisma from '../db/prisma.js';
import 'dotenv/config';
import { title } from 'node:process';
import { type } from 'node:os';

const kafka = new Kafka({
    clientId:"Notification-service",
    brokers:process.env.KAFKA_BROKERS.split(","),
})

const consumer = kafka.consumer({
    groupId:"notification-group"
})

export const startNotificationConsumer = async() =>{
    await consumer.connect();

    await consumer.subscribe({topic:"user-activity"});
    await consumer.subscribe({topic:"user-events"})
    await consumer.subscribe({topic:"content-events"})

    await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const event = JSON.parse(message.value.toString());

      switch (event.type) {
        case "USER_SIGNUP":
          await prisma.notification.create({
            data: {
              userId: event.userId,
              title: "Welcome to LearnStream 🎉",
              message: "Thanks for joining! Start exploring courses now.",
              type: "SYSTEM",
            },
          });
          break;

        case "USER_LOGIN":
          await prisma.notification.create({
            data: {
              userId: event.userId,
              title: "New Login Detected",
              message: "You logged in successfully.",
              type: "SECURITY",
            },
          });
          break;
        case "COURSE_PROGRESS_UPDATED":
            if(event.percentage===100){
                await prisma.notification.create({
                data:{
                    userId:event.userId,
                    title:"COURSE COMPLETED",
                    message:"Congratulations on completing the course",
                    type:"COURSE",
                    sourceEventId: `${event.userId}_${event.courseId}_completed`
                }
            })
            }
            break;
        default:
          // Ignore other events
          break;
      }
    },
  });

  console.log("Notification Kafka consumer running");
}