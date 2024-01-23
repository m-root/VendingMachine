export class Product {
    constructor(
        private name: string,
        private price: number,
        private quantity: number
    ) {}


    // Getter for the price of the products
    getPrice(): number {
        return this.price;
    }

    // Getter for the quantity of the products
    getQuantity(): number {
        return this.quantity;
    }

    // Setter for the price of the products
    setPrice(price: number): void {
        this.price = price;
    }

    // Setter for the quantity of the products
    setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    // Method to decrease the quantity of the products
    decreaseQuantity(amount: number): void {
        if (this.quantity >= amount) {
            this.quantity -= amount;
        } else {
            throw new Error("Insufficient product quantity");
        }
    }

    // Method to increase the quantity of the products
    increaseQuantity(amount: number): void {
        this.quantity += amount;
    }
}
