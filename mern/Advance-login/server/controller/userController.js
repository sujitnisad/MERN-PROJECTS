import userModel from "../model/userModel.js";

export const getUserData = async(req,res)=>{

    const {userId} = req.body;

    if(!userId){
        return res.json({success:false,message:"User Required"});
    }

    try{
       const user = await userModel.findById(userId);
       if(!user){
        return res.json({success:false,message:"User Is Not Found"});
       }

       res.json({
        success:true,
        userData:{
            name:user.name,
            active:user.isAccountVerified,
            email:user.email
        }
       })
    }
    catch(e){
        return res.json({success:false,message:e.message});
    }

}