import { InvalidPlateException } from "../../exceptions/invalid-plate-exception";
import { Plate } from "./plate";

describe("Plate (Value-Object)", () => {
  it.each(["DAP5678", "WPH1328", "HWE3248", "IDW1865", "PGD1354"])(
    "Should be able to validate plates with correct format",
    (value) => {
      const plate = new Plate(value);
      expect(plate.toString()).toEqual(value);
    }
  );

  it.each(["dsd4565", "s456we", "placa", "4564PHJ", "JD45D44"])(
    "Should not be able to validate plates with wrong formats",
    (value) => {
      expect(() => new Plate(value)).toThrow(InvalidPlateException);
    }
  );
});
