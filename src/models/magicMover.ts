import mongoose from "mongoose";

const magicMoverSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  weightLimit: Number,
  currentLoadded: Number,
  currentState: {
    type: String,
    enum: ['resting', 'loading', 'on-mission'],
    default: 'resting'
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MagicItem' }],
  logs: [
    {
      timestamp: Date,
      action: String,
      state: String
    }
  ]
});

export default mongoose.model('MagicMover', magicMoverSchema);
