import type { Ride } from "../entities/ride";

export interface rideRepository {
  findByVehicleOrDriverWithOpenRide(
    vehicleId: string,
    driverId: string
  ): Promise<Ride[]>;
  insert(ride: Ride): Promise<void>;
}
