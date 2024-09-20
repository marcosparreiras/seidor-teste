import express from "express";
import { errorHandlerMiddleware } from "./middlewares/error-handler";
import { RegisterVehicleController } from "./controllers/register-vehicle-controller";
import { updateVehicleController } from "./controllers/update-vehicle-controller";
import { getVehicleController } from "./controllers/get-vehicle-controller";
import { deleteVehicleController } from "./controllers/delete-vehicle-controller";
import { getManyVehiclesController } from "./controllers/get-many-vehicles-controller";

export const expressServer = express();
expressServer.use(express.json());
expressServer.post("/vehicle", RegisterVehicleController);
expressServer.get("/vehicle", getManyVehiclesController);
expressServer.get("/vehicle/:vehicleId", getVehicleController);
expressServer.put("/vehicle/:vehicleId", updateVehicleController);
expressServer.delete("/vehicle/:vehicleId", deleteVehicleController);
expressServer.use(errorHandlerMiddleware);
