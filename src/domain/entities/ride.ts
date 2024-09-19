import { UUID } from "./value-objects/uuid";

interface CreateRideDTO {
  driverId: string;
  vehicleId: string;
  reason: string;
}

export class Ride {
  private id: UUID;
  private driverId: UUID;
  private vehicleId: UUID;
  private reason: string;
  private startDate: Date;
  private endDate: Date | null;

  public getId(): string {
    return this.id.toString();
  }

  public getDriverId(): string {
    return this.driverId.toString();
  }

  public getVehicleId(): string {
    return this.vehicleId.toString();
  }

  public getReason(): string {
    return this.reason;
  }

  public getStartDate(): Date {
    return this.startDate;
  }

  public getEndDate(): Date | null {
    return this.endDate;
  }

  public endRide(): void {
    if (this.endDate === null) {
      this.endDate = new Date();
    }
  }

  private constructor(
    id: UUID,
    driverId: UUID,
    vehicleId: UUID,
    reason: string,
    startDate: Date,
    endDate: Date | null
  ) {
    this.id = id;
    this.driverId = driverId;
    this.vehicleId = vehicleId;
    this.reason = reason;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  public static create(input: CreateRideDTO): Ride {
    const id = UUID.generate();
    const driverId = new UUID(input.driverId);
    const vehicleId = new UUID(input.vehicleId);
    const startDate = new Date();
    const endDate = null;
    return new Ride(id, driverId, vehicleId, input.reason, startDate, endDate);
  }
}
