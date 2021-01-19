import { response } from "express";
import AppError from "../utils/error";

// augment the `express-serve-static-core` module
declare module "express-serve-static-core" {
  // first, declare that we are adding a method to `Response` (the interface)
  export interface Response {
    respondWithData(data: any): this;
    success(data?: any): this;
    error(error: any): this;
  }

  export interface Request {
      user: any;
  }
}

response.error = function(error) {
  console.log(error);
  if ( error instanceof AppError ){
    return this.json({
      status: error.status,
      message: error.message
    });
  }
  return this.status(500).send(error);
};

response.success = function(data) {
    data = data? data : "Success";
    return this.json({
        status: 200,
        data,
    });
};