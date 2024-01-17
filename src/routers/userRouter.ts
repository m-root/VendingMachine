import express from 'express';
import { productInventory, coinInventory } from '../models/inventory';
import { VendingMachine } from '../models/vendingMachine';

const vendingMachine = new VendingMachine(productInventory, coinInventory);
export const userRouter = express.Router();

userRouter.post('/buy', (req, res) => {
    try {
        const { productSlot, coins } = req.body;
        const result = vendingMachine.purchaseProduct(productSlot, coins);
        res.json(result);
    } catch (error) {
        console.error('Error in /buy route:', error);
        res.status(500).json({ message: 'An error occurred during the purchase' });
    }
});

export default userRouter;
