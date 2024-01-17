import { expect } from "chai";
import { anything, instance, mock, reset, verify, when } from "ts-mockito";
import { VendingMachine } from "../src/models/vendingMachine";
import { Product } from "../src/models/product";
import { Coin } from "../src/models/coin";

describe("VendingMachine", () => {
  let mockProduct: Product;
  let mockCoin: Coin;
  let vendingMachine: VendingMachine;

  beforeEach(() => {
    mockProduct = mock(Product);
    when(mockProduct.getQuantity()).thenReturn(10);
    when(mockProduct.getPrice()).thenReturn(1.5);

    mockCoin = mock(Coin);
    when(mockCoin.getQuantity()).thenReturn(20);

    const productInventory = { Soda: instance(mockProduct) };
    const coinInventory = { "1.0": instance(mockCoin) };

    vendingMachine = new VendingMachine(productInventory, coinInventory);
  });

  afterEach(() => {
    reset(mockProduct);
    reset(mockCoin);
  });

  it("should check if a product exists", () => {
    expect(vendingMachine.productExists("Soda")).to.equal(true);
    expect(vendingMachine.productExists("Crisps")).to.equal(false);
  });

  it("should purchase a product successfully", () => {
    const result = vendingMachine.purchaseProduct("Soda", [1.0]);

    verify(mockProduct.decreaseQuantity(anything())).once();
    verify(mockCoin.decreaseQuantity(anything())).once();

    expect(result.success).to.equal(true);
    expect(result.message).to.equal("Purchase successful");
  });

  it("should handle insufficient funds during purchase", () => {
    const result = vendingMachine.purchaseProduct("Soda", [0.25]);

    expect(result.success).to.equal(false);
    expect(result.message).to.equal("Insufficient funds");
  });

  it("should handle product not available during purchase", () => {
    const result = vendingMachine.purchaseProduct("Crisps", [1.0]);

    expect(result.success).to.equal(false);
    expect(result.message).to.equal("Product not available");
  });
});
