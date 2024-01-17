import { Product } from "./product";
import { Coin } from "./coin";

export const productInventory: { [key: string]: Product } = {
  Soda: new Product("Soda", 1.5, 20),
  Crisps: new Product("Crisps", 1.0, 15),
  Water: new Product("Water", 1.0, 25),
  Juice: new Product("Juice", 2.0, 12),
  Coffee: new Product("Coffee", 2.5, 18),
  Redbull: new Product("Redbull", 2.25, 10),
  Gum: new Product("Gum", 0.5, 40),
  Chocolate: new Product("Chocolate", 1.75, 28),
};


export const coinInventory: { [key: string]: Coin } = {
  "5": new Coin(5, 100),
  "10": new Coin(10, 50),
  "25": new Coin(25, 75),
  "50": new Coin(50, 30),
};
