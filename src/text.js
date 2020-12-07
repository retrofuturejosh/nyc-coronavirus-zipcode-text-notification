const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSMS = async (number, message) => {
  try {
    const result = await client.messages.create({
      body: message,
      from: '+12512554814',
      to: number,
    });
    console.log(result.sid);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendSMS;

