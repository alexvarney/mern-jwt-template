const express = require('express');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs')

const router = express.Router()


//Create a new user -> Remove the auth middleware to allow first user creation by curl or postman
router.post('/', auth({role: ['admin']}), async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        if(user.password){
            user.password = await bcrypt.hash(req.body.password, 8)
        }
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/', auth({role: ['admin']}), async (req, res) => {

    const results = await User.find({}).select('-tokens').select('-password')
    res.send(results)

})

router.post('/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        let user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        user.password = null;
        res.send({ user, token })
    } catch (error) {
        console.log(JSON.stringify(req.body));
        res.status(400).send(error);
    }
})

router.get('/me', auth({role: ['user']}), (req, res) =>{
    res.send(JSON.stringify(req.user))
})

router.post('/me/logout', auth({role: ['user']}), async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/me/logoutall', auth({role: ['user']}), async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.put('/me', auth({role: ['user']}), async(req, res) => {
    //Update a user (will currently only update name, email and password fields)

    let user = await User.findOneAndUpdate({_id: req.user._id}, {name: req.body.name, email: req.body.email}, {new: true})

    //Hash the pasword 
    if(req.body.password){
        user.password = await bcrypt.hash(req.body.password, 8)
    }

    user.save().then(result => res.send(JSON.stringify(result))).catch(err => console.log(err));

})

router.put('/:userId', auth({role: ['admin']}), async(req, res) => {
    let user = await User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true})

    //Hash the pasword 
    if(req.body.password){
        user.password = await bcrypt.hash(req.body.password, 8)
    }

    user.save().then(result => res.send(JSON.stringify(result))).catch(err => console.log(err));
})

module.exports = router