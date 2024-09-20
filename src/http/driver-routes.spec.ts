import request from "supertest";
import { expressServer } from "./app";
import { DomainRegistry } from "../domain/boundaries/domain-registry";
import { InMemoryDriverRepository } from "../adapters/in-memory-driver-repository";

describe("HTTP /driver/*", () => {
  beforeEach(() => {
    const registry = DomainRegistry.getInstance();
    registry.register("driverRepository", new InMemoryDriverRepository());
  });

  it("Should be able to register a new driver", async () => {
    const registerDriverBody = {
      name: "John Doe",
    };
    const registerDriverResponse = await request(expressServer)
      .post("/driver")
      .send(registerDriverBody);
    expect(registerDriverResponse.status).toEqual(201);
    expect(registerDriverResponse.body.driverId).toEqual(expect.any(String));
  });

  it("Should be able to get a driver data", async () => {
    const regitserDriverBody = {
      name: "John Doe",
    };
    const registerDriverResponse = await request(expressServer)
      .post("/driver")
      .send(regitserDriverBody);
    const { driverId } = registerDriverResponse.body;
    const getDriverResponse = await request(expressServer).get(
      `/driver/${driverId}`
    );
    expect(getDriverResponse.status).toEqual(200);
    expect(getDriverResponse.body).toEqual(
      expect.objectContaining({
        name: regitserDriverBody.name,
        driverId: driverId,
      })
    );
  });

  it("Should be able to update a driver data", async () => {
    const regitserDriverBody = {
      name: "John Doe",
    };
    const registerDriverResponse = await request(expressServer)
      .post("/driver")
      .send(regitserDriverBody);
    const { driverId } = registerDriverResponse.body;
    const updateDriverBody = {
      name: "John Albert Doe",
    };
    const updateDriverResponse = await request(expressServer)
      .put(`/driver/${driverId}`)
      .send(updateDriverBody);
    expect(updateDriverResponse.status).toEqual(204);
    const getDriverResponse = await request(expressServer).get(
      `/driver/${driverId}`
    );
    expect(getDriverResponse.body).toEqual(
      expect.objectContaining({
        name: updateDriverBody.name,
        driverId: driverId,
      })
    );
  });

  it("Should be able to delete a driver", async () => {
    const regitserDriverBody = {
      name: "John Doe",
    };
    const registerDriverResponse = await request(expressServer)
      .post("/driver")
      .send(regitserDriverBody);
    const { driverId } = registerDriverResponse.body;
    const deleteDriverResponse = await request(expressServer).delete(
      `/driver/${driverId}`
    );
    expect(deleteDriverResponse.status).toEqual(204);
    const getDriverResponse = await request(expressServer).get(
      `/driver/${driverId}`
    );
    expect(getDriverResponse.status).toEqual(400);
  });

  it("Should be able to list drivers", async () => {
    const driversToRegister = [
      { name: "John Doe" },
      { name: "Janny Doe" },
      { name: "Robert Doe Brow" },
      { name: "Jammy Frank" },
    ];
    await Promise.all(
      driversToRegister.map((body) =>
        request(expressServer).post("/driver").send(body)
      )
    );
    const queryParams = {
      name: "Doe",
    };
    const listDriversResponse = await request(expressServer)
      .get(`/driver`)
      .query(queryParams);
    expect(listDriversResponse.status).toEqual(200);
    expect(listDriversResponse.body.drivers).toHaveLength(3);
    expect(listDriversResponse.body.drivers[0]).toEqual(
      expect.objectContaining({
        driverId: expect.any(String),
        name: expect.stringContaining("Doe"),
      })
    );
  });
});
