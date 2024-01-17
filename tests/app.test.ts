import { expect } from "chai";
import supertest from "supertest";
import express from "express";
import { productInventory, coinInventory } from "../src/models/inventory";

const app = express();
const request = supertest(app);

describe("Express App", () => {
  it("GET /user/products should return the product inventory", async () => {
    const response = await request.get("/user/products");

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(productInventory);
  });

  it("GET /user/coins should return the coin inventory", async () => {
    const response = await request.get("/user/coins");

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(coinInventory);
  });

  it("POST /maintenance/set-price should set the price for a product", async () => {
    const response = await request.post("/maintenance/set-price").send({
      productSlot: "Soda",
      newPrice: 2.0,
    });

    expect(response.status).to.equal(200);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Price for Soda updated to 2.0");
  });

  it("POST /maintenance/adjust-quantity should adjust the quantity of a product", async () => {
    const response = await request.post("/maintenance/adjust-quantity").send({
      productSlot: "Soda",
      newQuantity: 15,
    });

    expect(response.status).to.equal(200);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Quantity for Soda adjusted to 15");
  });

  it("POST /maintenance/update-coins should update the quantity of a coin", async () => {
    const response = await request.post("/maintenance/update-coins").send({
      coinValue: 0.25,
      newQuantity: 50,
    });

    expect(response.status).to.equal(200);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Quantity for 0.25 cent coin adjusted to 50");
  });

});
