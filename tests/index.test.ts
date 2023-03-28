import { expect } from "chai";
import { backendFunction } from "../src/index";
import { Request, Response } from "express";

interface testObject {
  args: Partial<Request>;
  expected: any; // We use any here to allow any kind of test response from the function to be passed in.
}

describe("when a message is provided", () => {
  const tests: testObject[] = [
    { args: { body: { message: "Hi" } }, expected: { message: "Hi" } },
    { args: { body: { message: "12" } }, expected: { message: "12" } },
  ];

  tests.forEach(({ args, expected }) => {
    it(`returns ${args.body.message} when request body is ${JSON.stringify(args.body)}`, () => {
    });
  });
});
