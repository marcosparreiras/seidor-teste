import type { Ride } from "../entities/ride";

export interface rideRepository {
  findManyByVehicleOrDriverWithOpenRide(
    vehicleId: string,
    driverId: string
  ): Promise<Ride[]>;
  findById(id: string): Promise<Ride | null>;
  insert(ride: Ride): Promise<void>;
  update(ride: Ride): Promise<void>;
}
