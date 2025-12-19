import dotenv from 'dotenv';
dotenv.config();

import { Kafka } from "kafkajs";

import activity from "../db/models/activity.js";

console.log("KAFKA_BROKERS =", process.env.KAFKA_BROKERS);

const kafka = new Kafka({
    clientId:"activity-service",
    brokers: process.env.KAFKA_BROKERS.split(","),
})



export const consumer = kafka.consumer({groupId:"activity-group"});

export const startConsumer = async() =>{
    await consumer.connect();

    await consumer.subscribe({topic:"user-activity",fromBeginning:true})

    await consumer.run({
        eachMessage:async({topic,partition,message})=>{
            const event = JSON.parse(message.value.toString());

            await activity.create({
                userId:event.userId,
                type:event.type,
                metadata:event.metadata,
                timestamp:event.timestamp
            })

            console.log("Activity Logged: ",event);

        }
    })
}