const axios = require('axios');
const parse = require('csv-parse/lib/sync');

// Twilio Client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const client = require('twilio')(accountSid, authToken);
const Twilio = require(process.env.AWS ? '/opt/Twilio' : '../layer/Twilio');
const twilioClient = new Twilio(client, twilioNumber);

// save for reuse
let rawSevenDayAverageData;
let rawDailyPercentPositiveData;

exports.handler = async (event) => {
  try {
    console.log("Reading event from SQS ", JSON.stringify(event));
    if (!rawSevenDayAverageData) {
      rawSevenDayAverageData = await getAndParseCSV(
        'https://raw.githubusercontent.com/nychealth/coronavirus-data/master/latest/last7days-by-modzcta.csv'
      );
    }
    if (!rawDailyPercentPositiveData) {
      rawDailyPercentPositiveData = await getAndParseCSV(
        'https://raw.githubusercontent.com/nychealth/coronavirus-data/master/latest/pp-by-modzcta.csv'
      );
    }
    const records = JSON.parse(event.Records[0].body);
    await Promise.all(
      records.map((record) => {
        return formatAndSendCustomMessage(record.zipCode, record.phoneNumber, record.borough);
      })
    );
    console.log('Finished batch of SMS messages!');
  } catch (error) {
    console.log(error);
  }
};

const getAndParseCSV = async (url) => {
  const response = await axios.get(url);
  return parse(response.data, {
    columns: true,
    skip_empty_lines: true,
  });
};

const filterSevenDayAverageByZipCode = (data, zipCode) => {
  for (let i = 0; i < data.length; i++) {
    if (zipCode === data[i].modzcta) {
      return data[i];
    }
  }
};

const getDay = (data, num) => {
  return data[data.length - num];
};

const formatAndSendCustomMessage = async (zipCode, phoneNumber, borough) => {
  const zipCodeSevenDayAverageData = filterSevenDayAverageByZipCode(
    rawSevenDayAverageData,
    zipCode
  );
  const today = getDay(rawDailyPercentPositiveData, 1);
  const summary = `Coronavirus 7-day Rolling Average of Percent Positive Results as of ${zipCodeSevenDayAverageData.daterange} (most recently available data):
  - ${zipCode}: ${zipCodeSevenDayAverageData.percentpositivity_7day}%
  - ${borough}: ${today[borough]}%
  - Citywide: ${today.Citywide}%`;
  console.log("Sending message: ", summary, " to: ", phoneNumber);
  await twilioClient.sendSMS(phoneNumber, summary);
};
