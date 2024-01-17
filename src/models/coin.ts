export class Coin {
    constructor(private value: number, private quantity: number) {}

    // Getter for the value of the coins
    getValue(): number {
        return this.value;
    }

    // Getter for the quantity of the coins
    getQuantity(): number {
        return this.quantity;
    }

    // Setter for the quantity of the coins
    setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    // Method to decrease the quantity of coins
    decreaseQuantity(amount: number): void {
        if (this.quantity >= amount) {
            this.quantity -= amount;
        } else {
            throw new Error("Insufficient coin quantity");
        }
    }

    // Method to increase the quantity of coins
    increaseQuantity(amount: number): void {
        this.quantity += amount;
    }
}
