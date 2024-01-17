import { Product } from "./product";
import { Coin } from "./coin";

export class VendingMachine {
  private productInventory: { [key: string]: Product };
  private coinInventory: { [key: string]: Coin };

  constructor(
    productInventory: { [key: string]: Product },
    coinInventory: { [key: string]: Coin }
  ) {
    this.productInventory = productInventory;
    this.coinInventory = coinInventory;
  }

  productExists(productSlot: string): boolean {
    return !!this.productInventory[productSlot];
  }

  purchaseProduct(
    productSlot: string,
    insertedCoins: number[]
  ): { change: number[]; success: boolean; message: string } {
    try {
      const product = this.productInventory[productSlot];
      if (!product || product.getQuantity() === 0) {
        return { change: [], success: false, message: "Product not available" };
      }

      const totalAmount = insertedCoins.reduce(
        (acc, coinValue) => acc + coinValue,
        0
      );
      if (totalAmount < product.getPrice()) {
        return {
          change: insertedCoins,
          success: false,
          message: "Insufficient funds",
        };
      }

      const changeNeeded = totalAmount - product.getPrice();
      const change = this.calculateChange(changeNeeded);

      if (change) {
        product.decreaseQuantity(1);
        this.updateCoinInventoryAfterReceivingPayment(insertedCoins);
        return { change, success: true, message: "Purchase successful" };
      } else {
        return {
          change: insertedCoins,
          success: false,
          message: "Unable to provide exact change",
        };
      }
    } catch (error) {
      console.error("Error occurred in purchaseProduct:", error);
      return {
        change: [],
        success: false,
        message: "An error occurred during purchase",
      };
    }
  }

  setPrice(productSlot: string, newPrice: number): string {
    const product = this.productInventory[productSlot];
    if (!product) {
      throw new Error("Product not found");
    }

    product.setPrice(newPrice);
    return `Price for ${productSlot} updated to ${newPrice}`;
  }

  // Method to adjust the quantity of a specific product
  adjustProductQuantity(productSlot: string, newQuantity: number): string {
    const product = this.productInventory[productSlot];
    if (!product) {
      throw new Error("Product not found");
    }
    product.setQuantity(newQuantity);
    return `Quantity for ${productSlot} adjusted to ${newQuantity}`;
  }

  // Method to update the quantity of coins
  updateCoinQuantity(coinValue: number, newQuantity: number): string {
    const coin = this.coinInventory[coinValue];
    if (!coin) {
      throw new Error("Coin not found");
    }
    coin.setQuantity(newQuantity);
    return `Quantity for ${coinValue} cent coin adjusted to ${newQuantity}`;
  }

  private calculateChange(changeNeeded: number): number[] | null {
    let change: number[] = [];
    let remainingChange = changeNeeded;

    for (let coinValue of Object.keys(this.coinInventory)
      .map(Number)
      .sort((a, b) => b - a)) {
      while (
        remainingChange >= coinValue &&
        this.coinInventory[coinValue].getQuantity() > 0
      ) {
        change.push(coinValue);
        remainingChange -= coinValue;
        this.coinInventory[coinValue].decreaseQuantity(1);

        if (remainingChange === 0) {
          return change;
        }
      }
    }
    this.restoreCoinInventory(change);
    return null;
  }

  private updateCoinInventoryAfterPurchase(
    insertedCoins: number[],
    change: number[]
  ): void {
    // Increase quantity for inserted coins
    insertedCoins.forEach((coinValue) => {
      if (this.coinInventory[coinValue]) {
        this.coinInventory[coinValue].increaseQuantity(1);
      }
    });

    // Decrease quantity for coins returned as change
    change.forEach((coinValue) => {
      if (this.coinInventory[coinValue]) {
        this.coinInventory[coinValue].decreaseQuantity(1);
      }
    });
  }

  private restoreCoinInventory(change: number[]): void {
    change.forEach((coinValue) => {
      this.coinInventory[coinValue].increaseQuantity(1);
    });
  }

  private updateCoinInventoryAfterReceivingPayment(
    receivedCoins: number[]
  ): void {
    receivedCoins.forEach((coinValue) => {
      const coin = this.coinInventory[coinValue];
      if (coin) {
        coin.increaseQuantity(1);
      }
    });
  }
}
