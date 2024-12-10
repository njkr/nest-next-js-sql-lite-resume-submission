import { HttpStatus } from '@nestjs/common';

interface ResponseData {
  data?: any;
  error?: any;
  message?: string;
  statusCode?: number;
}

export function responseHandler({
  data = null,
  error = null,
  message = 'Request successful',
  statusCode = HttpStatus.OK,
}: ResponseData) {

  if (error) {
    return {
      statusCode: statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      message: message || 'Something went wrong',
      error: error,
      stack: process.env.NODE_ENV === 'production' ? null : error.stack,
    };
  }

  return {
    statusCode: statusCode || HttpStatus.OK,
    message,
    data,
  };
}
