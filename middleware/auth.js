const jwt = require('jsonwebtoken')
const User = require('../models/User')

const jwtKey = process.env.JWT_KEY

const auth = (options) => (req, res, next) => {
        
        console.log(options)
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const data = jwt.verify(token, jwtKey)
            
            User.findOne({ _id: data._id, 'tokens.token': token }).select('-password')
                .then((user) => {
                    req.user = user
                    req.token = token
                    
                    if(!user.role.includes(options.role)){
                        if(!user.role === 'admin'){
                            throw new Error()
                        }
                    }
                    next()
                })
                .catch(err => res.status(401).send({ error: 'Not authorized to access this resource' }))

        } catch (error) {
            res.status(401).send({ error: 'Not authorized to access this resource' })
        }
}

module.exports = auth