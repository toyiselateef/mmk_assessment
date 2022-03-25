import "jest";
import { Response, Request, NextFunction } from "express";
import smsController from "../../src/controllers/sms.controller";
import { string } from "joi";

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;
let nextFunction: NextFunction = jest.fn();
describe("business logic", () => {
  beforeEach(() => {
    mockRequest = {
      body: {
        from: "string",
        to: "string",
        text: "",
      },
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
    };
  });

  it("return missing error", () => {
    let mockRequest: Partial<Request> = {
      body: {},
    };
    const result = smsController.inbound(mockRequest, mockResponse);
    expect(result).toBe({ message: "", error: "missing" });
  });
  it("return inbound sms ok", () => {});
  it("outbound returns sms ok", () => {});
  it("return missing error", () => {});
});

// describe("handle app exceptions", () => {
//   it("Bad-Data should return statusCode 400", () => {
//     const result = handleAppExceptions({
//       message: "...",
//       name: "BadDataException",
//     });

//     expect(result.statusCode).toBe(400);
//   });}
