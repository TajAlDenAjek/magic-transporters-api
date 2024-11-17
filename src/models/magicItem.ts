import mongoose from "mongoose";


const magicItemSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    moverId: { type: mongoose.Schema.Types.ObjectId, ref: 'MagicMover' }
});

export default mongoose.model('MagicItem', magicItemSchema);