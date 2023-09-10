import { Router } from "express";
import { DeviceController } from "./controllers/DeviceController";
import { UserController } from "./controllers/UserController";
import { SettingsController } from "./controllers/SettingsController";
import { MonitoringController } from "./controllers/MonitoringController";

const router = Router();
const apiV1Router = Router();

const device = new DeviceController();
const user = new UserController();
const settings = new SettingsController();
const monitoring = new MonitoringController();

// device endpoints
apiV1Router.get("/device", device.index);
apiV1Router.get("/device/:id", device.get);
apiV1Router.post("/device", device.create);
apiV1Router.patch("/device/:id", device.update);
apiV1Router.delete("/device/:id", device.delete);
apiV1Router.get("/device/monitoring/:id", device.getMonitoringDataByDevice);

// user endpoints
apiV1Router.get("/user", user.index);
apiV1Router.get("/user/:id", user.get);
apiV1Router.post("/user", user.create);
apiV1Router.patch("/user/:id", user.update);
apiV1Router.delete("/user/:id", user.delete);
apiV1Router.get("/user/device/:id", user.getDataByUser);

// settings endpoints
apiV1Router.get("/settings", settings.index);
apiV1Router.get("/settings/:id", settings.get);
apiV1Router.post("/settings", settings.create);
apiV1Router.patch("/settings/:id", settings.update);
apiV1Router.delete("/settings/:id", settings.delete);

// monitoring endpoints
apiV1Router.get("/monitoring", monitoring.index);
apiV1Router.get("/monitoring/:id", monitoring.get);
apiV1Router.post("/monitoring", monitoring.create);
apiV1Router.patch("/monitoring/:id", monitoring.update);
apiV1Router.delete("/monitoring/:id", monitoring.delete);

router.use("/api/v1", apiV1Router);

export { router };
