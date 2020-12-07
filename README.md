# NYC Coronavirus Text Notification

### Purpose
The goal of this project is to send a daily text message with information regarding the 7 day rolling average percent positive cases of Coronavirus cases for a given NYC zip code.

### Tech Stack:
  - Node.js
  - AWS
    - SAM
    - Lambda function
    - Amazon EventBridge
  - Twilio

## Deploying

#### Prerequisites
  - AWS account
  - Twilio account (API token and phone number)
  - AWS S3 Bucket

#### Steps
1. Run `npm install` in `/src` directory
2. Add relevant info to `/src/config.js`
3. Package the application by running command (from the root directory): `BUCKET=<YOUR_BUCKET_NAME_HERE> npm run package`
4. Deploy the application by running command: `npm run deploy`
5. Navigate to Lambda function in AWS console and add the following environment variables:
    - TWILIO_ACCOUNT_SID (found in Twilio developer console)
    - TWILIO_AUTH_TOKEN (found in Twilio developer console)

You can test that everything is properly set up by triggering a test event for the Lambda function in the AWS console.



