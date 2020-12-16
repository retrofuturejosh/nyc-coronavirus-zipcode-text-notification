class APIResponse {
  constructor(statusCode, status, requestBody, errorMessage) {
    this.statusCode = statusCode;
    this.status = status;
    this.requestBody = requestBody;
    this.errorMessage = errorMessage;
  }
  getResponse() {
    const body = {
      status: this.status,
      ...this.requestBody,
    }
    if (this.errorMessage) {
      body.errorMessage = this.errorMessage
    }
    return {
      statusCode: this.statusCode,
      body: JSON.stringify(body)
    }
  }
}

class SuccessResponse extends APIResponse {
  constructor(requestBody) {
    super(200, 'Success', requestBody)
  }
}

class ClientErrorResponse extends APIResponse {
  constructor(requestBody, errorMessage) {
    super(400, 'Failure', requestBody, errorMessage)
  }
}

class ServerErrorResponse extends APIResponse {
  constructor(requestBody, errorMessage) {
    super(500, 'Failure', requestBody, errorMessage)
  }
}

module.exports = {
  SuccessResponse,
  ServerErrorResponse,
  ClientErrorResponse
};
