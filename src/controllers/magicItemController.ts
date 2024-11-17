
import { Request, Response } from "express";
import MagicItem from "../models/magicItem";


const addMagicItem = async (req: Request, res: Response) => {
    try {
        const { name, weight } = req.body;
        if (!name || !weight) {
            return res.status(400).json({ message: 'name and weight are required' });
        }
        if (weight <= 0) {
            return res.status(400).json({ message: 'Weight must be postive integer' });
        }
        const newItem = await MagicItem.create({
            name,
            weight,
            moverId: null
        });
        res.status(201).json(newItem);
    } catch (error: any) {
        return res.status(500).json({ message: error.message});
    }
}


const magicItemController = {
    addMagicItem,
}

export default magicItemController;