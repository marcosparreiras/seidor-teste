import { InvalidNameException } from "../../exceptions/invalid-name-exception";
import { Name } from "./name";

describe("Name (Value-Object)", () => {
  it.each([
    "Ana",
    "José",
    "Maria Clara",
    "Luís Antônio",
    "Érica",
    "João Paulo",
    "Bruna Silva",
    "John Albert Doe",
  ])("Should be able to validate names with correct format", (value) => {
    const plate = new Name(value);
    expect(plate.toString()).toEqual(value);
  });

  it.each([
    "Jo",
    "Ana@",
    "123Maria",
    "Paulo-",
    " Maria",
    "Carlos ",
    "Ana&Clara",
    "Bruna  Silva",
  ])("Should not be able to validate names with wrong formats", (value) => {
    expect(() => new Name(value)).toThrow(InvalidNameException);
  });
});
