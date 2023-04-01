import { connect } from "amqplib/callback_api";

export const receiveMsgFromQueue = ({
  msg,
  queueName,
  amqpHost,
}: {
  msg: any;
  queueName: string;
  amqpHost: string;
}) => {
  connect(amqpHost, (err: Error, connection) => {
    if (err) {
      console.log(err);
      throw err;
    }

    connection.createChannel((err: Error, channel) => {
      if (err) {
        console.log(err);
        throw err;
      }

      channel.assertQueue(queueName, {
        durable: false,
      });

      channel.consume(
        queueName,
        async () => {
          if (msg) {
            console.debug(
              `Received message from queue: ${msg.content.toString()}`
            );
            const data: any = JSON.parse(msg.content.toString());

            console.log(data);
          }
        },
        {
          noAck: true,
        }
      );
    });
  });
};

export const sendDataToQueue = ({
  msg,
  queueName,
  amqpHost,
}: {
  msg: any;
  queueName: string;
  amqpHost: string;
}) => {
  connect(amqpHost, (err: Error, connection) => {
    if (err) {
      console.log(err);
      throw err;
    }

    connection.createChannel((err: Error, channel) => {
      if (err) {
        console.log(err);
        throw err;
      }

      channel.assertQueue(queueName, {
        durable: false,
      });

      console.debug(
        `Sending message to queue: ${JSON.stringify({ data: msg })}`
      );

      channel.sendToQueue(
        queueName,
        Buffer.from(JSON.stringify({ data: msg }))
      );
    });
  });
};
