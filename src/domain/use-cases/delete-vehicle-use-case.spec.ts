import { InMemoryVehicleRepository } from "../../adapters/in-memory-vehicle-repository";
import { DomainRegistry } from "../boundaries/domain-registry";
import { Vehicle } from "../entities/vehicle";
import { VehicleNotFoundException } from "../exceptions/vehicle-not-found-exception";
import { DeleteVehicleUseCase } from "./delete-vehicle-use-case";

describe("DeleteVehicleUseCase", () => {
  let sut: DeleteVehicleUseCase;
  let vehicleRepository: InMemoryVehicleRepository;

  beforeEach(() => {
    sut = new DeleteVehicleUseCase();
    vehicleRepository = new InMemoryVehicleRepository();
    const registry = DomainRegistry.getInstance();
    registry.register("vehicleRepository", vehicleRepository);
  });

  it("Should be able to delete a vehicle", async () => {
    const vehicle = Vehicle.create({
      brand: "BMW",
      plate: "PGH4564",
      color: "white",
    });
    vehicleRepository.items.push(vehicle);
    const input = {
      vehicleId: vehicle.getId(),
    };
    await sut.execute(input);
    expect(vehicleRepository.items).toHaveLength(0);
  });

  it("Should not be able to delete an unexistent vehicle", async () => {
    const input = {
      vehicleId: "UNEXISTENT-VEHICLE-ID",
    };
    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      VehicleNotFoundException
    );
  });
});
