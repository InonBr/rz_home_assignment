import { connect } from "amqplib/callback_api";
import { DomainObjectInterface, IResolvedValues } from "./interfaces";
import { WhoisSearchResult } from "whoiser";

export const receiveMsgFromQueue = ({
  queueName,
  amqpHost,
  analysisFunc,
}: {
  queueName: string;
  amqpHost: string;
  analysisFunc: (domainArr: Array<DomainObjectInterface>) => Promise<
    {
      sslData?: IResolvedValues;
      whoisData?: WhoisSearchResult;
      virusTotalData?: WhoisSearchResult;
      status: string;
      _id: string;
      domain: string;
      addedDate: string;
    }[]
  >;
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
        async (msg) => {
          if (msg) {
            console.debug(
              `Received message from queue: ${msg.content.toString()}`
            );
            const data: { data: Array<DomainObjectInterface> } = JSON.parse(
              msg.content.toString()
            );

            await analysisFunc(data.data);

            // Promise.allSettled;
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
