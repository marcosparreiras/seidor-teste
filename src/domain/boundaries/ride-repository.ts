import type { Ride } from "../entities/ride";

export interface RideRepository {
  findMany(): Promise<Ride[]>;
  findManyByVehicleOrDriverWithOpenRide(
    vehicleId: string,
    driverId: string
  ): Promise<Ride[]>;
  findById(id: string): Promise<Ride | null>;
  insert(ride: Ride): Promise<void>;
  update(ride: Ride): Promise<void>;
}
