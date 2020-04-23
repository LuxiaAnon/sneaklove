const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const newSneaker = new Schema ({
    name: {
        type: String,
        require: true
    },
    ref: String,
    size: Number,
    description: String,
    price: Number,
    category: {
        type: String,
        enum: ['men', 'women', 'kids'],
    },
    id_tags: { type: Schema.Types.Object }
})

const Sneaker = mongoose.model ('Sneaker', newSneaker);
module.exports = Sneaker;