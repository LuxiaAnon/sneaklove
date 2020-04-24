const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const newSneaker = new Schema ({
    name: {
        type: String,
        required: true
    },
    ref: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['men', 'women', 'kids'],
        required:true
    },
    id_tags: { type: Schema.Types.Object }
})

const Sneaker = mongoose.model ('Sneaker', newSneaker);
module.exports = Sneaker;