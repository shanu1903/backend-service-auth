const JWT = require('jsonwebtoken');

module.exports = function(req , res , next){
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send('Access Denied');
    }
    try{
        const verified = JWT.verify(token , 'secretKey');
        res.user = verified;
        next();
    }catch(err){
        res.status(400).send("Invalid token")
    }
}