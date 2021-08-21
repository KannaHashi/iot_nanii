const router = require('express').Router()
const User = require('../models/User')

router.get('/', async(req,res) => {
    const data = await User.find()

    return res.status(200).json(data)
})

router.get('/edit/:card_uid', async(req,res) => {
    const data = await User.findOne({card_uid: req.params.card_uid})

    if(!data){
        return res.status(404).json({message: "User not Found!"})
    }else {
        return res.render('edit_card')
    }
})

router.post('/edit/:card_uid', async(req, res) => {
    const [user_name, full_name, email, phone_number, coins, diamond] = req.body

    await User.findOneAndModify({
        card_uid: req.params.card_uid
    }, {
        card_uid: req.params.card_uid,
        user_name: user_name,
        full_name: full_name,
        email: email,
        phone_number: phone_number,
        coins: coins,
        diamond: diamond
    }).then(async() => {
    const data = await User.findOne({card_uid: req.params.card_uid})
    return res.status(200).json(data)
    }).catch(e => {
        console.error(e)
    })
})

module.exports = router