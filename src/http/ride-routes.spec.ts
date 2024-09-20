import request from "supertest";
import { expressServer } from "./app";
import { InMemoryDriverRepository } from "../adapters/in-memory-driver-repository";
import { InMemoryRideRepository } from "../adapters/in-memory-ride-repository";
import { InMemoryVehicleRepository } from "../adapters/in-memory-vehicle-repository";
import { DomainRegistry } from "../domain/boundaries/domain-registry";

describe("HTTP /ride/*", () => {
  beforeEach(() => {
    const registry = DomainRegistry.getInstance();
    registry.register("driverRepository", new InMemoryDriverRepository());
    registry.register("vehicleRepository", new InMemoryVehicleRepository());
    registry.register("rideRepository", new InMemoryRideRepository());
  });

  it("Should be able to start a ride", async () => {
    const registerDriverResponse = await request(expressServer)
      .post("/driver")
      .send({ name: "John Doe" });
    const registerVehicleResponse = await request(expressServer)
      .post("/vehicle")
      .send({
        brand: "BMW",
        color: "white",
        plate: "HJD5687",
      });
    const { driverId } = registerDriverResponse.body;
    const { vehicleId } = registerVehicleResponse.body;
    const registerRideBody = {
      driverId,
      vehicleId,
      reason: "Attending a bussines meeting.",
    };
    const startRideResponse = await request(expressServer)
      .post("/ride")
      .send(registerRideBody);
    expect(startRideResponse.status).toEqual(201);
    expect(startRideResponse.body.rideId).toEqual(expect.any(String));
  });

  it("Should be able to end a ride", async () => {
    const registerDriverResponse = await request(expressServer)
      .post("/driver")
      .send({ name: "John Doe" });
    const registerVehicleResponse = await request(expressServer)
      .post("/vehicle")
      .send({
        brand: "BMW",
        color: "white",
        plate: "HJD5687",
      });
    const { driverId } = registerDriverResponse.body;
    const { vehicleId } = registerVehicleResponse.body;
    const registerRideBody = {
      driverId,
      vehicleId,
      reason: "Attending a bussines meeting.",
    };
    const startRideResponse = await request(expressServer)
      .post("/ride")
      .send(registerRideBody);
    const { rideId } = startRideResponse.body;
    const endRideResponse = await request(expressServer).patch(
      `/ride/${rideId}/end`
    );
    expect(endRideResponse.status).toEqual(204);
  });

  it("Should be able to list rides with vehicle and driver data", async () => {
    const registerDriverBody = {
      name: "John Doe",
    };
    const registerDriverResponse = await request(expressServer)
      .post("/driver")
      .send(registerDriverBody);
    const registerVehicleBody = {
      brand: "BMW",
      color: "white",
      plate: "HJD5687",
    };
    const registerVehicleResponse = await request(expressServer)
      .post("/vehicle")
      .send(registerVehicleBody);
    const { driverId } = registerDriverResponse.body;
    const { vehicleId } = registerVehicleResponse.body;
    const registerRideBody = {
      driverId,
      vehicleId,
      reason: "Attending a bussines meeting.",
    };
    const startRideResponse = await request(expressServer)
      .post("/ride")
      .send(registerRideBody);
    const listRidesResponse = await request(expressServer).get("/ride");
    expect(listRidesResponse.status).toEqual(200);
    expect(listRidesResponse.body.rides).toHaveLength(1);
    expect(listRidesResponse.body.rides[0]).toEqual(
      expect.objectContaining({
        rideId: startRideResponse.body.rideId,
        startDate: expect.any(String),
        endDate: null,
        reason: registerRideBody.reason,
        driver: expect.objectContaining({
          driverId,
          name: registerDriverBody.name,
        }),
        vehicle: expect.objectContaining({
          vehicleId,
          plate: registerVehicleBody.plate,
          brand: registerVehicleBody.brand,
          color: registerVehicleBody.color,
        }),
      })
    );
  });
});
