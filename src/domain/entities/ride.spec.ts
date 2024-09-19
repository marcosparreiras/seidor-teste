import { Ride } from "./ride";

describe("Ride (Entity)", () => {
  it("Should be able to create a ride", () => {
    const input = {
      driverId: "DRIVER-ID",
      vehicleId: "VEHICLE-ID",
      reason: "Attending a bussines conference.",
    };
    const ride = Ride.create(input);
    expect(ride.getId()).toEqual(expect.any(String));
    expect(ride.getDriverId()).toEqual(input.driverId);
    expect(ride.getVehicleId()).toEqual(input.vehicleId);
    expect(ride.getReason()).toEqual(input.reason);
    expect(ride.getEndDate()).toBeNull();
    expect(ride.getStartDate()).toEqual(expect.any(Date));
  });

  it("Should be able to end a ride", () => {
    const input = {
      driverId: "DRIVER-ID",
      vehicleId: "VEHICLE-ID",
      reason: "Attending a bussines conference.",
    };
    const ride = Ride.create(input);
    ride.endRide();
    expect(ride.getEndDate()).toEqual(expect.any(Date));
  });

  it("Should not change the end date if the ride is already ended", async () => {
    const input = {
      driverId: "DRIVER-ID",
      vehicleId: "VEHICLE-ID",
      reason: "Attending a bussines conference.",
    };
    const ride = Ride.create(input);
    ride.endRide();
    const endDate = ride.getEndDate()?.getMilliseconds();
    await new Promise((resolve) => setTimeout(resolve, 10));
    ride.endRide();
    expect(ride.getEndDate()?.getMilliseconds()).toBe(endDate);
  });
});
