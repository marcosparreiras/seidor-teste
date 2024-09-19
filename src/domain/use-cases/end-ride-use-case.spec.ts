import { InMemoryRideRepository } from "../../adapters/in-memory-ride-repository";
import { DomainRegistry } from "../boundaries/domain-registry";
import { Ride } from "../entities/ride";
import { RideNotFoundException } from "../exceptions/ride-not-found-exception";
import { EndRideUseCase } from "./end-ride-use-case";

describe("EndRideUseCase", () => {
  let sut: EndRideUseCase;
  let rideRepository: InMemoryRideRepository;

  beforeEach(() => {
    sut = new EndRideUseCase();
    rideRepository = new InMemoryRideRepository();
    const registry = DomainRegistry.getInstance();
    registry.register("rideRepository", rideRepository);
  });

  it("Should be able to end a ride", async () => {
    const ride = Ride.create({
      driverId: "SOME-DRIVER-ID",
      vehicleId: "SOME-VEHILCE-ID",
      reason: "Attending a bussines meeting.",
    });
    rideRepository.items.push(ride);
    const input = {
      rideId: ride.getId(),
    };
    await sut.execute(input);
    expect(rideRepository.items).toHaveLength(1);
    expect(ride.getEndDate()).toEqual(expect.any(Date));
  });

  it("Should not be able to end an unexistent ride", async () => {
    const input = {
      rideId: "SOME-UNEXISTENT-RIDE-ID",
    };
    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      RideNotFoundException
    );
  });
});
