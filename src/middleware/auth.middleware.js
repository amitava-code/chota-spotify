const jwt = require("jsonwebtoken")


async function authArtist(req, res, next){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Unauthorize: Token is missing "
        })
    }

    try{

        const decoded = await jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role !== "artist"){
            return res.status(403).json({
                messgae:"You don't have the permission to Access"
            })
        }

        req.user = decoded

        next()

    }catch(err){
        console.log(err)

        return res.status(401).json({
            message:"Unauthorize: Total err"
        })
    }
}


module.exports={ authArtist }