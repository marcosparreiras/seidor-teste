import { InMemoryDriverRepository } from "../../adapters/in-memory-driver-repository";
import { DomainRegistry } from "../boundaries/domain-registry";
import { Driver } from "../entities/driver";
import { DriverNotFoundExcepiton } from "../exceptions/driver-not-found-exception";
import { DeleteDriverUseCase } from "./delete-driver-use-case";

describe("DeleteDriverUseCase", () => {
  let sut: DeleteDriverUseCase;
  let driverRepository: InMemoryDriverRepository;

  beforeEach(() => {
    sut = new DeleteDriverUseCase();
    driverRepository = new InMemoryDriverRepository();
    const registry = DomainRegistry.getInstance();
    registry.register("driverRepository", driverRepository);
  });

  it("Should be able to delete a driver", async () => {
    const driver = Driver.create({ name: "John Doe" });
    driverRepository.items.push(driver);
    const input = {
      driverId: driver.getId(),
    };
    await sut.execute(input);
    expect(driverRepository.items).toHaveLength(0);
  });

  it("Should not be able to delete an unexistent driver", async () => {
    const input = {
      driverId: "UNEXISTENT-DRIVER-ID",
    };
    await expect(() => sut.execute(input)).rejects.toBeInstanceOf(
      DriverNotFoundExcepiton
    );
  });
});
