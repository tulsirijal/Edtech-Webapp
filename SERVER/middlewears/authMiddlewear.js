const jwt = require('jsonwebtoken');
exports.auth = async(req,res,next)=>{
    try {
        const token = req.header("Authorization").replace("Bearer ", "") || req.cookies.token || req.body.token;
        if(!token){
            return res.status(403).json({
                success:false,
                message:"token is required"
            })
        }
        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode)
            req.user = decode
        } catch (error) {
            console.log(error.message)
            return res.status(401).json({
                success:false,
                message:"Unable to verify token"
            })
        }
        next()


    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success:false,
            message:"something went wrong while verifying the token"
        })
    }
}

exports.isStudent = async(req,res,next)=>{
    try {
        if(req.user.accountType !=="Student"){
            return res.status(401).json({
                success:false,
                message:"You cannot access  student the page"
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified"
        })
    }
}
exports.isTeacher = async(req,res,next)=>{
    try {
        if(req.user.accountType !=="Teacher"){
            return res.status(401).json({
                success:false,
                message:"You cannot access the teacher page"
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified"
        })
    }
}
exports.isAdmin = async(req,res,next)=>{
    try {
        if(req.user.accountType !=="Admin"){
            return res.status(401).json({
                success:false,
                message:"You cannot access the admin page"
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified"
        })
    }
}