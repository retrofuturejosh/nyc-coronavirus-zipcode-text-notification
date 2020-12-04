const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSMS = (number, message) => {
  client.messages
  .create({
     body: message,
     from: '+12512554814',
     to: number
   })
  .then(message => console.log(message.sid));
}

module.exports = sendSMS;

