// Dynamo Client
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const Dynamo = require(process.env.AWS ? '/opt/Dynamo' : '../layer/Dynamo');
const dynamoClient = new Dynamo(ddb);

// Twilio Client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const client = require('twilio')(accountSid, authToken);
const Twilio = require(process.env.AWS ? '/opt/Twilio' : '../layer/Twilio');
const twilioClient = new Twilio(client, twilioNumber);

// Helpers
const { addNumberRequestValidator } = require(process.env.AWS
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
    // validate request
    const isValidRequestBody = addNumberRequestValidator(requestBody);
    if (!isValidRequestBody) {
      return new ClientErrorResponse(
        requestBody,
        'Invalid or malformed request body'
      ).getResponse();
    }

    // build initial text message
    let messageContent = `You have successfully subscribed to daily notifications regarding coronavirus 7 day rolling average percent of positive cases for zip code ${requestBody.zipCode}`;

    // check if number or number/zip code already exist
    const existingPhoneNumber = await dynamoClient.getNumberFromTable(
      requestBody.phoneNumber
    );
    if (existingPhoneNumber.Item) {
      if (existingPhoneNumber.Item.zipCode.S !== requestBody.zipCode) {
        // change message if updating zip code vs. adding new entry
        messageContent = `You have successfully updated subscription for daily notifications regarding coronavirus 7 day rolling average percent of positive cases to zip code ${requestBody.zipCode}`;
      } else {
        // if phone number/zip code is already in DB, send 400
        return new ClientErrorResponse(
          requestBody,
          'Phone number is already registered for zip code'
        ).getResponse();
      }
    }

    await dynamoClient.addNumberToTable(requestBody);
    await twilioClient.sendSMS(requestBody.phoneNumber, messageContent);
    console.log(
      'Added phone number : ',
      requestBody.phoneNumber,
      'with zip code: ',
      requestBody.zipCode
    );
    return new SuccessResponse(requestBody).getResponse();
  } catch (err) {
    console.log(err);
    return new ServerErrorResponse(requestBody, err);
  }
};
