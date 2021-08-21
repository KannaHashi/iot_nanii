const router = require('express').Router()
const User = require('../models/User')

let CardUID
router.post('/set_card_uid', (req, res) => {
    CardUID = req.body.card_uid
    return res.status(200).json({ message: "Success!", card_uid: req.body.card_uid })
})

router.get('/', async (req, res) => {
    const data = await User.findOne({card_uid: CardUID})

    if(data) {
        return res.status(200).json(data)
    }else{
        return res.status(200).json({card_uid: CardUID})
    }
})

router.get('/register_card', async (req, res) => {
    const checkData = await User.findOne({ card_uid: CardUID })

    let form_data = {
        card_uid: CardUID,
        user_name: "",
        full_name: "",
        email: "",
        phone_number: "",
        coins: 0,
        diamond: 0
    }

    if (checkData) {
        form_data = {
            card_uid: CardUID,
            user_name: checkData.user_name,
            full_name: checkData.full_name,
            email: checkData.email,
            phone_number: checkData.phone_number,
            coins: checkData.coins,
            diamond: checkData.diamond
        }
    }
    res.render('register_card', { form_data })
})

router.post('/register_card', async (req, res) => {
    await User.findOneAndUpdate({
        card_uid: CardUID
    }, {
        card_uid: CardUID,
        user_name: req.body.user_name,
        full_name: req.body.full_name,
        email: req.body.phone_number,
        coins: 0,
        diamond: 0
    }, {
        new: true,
        upsert: true
    }).then(() => {
        const data_sent = {
            card_uid: CardUID,
            user_name: req.body.user_name,
            full_name: req.body.full_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            coins: 0,
            diamond: 0
        }
        return res.status(200).json({ message: "Success!", data_received: data_sent })
    }).catch(e => {
        return console.error(e)
    })
})

module.exports = router