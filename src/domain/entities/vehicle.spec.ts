import { InvalidPlateException } from "../exceptions/invalid-plate-exception";
import { Vehicle } from "./vehicle";

describe("Vehicle (Entity)", () => {
  it("Should be able to create a vehicle", () => {
    const input = {
      brand: "BMW",
      plate: "PHJ5632",
      color: "white",
    };
    const vehicle = Vehicle.create(input);
    expect(vehicle.getId()).toEqual(expect.any(String));
    expect(vehicle.getBrand()).toEqual(input.brand);
    expect(vehicle.getPlate()).toEqual(input.plate);
    expect(vehicle.getColor()).toEqual(input.color);
  });

  it("Should not be able to create a vehicle with an invalid plate", () => {
    const input = {
      brand: "BMW",
      plate: "PH5632A",
      color: "white",
    };
    expect(() => Vehicle.create(input)).toThrow(InvalidPlateException);
  });
});
