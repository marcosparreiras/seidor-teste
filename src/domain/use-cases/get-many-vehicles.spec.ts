import { InMemoryVehicleRepository } from "../../adapters/in-memory-vehicle-repository";
import { DomainRegistry } from "../boundaries/domain-registry";
import { Vehicle } from "../entities/vehicle";
import { GetManyVehiclesUseCase } from "./get-many-vehicles";

describe("GetManyVehiclesUseCase", () => {
  let sut: GetManyVehiclesUseCase;
  let vehicleRepository: InMemoryVehicleRepository;

  beforeEach(() => {
    sut = new GetManyVehiclesUseCase();
    vehicleRepository = new InMemoryVehicleRepository();
    const registry = DomainRegistry.getInstance();
    registry.register("vehicleRepository", vehicleRepository);
  });

  it("Should be able to get many a vehicles", async () => {
    const vehicles = [
      {
        brand: "BMW",
        color: "white",
        plate: "JKO4625",
      },
      {
        brand: "BMW",
        color: "black",
        plate: "KOP4562",
      },
      {
        brand: "FORD",
        color: "gray",
        plate: "KKJ1256",
      },
      {
        brand: "RAM",
        color: "black",
        plate: "LOP4512",
      },
    ].map((vehicleData) => Vehicle.create(vehicleData));
    vehicleRepository.items.push(...vehicles);
    const output = await sut.execute();
    expect(output.vehicles).toHaveLength(vehicles.length);
    const firstResultVehicle = vehicles.find(
      (vehicle) => vehicle.getId() === output.vehicles[0].vehicleId
    );
    expect(output.vehicles[0].color).toEqual(firstResultVehicle?.getColor());
    expect(output.vehicles[0].brand).toEqual(firstResultVehicle?.getBrand());
    expect(output.vehicles[0].plate).toEqual(firstResultVehicle?.getPlate());
  });

  it("Should be able to filter the results per color", async () => {
    const vehicles = [
      {
        brand: "BMW",
        color: "white",
        plate: "JKO4625",
      },
      {
        brand: "BMW",
        color: "black",
        plate: "KOP4562",
      },
      {
        brand: "FORD",
        color: "gray",
        plate: "KKJ1256",
      },
      {
        brand: "RAM",
        color: "black",
        plate: "LOP4512",
      },
    ].map((vehicleData) => Vehicle.create(vehicleData));
    vehicleRepository.items.push(...vehicles);
    const input = {
      color: "lac",
    };
    const output = await sut.execute(input);
    expect(output.vehicles).toHaveLength(2);
  });

  it("Should be able to filter the results per brand", async () => {
    const vehicles = [
      {
        brand: "BMW",
        color: "white",
        plate: "JKO4625",
      },
      {
        brand: "BMW",
        color: "black",
        plate: "KOP4562",
      },
      {
        brand: "FORD",
        color: "gray",
        plate: "KKJ1256",
      },
      {
        brand: "RAM",
        color: "black",
        plate: "LOP4512",
      },
    ].map((vehicleData) => Vehicle.create(vehicleData));
    vehicleRepository.items.push(...vehicles);
    const input = {
      brand: "OR",
    };
    const output = await sut.execute(input);
    expect(output.vehicles).toHaveLength(1);
  });

  it("Should be able to filter the results per brand and color", async () => {
    const vehicles = [
      {
        brand: "BMW",
        color: "white",
        plate: "JKO4625",
      },
      {
        brand: "BMW",
        color: "black",
        plate: "KOP4562",
      },
      {
        brand: "FORD",
        color: "gray",
        plate: "KKJ1256",
      },
      {
        brand: "RAM",
        color: "black",
        plate: "LOP4512",
      },
    ].map((vehicleData) => Vehicle.create(vehicleData));
    vehicleRepository.items.push(...vehicles);
    const input = {
      brand: "BMW",
      color: "white",
    };
    const output = await sut.execute(input);
    expect(output.vehicles).toHaveLength(1);
  });
});
