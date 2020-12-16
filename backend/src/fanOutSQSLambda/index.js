const AWS = require('aws-sdk');
const uuid = require('uuid').v4;

AWS.config.update({ region: 'us-east-1' });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

exports.handler = async (event) => {
  try {
    console.log('Triggering daily batch of coronavirus notifications');
    const scanResults = await scanTable('corona-notification');
    await fanOutMessages(scanResults);
    console.log('Successfully fanned out to all dynamoDB entries to SQS');
  } catch (err) {
    console.log(err);
  }
};

async function scanTable(tableName) {
  const params = {
    TableName: tableName,
    Limit: 900,
  };

  let scanResults = [];
  do {
    const items = await docClient.scan(params).promise();
    scanResults.push(items.Items);
    params.ExclusiveStartKey = items.LastEvaluatedKey;
  } while (typeof params.ExclusiveStartKey !== 'undefined');
  return scanResults;
}

async function fanOutMessages(dynamoDBEntries) {
  const params = {
    QueueName: 'corona-queue.fifo',
  };
  const { QueueUrl } = await sqs.getQueueUrl(params).promise();
  await Promise.all(
    dynamoDBEntries.map((entry) => {
      return sendSQSMessage(entry, QueueUrl);
    })
  );
}

async function sendSQSMessage(dynamoDBEntry, queueUrl) {
  let params = {
    MessageBody: JSON.stringify(dynamoDBEntry),
    MessageGroupId: 'corona-notification',
    MessageDeduplicationId: uuid(),
    QueueUrl: queueUrl,
  };
  await sqs.sendMessage(params).promise();
}
