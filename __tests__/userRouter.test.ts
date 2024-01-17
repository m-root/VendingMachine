import * as chai from "chai";
import supertest from "supertest";
import express from "express";

const expect = chai.expect;
const app = express();
const request = supertest(app);

describe("User Routes", () => {
  it("POST /buy should purchase a product successfully", async () => {
    const response = await request.post("/user/buy").send({
      productSlot: "Soda",
      coins: [1.0, 0.25, 0.25, 0.25],
    });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("success").to.equal(true);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Purchase successful");
    expect(response.body).to.have.property("change").to.be.an("array");
  });

  it("POST /buy should handle insufficient funds", async () => {
    const response = await request.post("/user/buy").send({
      productSlot: "Soda",
      coins: [0.25, 0.25],
    });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("success").to.equal(false);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Insufficient funds");
    expect(response.body).to.have.property("change").to.be.an("array").that.is
      .empty;
  });

  it("POST /buy should handle product not available", async () => {
    const response = await request.post("/user/buy").send({
      productSlot: "Crisps",
      coins: [1.0, 0.25, 0.25, 0.25],
    });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("success").to.equal(false);
    expect(response.body)
      .to.have.property("message")
      .to.equal("Product not available");
    expect(response.body).to.have.property("change").to.be.an("array").that.is
      .empty;
  });
});
