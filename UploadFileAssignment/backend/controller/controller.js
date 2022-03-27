const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { transferData } = require('../uploadConfig/multerConfig')

exports.register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Enter all details')
    }

    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
        name: name,
        email: email,
        password: passwordHash
    })

    console.log(newUser)

    const user = await newUser.save()

    res.send(user)
})

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({email})
    
    if (!user) {
        res.status()
        res.send("User doesn't exist")
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
        res.send("Password or Email is incorrect")
    }

    res.send({
        name: user.name,
        accessToken: generateToken(user._id),
        status: 'Login successful'
    })

})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

exports.getMe = (req, res) => {
    res.send(req.user)
}

exports.fileUpload = (req, res) => {
    // console.log(req.file)
    transferData()
    res.send(req.file)
}