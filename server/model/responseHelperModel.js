export class ResponseHelper {
    constructor() {
    }
    buildSuccessResponse(data, message , status) {
      return responseHandler.successHandler(data, message , status)
    }
    buildFailureResponse(errorResponse) {
      return responseHandler.failureHandler(errorResponse)
    }
  }