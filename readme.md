# TypeScript Vending Machine Project

This project, written in TypeScript, features a vending machine application. It tracks the inventory of various items, manages change for different coin types, and offers REST endpoints for users and maintenance personnel.

## Setting Up

To set up the project:

1. Extract the files:
   ```bash
   unzip vending-machine.zip -d vending-machine
   ```

2. Go to the project folder:
   ```bash
   cd vending-machine
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Structure of the Project

The project is laid out as follows:

```
vending-machine/
├── src/
│   ├── models/
│   │   ├── buy.ts
│   │   ├── coin.ts
│   │   ├── operations.ts
│   │   ├── product.ts
│   │   ├── user.ts
│   ├── vendingMachine.ts
├── __tests__/
│   ├── Product.test.ts
│   ├── Coin.test.ts
│   ├── User.test.ts
│   ├── api.test.ts
├── app.ts
├── package.json
├── package-lock.json
├── readme.md
├── tsconfig.json
```

- `src/models/`: Holds classes for `buy`, `coin`, `operations`, `product`, `user`, `vendingMachine`.
- `__tests__/`: Includes tests for classes and API endpoints.
- `app.ts`: Main Express application file.
- `package.json`: Dependency and script details.
- `tsconfig.json`: TypeScript configuration file.

## How to Use

### Running the App

Execute this command to start the application:

```bash
npm start
```

This launches the server, listening on the default port `3000`. The server can be accessed at `http://localhost:3000`.

### API Endpoints

The application provides `REST` endpoints for both standard and maintenance users:

- Standard User:
  - `POST /user/buy`: Buy a product using the product slot and coin amounts.

- Maintenance User:
  - Set product prices.
  - Adjust product quantities.
  - Update coin quantities.

Customize these endpoints as needed.

Coins accepted: 5, 10, 25, 50 cents.

Example `POST` request:

```json
{
  "productSlot": "Soda",
  "coins": [25, 25, 50, 100]
}
```

## Fetch Product Inventory

Get the vending machine's product inventory.

`GET /maintenance/products`

Response:

```json
{
  
  "Soda":{
    "name":"Soda",
    "price":1.5,
    "quantity":20
  },
  
  "Crisps":{
    "name":"Crisps",
    "price":1,
    "quantity":15
  },
  
  "Water":{
    "name":"Water",
    "price":1,
    "quantity":25
  },
  
  "Juice":{
    "name":"Juice",
    "price":2,
    "quantity":12
  },
  
  "Coffee":{
    "name":"Coffee",
    "price":2.5,
    "quantity":18
  },
  
  "Redbull":{
    "name":"Redbull",
    "price":2.25,
    "quantity":10
  },
  
  "Gum":{
    "name":"Gum",
    "price":0.5,
    "quantity":40
  },
  
  "Chocolate":{
    "name":"Chocolate",
    "price":1.75,
    "quantity":28
  }
  
}
```

### Fetch Coin Inventory

Get the vending machine's coin inventory.

`GET /maintenance/coins`

Response:

```json
{
  
  "5":{
    "value":5,
    "quantity":100
  },
  
  "10":{
    "value":10,
    "quantity":50
  },
  
  "25":{
    "value":25,
    "quantity":75
  },
  
  "50":{
    "value":50,
    "quantity":30
  }
  
}
```

### Set Product Price

Assign a new price to a product.

`POST /maintenance/set-price`

Request example:

```json
{
  "productSlot": "Soda",
  "newPrice": 2.0
}
```

Response example:

```json
{
  "message": "Price set successfully"
}
```

### Modify Product Quantity

Change a product's quantity.

`POST /maintenance/adjust-quantity`

Request example:

```json
{
  "productSlot": "Soda",
  "newQuantity": 15
}
```

Response example:

```json
{
  "message": "Product quantity adjusted successfully"
}
```

### Update Coin Quantity

Change the quantity of a coin type.

`POST /maintenance/update-coins`

Request example:

```json
{
  "coinValue": 0.25,
  "newQuantity": 25
}
```

Response example:

```json
{
  "message": "Coin quantity updated successfully"
}
```

## Testing the Application

Run tests using:

```bash
npx mocha tests/*.test.ts
```

This documentation now includes the base URL `http://localhost:3000` for accessing the running application, which provides a clear starting point for interacting with the `REST API` endpoints.