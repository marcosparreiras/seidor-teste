import { InMemoryVehicleRepository } from "../../adapters/in-memory-vehicle-repository";
import { DomainRegistry } from "../boundaries/domain-registry";
import { Vehicle } from "../entities/vehicle";
import { VehicleNotFoundException } from "../exceptions/vehicle-not-found-exception";
import { GetVehicleUseCase } from "./get-vehicle-use-case";

describe("GetVehicleUseCase", () => {
  let sut: GetVehicleUseCase;
  let vehicleRepository: InMemoryVehicleRepository;

  beforeEach(() => {
    sut = new GetVehicleUseCase();
    vehicleRepository = new InMemoryVehicleRepository();
    const registry = DomainRegistry.getInstance();
    registry.register("vehicleRepository", vehicleRepository);
  });

  it("Should be able to get a vehible by it's id", async () => {
    const vehicle = Vehicle.create({
      brand: "BMW",
      color: "black",
      plate: "KOP4562",
    });
    vehicleRepository.items.push(vehicle);
    const input = {
      vehicleId: vehicle.getId(),
    };
    const output = await sut.execute(input);
    expect(output.vehicleId).toEqual(vehicle.getId());
    expect(output.color).toEqual(vehicle.getColor());
    expect(output.brand).toEqual(vehicle.getBrand());
    expect(output.plate).toEqual(vehicle.getPlate());
  });

  it("Should not be able to get an unexistent vehicle", async () => {
    const input = {
      vehicleId: "UNEXISTEN-VEHICLE-ID",
    };
    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      VehicleNotFoundException
    );
  });
});
