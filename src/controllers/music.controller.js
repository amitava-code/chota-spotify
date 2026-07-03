const musicModel = require("../models/music.model")
const albumModel = require("../models/album.model")
const jwt = require("jsonwebtoken")
const { uploadFile } = require("../services/storage.service")



async function createMusic(req, res){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Unauthorized no token"
        })
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        console.log(decoded)

        if(decoded.role !== "artist" ){
            return res.status(403).json({messgae: "Forbidden Error : You don't have access to create music"})
        }

  

    const {title} = req.body
    const file = req.file

    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: decoded.id
    })

    res.status(201).json({
        message: "Music created Successfully",
        music:{
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist
        }
    })

    }catch(err){

        console.log(err)


        return res.status(401).json ({ messgae :" Unauthorized total err"})
    }



}


async function createAlbum(req, res){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Unauthorized no token"
        })
    }

    try{

        const decoded = await jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role !=="artist"){
            return res.satus(403).json({
                message:"Forbidden ERROR : You don't have access, cause you are not the artist bitch !!!"
            })
        }

        const { title, musicIds }= req.body

        const album = await albumModel.create({
            title,
            artist: decode.id,
            music: musicIds
        })

        res.status(201).json({
            message:"Album created successfully",
            album:{
                id: album._id,
                title: album.title,
                artist: album.artis,
                music: album.music
            }
        })

    }catch(err){
        console.log(err)

        return res.status(401).json({
            message:("Unauthorized : total err", err)
        })
    }
}


module.exports={ createMusic, createAlbum}