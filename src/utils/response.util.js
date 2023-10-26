class ResponseUtil {
  static OK = 200;
  static CREATED = 201;
  static ACCEPTED = 202;
  static NON_AUTHORITATIVE_INFORMATION = 203;
  static NO_CONTENT = 204;
  static RESET_CONTENT = 205;
  static PARTIAL_CONTENT = 206;
  static MULTI_STATUS = 207;
    
  static BAD_REQUEST = 400;
  static UNAUTHORIZED = 401;
  static PAYMENT_REQUIRED = 402;
  static FORBIDDEN = 403;
  static NOT_FOUND = 404;
  static METHOD_NOT_ALLOWED = 405;
    
  static INTERNAL_SERVER_ERROR = 500;
  static NOT_IMPLEMENTED = 501;
  static BAD_GATEWAY = 502;
  static SERVICE_UNAVAILABLE = 503;

  static sendSuccess(res, data, message) {
    return res.status(ResponseUtil.OK).json({
      success: true,
      data,
      message,
    });
  }

  static sendError(res, statusCode, error) {
    return res.status(statusCode).json({
      success: false,
      data: null,
      error,
    });
  }
}

module.exports = ResponseUtil;