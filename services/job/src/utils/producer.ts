import { Kafka,Producer,Admin } from "kafkajs";
import dotenv from 'dotenv';

dotenv.config();

let producer:Producer
let admin:Admin

export const connectKafka=async()=>{
    try {
        const kafka=new Kafka({
            clientId:"auth-service",
            brokers:[process.env.Kafka_broker || "localhost:9092"]
        });
        admin=kafka.admin();
        await admin.connect();

        const topics=await admin.listTopics();
        if(!topics.includes("send-mail")){
            await admin.createTopics({
                topics:[
                    {
                        topic:"send-mail",
                        numPartitions:1,
                        replicationFactor:1
                    }
                ]
            });
            console.log("✅ Topic 'send-mail' created")
        }

        await admin.disconnect();

        producer=kafka.producer();

        await producer.connect();

        console.log("✅ Connected to kafka producer")

    } catch (error) {
        console.log("Failed to connect to kafka");
    }
}

export const pubishToTopic=async(topic:string,message:Object)=>{
    if(!producer){
        console.log("Kafka producer is not initialized");
        return;
    }
    try {
        await producer.send({
            topic:topic,
            messages:[
                {
                    value:JSON.stringify(message)
                }
            ]
        })
    } catch (error) {
        console.log("Failed to public message to kafka",error);
    }
}

export const disconnectKafka=async()=>{
    if(producer){
        producer.disconnect();
    }
}