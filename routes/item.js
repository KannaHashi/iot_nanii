const router = require('express').Router()
const Item = require('../models/Item')

router.get('/', async (req, res) => {
    const data = await Item.find()

    return res.status(200).json(data)
})

router.get('/add_item', async (req, res) => {
    const data = await Item.find()
    const item_id = data.length + 1

    return res.render('register_item', {item_id})
})

router.post('/add_item', async (req, res) => {
    const data = await Item.find()
    const item_id = data.length + 1

    await new Item({
        item_id: item_id,
        item_name: req.body.item_name,
        item_desc: req.body.item_desc,
        item_price: req.body.item_price,
        item_quantity: req.body.item_quantity
    }).save().then(() => {
        const data_sent = {
            item_id: item_id,
            item_name: req.body.item_name,
            item_desc: req.body.item_desc,
            item_price: req.body.item_price,
            item_quantity: req.body.item_quantity
        }
        return res.status(200).json({ message: "Success!", data_received: data_sent })
    }).catch(e => {
        return console.error(e)
    })
})

module.exports = router