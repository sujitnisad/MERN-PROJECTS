import jwt from 'jsonwebtoken'

const userAuth = async (req,res,next)=>{

    const {token} = req.cookies;
    
    if(!token){
        return res.json({success:false,message:"User not Authorised or Logged in"})
    }

    try{

        const tokenDecoded = jwt.verify(token,process.env.JWT_SECRET);

        if(tokenDecoded.id){
            req.body.userId = tokenDecoded.id;
        }
        else{
            return res.json({success:false,message:'not authorized send again'});
        }

        next();
        
    }
    catch(e){
        return res.json({success:false,message:e.message})
    }

}

export default userAuth;