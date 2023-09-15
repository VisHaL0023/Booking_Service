const amqplib = require("amqplib");

const { Notification_Queue } = require('./server-config');

let channel, connection;

async function connectQueue() {
    try {
        connection = await amqplib.connect("amqp://localhost");
        channel = await connection.createChannel();

        await channel.assertQueue(Notification_Queue);
    } catch(error) {
        console.log(error);
    }
}

async function sendData(data) {
    try {
        await channel.sendToQueue(Notification_Queue, Buffer.from(JSON.stringify(data)));

    } catch(error) {
        console.log("queue error", error);
    }
}

module.exports = {
    connectQueue,
    sendData
}