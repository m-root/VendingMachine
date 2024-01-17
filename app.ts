import express from "express";
import { productInventory, coinInventory } from "./src/models/inventory";
import { VendingMachine } from "./src/models/vendingMachine";
import userRouter from "./src/routers/userRouter";
import maintenanceRouter from "./src/routers/maintenanceRoutes";

const app = express();
app.use(express.json());


const vendingMachine = new VendingMachine(productInventory, coinInventory);


app.use("/user", userRouter);
app.use("/maintenance", maintenanceRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export { app };
