import { InvalidNameException } from "../exceptions/invalid-name-exception";
import { Driver } from "./driver";

describe("Driver (Entity)", () => {
  it("Should be able to create a driver", () => {
    const input = { name: "John Doe" };
    const driver = Driver.create(input);
    expect(driver.getName()).toEqual(input.name);
    expect(driver.getId()).toEqual(expect.any(String));
  });

  it("Should not be able to create a driver with an invalid name", () => {
    const input = { name: "46$john" };
    expect(() => Driver.create(input)).toThrow(InvalidNameException);
  });
});
