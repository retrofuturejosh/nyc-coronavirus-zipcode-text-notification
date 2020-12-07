require('dotenv').config();
const axios = require('axios');
const parse = require('csv-parse/lib/sync');
const sendMessage = require('./text.js');

exports.handler = async (event) => {
  try {
    await run('10019', '+14054302414');
    console.log('Success!');
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

const run = async (zipCode, phoneNumber) => {
  const rawSevenDayAverageData = await getAndParseCSV(
    'https://raw.githubusercontent.com/nychealth/coronavirus-data/master/latest/last7days-by-modzcta.csv'
  );
  const rawDailyPercentPositiveData = await getAndParseCSV(
    'https://raw.githubusercontent.com/nychealth/coronavirus-data/master/latest/pp-by-modzcta.csv'
  );
  const zipCodeSevenDayAverageData = filterSevenDayAverageByZipCode(
    rawSevenDayAverageData,
    zipCode
  );
  const previousDay = getDay(rawDailyPercentPositiveData, 2);
  const today = getDay(rawDailyPercentPositiveData, 1);
  const summary = `Coronavirus 7-day Rolling Average Update:
  - Today's average for ${zipCode} is ${
    zipCodeSevenDayAverageData.percentpositivity_7day
  }
  - The previous average for ${zipCode} was ${previousDay[`   ${zipCode}`]}
  - Today's average for Manhattan is ${today.Manhattan}
  - Today's average citywide is ${today.Citywide}`;
  await sendMessage(phoneNumber, summary);
};
