import { inject } from "../boundaries/domain-registry";
import type { DriverRepository } from "../boundaries/driver-repository";
import type { rideRepository } from "../boundaries/ride-repository";
import type { VehicleRepository } from "../boundaries/vehicle-repository";
import { Ride } from "../entities/ride";
import { DriverNotFoundExcepiton } from "../exceptions/driver-not-found-exception";
import { UnavaillableRideException } from "../exceptions/unavaillable-ride-exception";
import { VehicleNotFoundException } from "../exceptions/vehicle-not-found-exception";

type Input = {
  driverId: string;
  vehicleId: string;
  reason: string;
};

type Output = {
  rideId: string;
};

export class StartRideUseCase {
  @inject("rideRepository")
  private rideRepository!: rideRepository;

  @inject("driverRepository")
  private driverRepository!: DriverRepository;

  @inject("vehicleRepository")
  private vehicleRepository!: VehicleRepository;

  public constructor() {}

  public async execute(input: Input): Promise<Output> {
    const driverExists = await this.driverRepository.findById(input.driverId);
    if (!driverExists) {
      throw new DriverNotFoundExcepiton(input.driverId);
    }
    const vehicleExists = await this.vehicleRepository.findById(
      input.vehicleId
    );
    if (!vehicleExists) {
      throw new VehicleNotFoundException(input.vehicleId);
    }
    const ridesOpenWithVehicleOrDriver =
      await this.rideRepository.findByVehicleOrDriverWithOpenRide(
        input.vehicleId,
        input.driverId
      );
    if (ridesOpenWithVehicleOrDriver.length > 0) {
      throw new UnavaillableRideException();
    }
    const ride = Ride.create({
      driverId: input.driverId,
      vehicleId: input.vehicleId,
      reason: input.reason,
    });
    await this.rideRepository.insert(ride);
    return { rideId: ride.getId() };
  }
}
