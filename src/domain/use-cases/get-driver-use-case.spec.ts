import { InMemoryDriverRepository } from "../../adapters/in-memory-driver-repository";
import { DomainRegistry } from "../boundaries/domain-registry";
import { Driver } from "../entities/driver";
import { DriverNotFoundExcepiton } from "../exceptions/driver-not-found-exception";
import { GetDriverUseCase } from "./get-driver-use-case";

describe("GetDriverUseCase", () => {
  let sut: GetDriverUseCase;
  let dirverRepository: InMemoryDriverRepository;

  beforeEach(() => {
    sut = new GetDriverUseCase();
    dirverRepository = new InMemoryDriverRepository();
    const registry = DomainRegistry.getInstance();
    registry.register("driverRepository", dirverRepository);
  });

  it("Should be able to get a driver by it's id", async () => {
    const driver = Driver.create({ name: "john Doe" });
    dirverRepository.items.push(driver);
    const input = {
      driverId: driver.getId(),
    };
    const output = await sut.execute(input);
    expect(output.driverId).toEqual(driver.getId());
    expect(output.name).toEqual(driver.getName());
  });

  it("Should not be able to get an unexistent driver", async () => {
    const input = {
      driverId: "UNEXISTENT-DRIVER-ID",
    };
    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      DriverNotFoundExcepiton
    );
  });
});
