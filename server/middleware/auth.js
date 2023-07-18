const jwt = require('jsonwebtoken')

const isAuth = (req, res, next) => {
    const token = req.headers.authorization?.split?.(' ')?.[1];
    if(!token){
        return res.status(401).json({error: "Token is Required"});
    }
    try{
        const userId = jwt.verify(token, process.env.SECRET);
        req.userId = userId.id;
        next();
    }catch(error){
        console.log(error.message);
        res.status(401).json({error: error.message});
    }
}

module.exports = {isAuth}