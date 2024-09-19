import { InMemoryDriverRepository } from "../../adapters/in-memory-driver-repository";
import { InMemoryRideRepository } from "../../adapters/in-memory-ride-repository";
import { InMemoryVehicleRepository } from "../../adapters/in-memory-vehicle-repository";
import { DomainRegistry } from "../boundaries/domain-registry";
import { Driver } from "../entities/driver";
import { Ride } from "../entities/ride";
import { Vehicle } from "../entities/vehicle";
import { UnavaillableRideException } from "../exceptions/unavaillable-ride-exception";
import { StartRideUseCase } from "./start-ride-use-case";

describe("StartRideUseCase", () => {
  let sut: StartRideUseCase;
  let rideRepository: InMemoryRideRepository;
  let driverRepository: InMemoryDriverRepository;
  let vehicleRepository: InMemoryVehicleRepository;

  beforeEach(() => {
    sut = new StartRideUseCase();
    rideRepository = new InMemoryRideRepository();
    driverRepository = new InMemoryDriverRepository();
    vehicleRepository = new InMemoryVehicleRepository();
    const registry = DomainRegistry.getInstance();
    registry.register("rideRepository", rideRepository);
    registry.register("driverRepository", driverRepository);
    registry.register("vehicleRepository", vehicleRepository);
  });

  it("Should be able to register the start of a ride", async () => {
    const driver = Driver.create({ name: "John Doe" });
    const vehicle = Vehicle.create({
      plate: "PJS4568",
      brand: "BMW",
      color: "black",
    });
    driverRepository.items.push(driver);
    vehicleRepository.items.push(vehicle);
    const input = {
      driverId: driver.getId(),
      vehicleId: vehicle.getId(),
      reason: "Attending a business meeting with a client.",
    };
    const output = await sut.execute(input);
    expect(output.rideId).toEqual(expect.any(String));
    expect(rideRepository.items).toHaveLength(1);
    const rideOnRepository = rideRepository.items.find(
      (item) => item.getId() === output.rideId
    );
    expect(rideOnRepository?.getDriverId()).toEqual(input.driverId);
    expect(rideOnRepository?.getVehicleId()).toEqual(input.vehicleId);
    expect(rideOnRepository?.getReason()).toEqual(input.reason);
    expect(rideOnRepository?.getStartDate()).toEqual(expect.any(Date));
    expect(rideOnRepository?.getEndDate()).toBeNull();
  });

  it("Should not be able to register two open rides for the same vehicle", async () => {
    const drivers = Array.from({ length: 2 }).map((_) =>
      Driver.create({ name: "John Doe" })
    );
    const vehicle = Vehicle.create({
      plate: "PJS4568",
      brand: "BMW",
      color: "black",
    });
    const ride = Ride.create({
      driverId: drivers[0].getId(),
      vehicleId: vehicle.getId(),
      reason: "Attending a business meeting with a client.",
    });
    driverRepository.items.push(...drivers);
    vehicleRepository.items.push(vehicle);
    rideRepository.items.push(ride);
    const input = {
      driverId: drivers[1].getId(),
      vehicleId: vehicle.getId(),
      reason: "Participating in a charity event.",
    };
    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      UnavaillableRideException
    );
  });

  it("Should not be able to register two open rides for the same driver", async () => {
    const driver = Driver.create({ name: "John Doe" });
    const vehicles = Array.from({ length: 2 }).map((_) =>
      Vehicle.create({
        plate: "PJS4568",
        brand: "BMW",
        color: "black",
      })
    );
    const ride = Ride.create({
      driverId: driver.getId(),
      vehicleId: vehicles[0].getId(),
      reason: "Attending a business meeting with a client.",
    });
    driverRepository.items.push(driver);
    vehicleRepository.items.push(...vehicles);
    rideRepository.items.push(ride);
    const input = {
      driverId: driver.getId(),
      vehicleId: vehicles[1].getId(),
      reason: "Participating in a charity event.",
    };
    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      UnavaillableRideException
    );
  });
});
