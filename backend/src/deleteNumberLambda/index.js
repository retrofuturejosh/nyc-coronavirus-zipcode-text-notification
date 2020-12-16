// Dynamo Client
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const Dynamo = require(process.env.AWS ? '/opt/Dynamo' : '../layer/Dynamo');
const dynamoClient = new Dynamo(ddb);

//Helpers
const { phoneNumberValidator } = require(process.env.AWS
  ? '/opt/validator'
  : '../layer/validator');
const {
  SuccessResponse,
  ServerErrorResponse,
  ClientErrorResponse,
} = require(process.env.AWS ? '/opt/APIResponse' : '../layer/APIResponse');

exports.handler = async (event) => {
  console.log(JSON.stringify(event));
  const requestBody = JSON.parse(event.body);
  try {
    const { phoneNumber } = requestBody;
    // validate phone number format
    const isValid = phoneNumberValidator(phoneNumber);
    if (!isValid) {
      return new ClientErrorResponse(
        requestBody,
        'Invalid or malformed request body'
      ).getResponse();
    }

    //validate that phone number is in DB
    let existingNumber = await dynamoClient.getNumberFromTable(phoneNumber);
    if (!existingNumber.Item) {
      return new ClientErrorResponse(
        requestBody,
        'Phone number is not subscribed'
      ).getResponse();
    }

    await dynamoClient.deleteNumberFromTable(phoneNumber);
    console.log('Deleted number: ', phoneNumber);
    return new SuccessResponse(requestBody).getResponse();
  } catch (err) {
    console.log(err);
    return new ServerErrorResponse(requestBody, err).getResponse();
  }
};
