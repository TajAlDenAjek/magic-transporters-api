import express from 'express';
import magicMoverController from '../controllers/magicMoverController';

const magicMoverRouter = express.Router();

magicMoverRouter.post('',magicMoverController.addMagicMover)
magicMoverRouter.post('/:id/load',magicMoverController.loadItemOntoMover)
magicMoverRouter.post('/:id/start-mession',magicMoverController.startMession)
magicMoverRouter.post('/:id/end-mession',magicMoverController.endMession)
magicMoverRouter.get('/most-messions',magicMoverController.getMostActiveMovers)

export default magicMoverRouter;