import express from 'express';
import magicItemController from '../controllers/magicItemController';

const magicItemRouter = express.Router();

magicItemRouter.post('', magicItemController.addMagicItem)

export default magicItemRouter;