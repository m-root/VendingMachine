import express from "express";
import { productInventory, coinInventory } from "../models/inventory";
import { VendingMachine } from "../models/vendingMachine";

const vendingMachine = new VendingMachine(productInventory, coinInventory);

const maintenanceRouter = express.Router();
maintenanceRouter.use(express.json());

maintenanceRouter.get("/products", (req, res) => {
  return res.json(productInventory);
});

maintenanceRouter.get("/coins", (req, res) => {
  return res.json(coinInventory);
});

maintenanceRouter.put("/set-price", (req, res) => {
  try {
    const { productSlot, newPrice } = req.body;

    // Check if the product exists
    if (!vendingMachine.productExists(productSlot)) {
      return res.status(404).json({ message: "Product not found" });
    }

    const message = vendingMachine.setPrice(productSlot, newPrice);
    res.json({ message });
  } catch (error) {
    console.error("Error in /set-price route:", error);
    res.status(500).json({ message: "An error occurred setting the price" });
  }
});

maintenanceRouter.put("/adjust-quantity", (req, res) => {
  try {
    const { productSlot, newQuantity } = req.body;

    // Check if the product exists
    if (!vendingMachine.productExists(productSlot)) {
      return res.status(404).json({ message: "Product not found" });
    }
    const message = vendingMachine.adjustProductQuantity(
      productSlot,
      newQuantity
    );
    res.json({ message });
  } catch (error) {
    console.error("Error in /adjust-quantity route:", error);
    res
      .status(500)
      .json({ message: "An error occurred adjusting the quantity" });
  }
});

maintenanceRouter.put("/update-coins", (req, res) => {
  try {
    const { coinValue, newQuantity } = req.body;
    const message = vendingMachine.updateCoinQuantity(coinValue, newQuantity);
    res.json({ message });
  } catch (error) {
    console.error("Error in /update-coins route:", error);
    res.status(500).json({ message: "An error occurred updating the coins" });
  }
});

export default maintenanceRouter;
