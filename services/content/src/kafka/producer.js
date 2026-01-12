import {Kafka} from 'kafkajs'
import "dotenv/config"

const kafka = new Kafka({
    clientId:"content-service",
    brokers: process.env.KAFKA_BROKERS.split(","),
});

export const producer = kafka.producer();

export const connectContentProducer = async() => {
    await producer.connect();
}

export const emitContentEvent = async(event)=>{
    await producer.send({
        topic:"content-events",
        messages:[{value:JSON.stringif(event)}]
    })
}