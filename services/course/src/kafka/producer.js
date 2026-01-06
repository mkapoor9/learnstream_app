import {Kafka} from 'kafkajs';
import 'dotenv/config';

const kafka = new Kafka({
    clientId: "course-service",
    brokers: process.env.KAFKA_BROKERS.split(","),
})

export const producer =  kafka.producer();

export const connectCourseProducer = async() =>{
    await producer.connect();
}

export const emitCourseEvent = async (event)=>{
    await producer.send({
        topic:'course-events',
        messages: [{value:JSON.stringify(event)}]
    })
}