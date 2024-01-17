import * as chai from "chai";
import supertest from "supertest";
import express from "express";
import { productInventory, coinInventory } from "../src/models/inventory";
import { VendingMachine } from "../src/models/vendingMachine";
import maintenanceRouter from "../src/routers/maintenanceRoutes";

const app = express();
app.use("/maintenance", maintenanceRouter);

const request = supertest(app);
const expect = chai.expect;

describe("Maintenance Routes", () => {
  beforeEach(() => {
    const vendingMachine = new VendingMachine(productInventory, coinInventory);
  });

  it("GET /maintenance/products should return product inventory", async () => {
    const response = await request.get("/maintenance/products");
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(productInventory);
  });

  it("GET /maintenance/coins should return coin inventory", async () => {
    const response = await request.get("/maintenance/coins");
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(coinInventory);
  });

  it("POST /maintenance/set-price should set product price", async () => {
    const productSlot = "Soda";
    const newPrice = 2.0;
    const response = await request.post("/maintenance/set-price").send({
      productSlot,
      newPrice,
    });

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ message: "Price set successfully" });
  });

  it("POST /maintenance/adjust-quantity should adjust product quantity", async () => {
    const productSlot = "Soda";
    const newQuantity = 15;
    const response = await request.post("/maintenance/adjust-quantity").send({
      productSlot,
      newQuantity,
    });

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      message: "Product quantity adjusted successfully",
    });
  });

  it("POST /maintenance/update-coins should update coin quantity", async () => {
    const coinValue = 0.25;
    const newQuantity = 25;
    const response = await request.post("/maintenance/update-coins").send({
      coinValue,
      newQuantity,
    });

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      message: "Coin quantity updated successfully",
    });
  });
});
