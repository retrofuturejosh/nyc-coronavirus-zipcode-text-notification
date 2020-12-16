class Dynamo {
  constructor(ddb, tableName = "corona-notification") {
    this.ddb = ddb;
    this.tableName = tableName;
  }
  async addNumberToTable(requestBody) {
    const params = {
      TableName: this.tableName,
      Item: {
        phoneNumber: { S: requestBody.phoneNumber },
        borough: { S: requestBody.borough },
        zipCode: { S: requestBody.zipCode },
      },
    };
    await this.ddb.putItem(params).promise();
  }

  async getNumberFromTable(phoneNumber) {
    const params = {
      Key: {
        phoneNumber: {
          S: phoneNumber,
        },
      },
      TableName: this.tableName,
    };
    return await this.ddb.getItem(params).promise();
  }


async deleteNumberFromTable(phoneNumber) {
  const params = {
    Key: {
      phoneNumber: {
        S: phoneNumber,
      },
    },
    TableName: this.tableName,
  };
  await this.ddb.deleteItem(params).promise();
}
}

module.exports = Dynamo;
