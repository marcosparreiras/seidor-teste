import { InMemoryDriverRepository } from "../../adapters/in-memory-driver-repository";
import { InMemoryRideRepository } from "../../adapters/in-memory-ride-repository";
import { InMemoryVehicleRepository } from "../../adapters/in-memory-vehicle-repository";
import { DomainRegistry } from "../boundaries/domain-registry";
import { Driver } from "../entities/driver";
import { Ride } from "../entities/ride";
import { Vehicle } from "../entities/vehicle";
import { GetManyRidesEnrichedWithDriverAndVehicleUseCase } from "./get-many-rides-enriched-with-driver-and-vehicle-use-case";

describe("GetManyRidesEnrichedWithDriverAndVehicleUseCase", () => {
  let sut: GetManyRidesEnrichedWithDriverAndVehicleUseCase;
  let rideRespository: InMemoryRideRepository;
  let driverRespository: InMemoryDriverRepository;
  let vehicleRepository: InMemoryVehicleRepository;

  beforeEach(() => {
    sut = new GetManyRidesEnrichedWithDriverAndVehicleUseCase();
    rideRespository = new InMemoryRideRepository();
    driverRespository = new InMemoryDriverRepository();
    vehicleRepository = new InMemoryVehicleRepository();
    const registry = DomainRegistry.getInstance();
    registry.register("rideRepository", rideRespository);
    registry.register("driverRepository", driverRespository);
    registry.register("vehicleRepository", vehicleRepository);
  });

  it("Should be able to list rides with driver and vehicle data", async () => {
    const drivers = [{ name: "John Doe" }, { name: "Jammy Frank" }].map(
      (driverInput) => Driver.create(driverInput)
    );
    const vehicles = [
      {
        plate: "JKO4865",
        brand: "FORD",
        color: "black",
      },
      {
        plate: "HJU4562",
        brand: "BMW",
        color: "white",
      },
    ].map((vehicleInput) => Vehicle.create(vehicleInput));
    const rides = Array.from({ length: 2 }).map((_, index) =>
      Ride.create({
        driverId: drivers[index].getId(),
        vehicleId: vehicles[index].getId(),
        reason: "Attending a bussines meeting.",
      })
    );
    driverRespository.items.push(...drivers);
    vehicleRepository.items.push(...vehicles);
    rideRespository.items.push(...rides);
    const output = await sut.execute();
    expect(output.rides).toHaveLength(2);
    const firstRide = output.rides.find(
      (ride) => ride.rideId === rides[0].getId()
    );
    expect(firstRide).toEqual(
      expect.objectContaining({
        rideId: rides[0].getId(),
        startDate: rides[0].getStartDate(),
        endDate: rides[0].getEndDate(),
        reason: rides[0].getReason(),
        driver: expect.objectContaining({
          name: drivers[0].getName(),
          driverId: drivers[0].getId(),
        }),
        vehicle: expect.objectContaining({
          vehicleId: vehicles[0].getId(),
          color: vehicles[0].getColor(),
          brand: vehicles[0].getBrand(),
          plate: vehicles[0].getPlate(),
        }),
      })
    );
  });
});
