class Twilio {
  constructor(client, twilioNumber) {
    this.client = client;
    this.twilioNumber = twilioNumber;
  }

  async sendSMS(number, message) {
    try {
      const result = await this.client.messages.create({
        body: message,
        from: this.twilioNumber,
        to: number,
      });
      console.log(result.sid);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Twilio;
