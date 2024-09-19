import { InMemoryVehicleRepository } from "../../adapters/in-memory-vehicle-repository";
import { DomainRegistry } from "../boundaries/domain-registry";
import { Vehicle } from "../entities/vehicle";
import { VehicleNotFoundException } from "../exceptions/vehicle-not-found-exception";
import { UpdateVehicleUseCase } from "./update-vehicle-use-case";

describe("UpdateVehicleUseCase", () => {
  let sut: UpdateVehicleUseCase;
  let vehicleRepository: InMemoryVehicleRepository;

  beforeEach(() => {
    sut = new UpdateVehicleUseCase();
    vehicleRepository = new InMemoryVehicleRepository();
    const registry = DomainRegistry.getInstance();
    registry.register("vehicleRepository", vehicleRepository);
  });

  it("Should be able to update a vehicle data", async () => {
    const vehicle = Vehicle.create({
      brand: "BMW",
      color: "WHITE",
      plate: "PGH4562",
    });
    vehicleRepository.items.push(vehicle);
    const input = {
      vehicleId: vehicle.getId(),
      color: "black",
    };
    await sut.execute(input);
    expect(vehicleRepository.items).toHaveLength(1);
    expect(vehicle.getColor()).toEqual(input.color);
  });

  it("Should not be able to update an unexistent vehicle", async () => {
    const input = {
      vehicleId: "Some-fake-vehicle-id",
      color: "black",
    };
    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      VehicleNotFoundException
    );
  });
});
