import { InMemoryVehicleRepository } from "../../adapters/in-memory-vehicle-repository";
import { DomainRegistry } from "../boundaries/domain-registry";
import { Vehicle } from "../entities/vehicle";
import { VehicleAlreadyExistsException } from "../exceptions/vehicle-already-exists-exception";
import { RegisterVehicleUseCase } from "./register-vehicle-use-case";

describe("RegisterVehicleUseCase", () => {
  let sut: RegisterVehicleUseCase;
  let vehicleRepository: InMemoryVehicleRepository;

  beforeEach(() => {
    sut = new RegisterVehicleUseCase();
    vehicleRepository = new InMemoryVehicleRepository();
    const registry = DomainRegistry.getInstance();
    registry.register("vehicleRepository", vehicleRepository);
  });

  it("Should be able to register a new vehicle", async () => {
    const input = {
      plate: "PGW5610",
      color: "black",
      brand: "BMW",
    };
    const output = await sut.execute(input);
    expect(output.vehicleId).toEqual(expect.any(String));
    expect(vehicleRepository.items).toHaveLength(1);
    const vehicleOnRepository = vehicleRepository.items.find(
      (item) => item.getId() === output.vehicleId
    );
    expect(vehicleOnRepository?.getPlate()).toEqual(input.plate);
    expect(vehicleOnRepository?.getColor()).toEqual(input.color);
    expect(vehicleOnRepository?.getBrand()).toEqual(input.brand);
  });

  it("Should not be able to register two vehicles with the same plate", async () => {
    const plate = "PGW5610";
    const vehicle = Vehicle.create({ plate, color: "white", brand: "BWM" });
    vehicleRepository.items.push(vehicle);
    const input = {
      plate,
      color: "black",
      brand: "FORD",
    };
    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      VehicleAlreadyExistsException
    );
  });
});
