const {Schema, model} = require('mongoose')

const Item = new Schema({
    item_id: {
        type: Number,
        require: true
    },
    item_name: {
        type: String,
        require: true
    },
    item_desc: {
        type: String
    },
    item_price: {
        type: Number,
        require: true
    },
    item_quantity: {
        type: Number,
        require: true
    }
})

module.exports = model("item", Item)