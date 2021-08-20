const router = require('express').Router()
const User = require('../models/User')

router.get('/', async(req,res) => {
    const data = await User.find()

    return res.status(200).json(data)
})

module.exports = router