module.exports = errorHandler

// errorhandler index.js in çalıştırılmasıyla herhangi bir hata alındığında ekranda dönmesini sağlıyor. 


function errorHandler(err,req,res,next){

    const token = req.body.token;

    if(!token){
        res.send("no token")
    }

    if(typeof(err)==='string'){
        return res.status(400).json({
            message:err
        })
    }

    if(typeof(err.name)==='UnauthorizedError'){
        return res.status(401).json({
            message:'Invalid token'
        })
    }

    return res.status(500).json({
        message:err.message
    })


}