
const jwt=require('jsonwebtoken');
const User =require('../models/userModels');




const Authentication= async (req,res,next)=>{
try{
   
    const token=req.cookies.jwtoken;
    const verifyToken = jwt.verify(token,process.env.JWT_PASS) ;
    const rootuser = await User.findOne({_id:verifyToken._id});

    if(!rootuser){
        throw new Error("user not found")

    }
    req.token=token;
    req.rootuser=rootuser;
    req.rootuserId=rootuser._id;

    next();
     
}catch(err){
   
    res.status(401).send('Unauthorized : Not Token provided')

  

}


}



module.exports= Authentication;