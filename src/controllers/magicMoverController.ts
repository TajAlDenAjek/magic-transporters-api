
import { Request, Response } from "express";
import MagicMover from "../models/magicMover";
import MagicItem from "../models/magicItem";

const addMagicMover = async (req: Request, res: Response) => {
    try {
        const { weightLimit, currentState = 'resting' } = req.body;
        if (!weightLimit || weightLimit <= 0) {
            return res.status(400).json({ message: 'Weight limit must be non empty and postive integer' });
        }
        const newMover = await MagicMover.create({
            weightLimit,
            currentState,
            currentLoadded: 0,
            items: [],
            logs: []
        });

        res.status(201).json(newMover);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }

}
const loadItemOntoMover = async (req: Request, res: Response) => {
    const id = (req.params.id);
    const itemId = (req.body.itemId);
    try {
        if (!id || !itemId) {
            return res.status(400).json({ message: 'mover id && item id are required' });
        }
        const foundMover: any = await MagicMover.findById({ _id: id })
        const foundItem: any = await MagicItem.findById({ _id: itemId })
        if (!foundMover) {
            return res.status(404).json({ message: 'Magic Mover not found' });
        }
        if (!foundItem) {
            return res.status(404).json({ message: 'Magic Item not found' });
        }
        if (foundMover.weightLimit - foundMover.currentLoadded < foundItem.weight) {
            return res.status(400).json({ message: 'mover weight limit is exceeded' });
        }
        if (foundMover.currentState === 'on-mession') {
            return res.status(400).json({ message: 'current mover is in a mission you can not load it more' });
        }
        if (foundItem.moverId) {
            return res.status(400).json({ message: 'current item is already loaded with a mover' });
        }
        const mover = await MagicMover.findByIdAndUpdate(
            { _id: id },
            {
                currentLoadded: Number(foundMover.currentLoadded + foundItem.weight),
                currentState: 'loading',
                $addToSet: { items: itemId },
                $push: { logs: { timestamp: new Date(), action: 'loading', state: 'loading' } }
            },
            { new: true }
        );

        const item = await MagicItem.findByIdAndUpdate(
            { _id: itemId },
            { $set: { moverId: id } },
            { new: true }
        );
        res.json(mover);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

const startMession = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {

        if (!id) {
            return res.status(400).json({ message: 'mover id required' });
        }
        const foundMover: any = await MagicMover.findById({ _id: id })
        if (!foundMover) {
            return res.status(404).json({ message: 'Magic Mover not found' });
        }
        if (foundMover.currentState != 'loading') {
            return res.status(400).json({ message: 'You can not start mession without a load or the mover is already in a mession' });
        }
        const mover: any = await MagicMover.findByIdAndUpdate(
            id,
            {
                $set: {
                    currentState: 'on-mession',
                },
                $push: {
                    logs: { timestamp: new Date(), action: 'start mission', state: 'on-mession' }
                }
            },
            { new: true }
        );

        res.json(mover);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

const endMession = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({ message: 'mover id required' });
        }
        const foundMover: any = await MagicMover.findById({ _id: id })
        if (!foundMover) {
            return res.status(404).json({ message: 'Magic Mover not found' });
        }
        if (foundMover.currentState != 'on-mession') {
            return res.status(400).json({ message: 'there is no mession to end' });
        }

        const mover: any = await MagicMover.findByIdAndUpdate(
            id,
            {
                $set: {
                    currentState: 'resting',
                    items: []
                },
                $push: {
                    logs: { timestamp: new Date(), action: 'end mission', state: 'resting' }
                }
            },
            { new: true }
        );

        await MagicItem.updateMany(
            { moverId: id },
            { $set: { moverId: null } }
        );
        res.json(mover);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

const getMostActiveMovers = async (req: Request, res: Response) => {
    try {
        const result = await MagicMover.aggregate([
            {
                $addFields: {
                    restingLogsCount: { $size: { $filter: { input: "$logs", as: "log", cond: { $eq: ["$$log.state", "resting"] } } } }
                }
            },
            {
                $sort: { restingLogsCount: -1 }
            },
        ]);

        res.json(result);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}
const magicMoverController = {
    addMagicMover,
    loadItemOntoMover,
    startMession,
    endMession,
    getMostActiveMovers

}

export default magicMoverController;