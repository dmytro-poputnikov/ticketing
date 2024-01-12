import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  serializeErrors() {
    return this.errors.map((error) => {
      if (error.type === "field") {
        return { message: error.msg, field: error.path };
      }
      return { message: error.msg };
    });
  }

  constructor(public errors: ValidationError[]) {
    super(JSON.stringify(errors));

    //Only because we are extending a build in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
