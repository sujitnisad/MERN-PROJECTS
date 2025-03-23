
import userModel from '../model/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import transporter from '../config/nodemailer.js'

export const userRegister = async(req,res)=>{
    const {name, email,password} = req.body;
       if(!name || !email || !password){
        return res.json({success:false,message:"missing details"});
       }
    try{
        
        const alreadyExist = await userModel.findOne({email});
        if(alreadyExist){
            return res.json({success:false,message:"User Already Exists"});
           }

        const hashedPassword = await bcrypt.hash(password,10)
         const user = new userModel({name,email,password:hashedPassword})    
        await user.save();

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{
            expiresIn:'7d'
        })

       res.cookie('token', token,{
        httpOnly:true,
        secure: process.env.NODE_ENV ==='production',
        sameSite: process.env.NODE_ENV ==='production'?'none':'strict',
        maxAge:7*24*60*60*1000
       })

        const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:`welcome ${name} to our website`,
            text:`Hello welcome to our website keep browsing you email is ${email}`

        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Error:', error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          })

       res.json({success:true})
    }
    catch(e){
        res.json({success:false,message:e.message});
    }

}

export const userLogin =async (req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        res.json({success:false,message:"missing details"});
    }

   try{
     
    const user = await userModel.findOne({email})
     
    if(!user){
        res.json({success:false,message:"Invalid Email"})
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        res.json({
            success:false,message:"Wrong Password"
        })
    }

    const token = await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})

      res.cookie('token',token,{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production'?'none':'strict',
        maxAge: 7*24*60*60*1000
      })

      return res.json({success:true})
   }
   catch(e){
    res.json({success:false,message:e.message})
   }

}


export const userLogout = async(req,res)=>{
    try{

        res.clearCookie({
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production'?'none':'strict'
        })

        return res.json({success:true,message:"successfully logout"});
    }
    catch(e)
    {
        res.json({success:false,message:e.message})
    }
}

export const sendVerifyOtp = async(req,res)=>{

    const {userId} = req.body;
    const user = await userModel.findById(userId);
      if(user.isAccountVerified){
          return res.json({success:false,message:"Account Already verified"});
      }
try{
   
  
      const otp = String(Math.floor(100000+Math.random() * 900000));
       user.verifyOtp = otp;
      const expiresIn = Date.now() + 24*60*60*1000;
      user.verifyOtpExpireAt = expiresIn;

      const mailOptions = {
        from:process.env.SENDER_EMAIL,
        to:user.email,
        subject:"Verification OTP",
        text:`Your Account verification OTP is ${otp}..... it will expire in 24 hours`
      }

     transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error:', error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })

      await user.save();
   res.json({success:true})

}
catch(e){
    return res.json({success:false,message:e.message})
}
}


export const verifyEmail = async(req,res)=>{

    const {userId,otp}=req.body;
 
     if(!userId || !otp){
        return res.json({success:true,message:'missing details'})
     }

     try{

        const user = await userModel.findById(userId);

        if(!user){
            return res.json({success:false,message:'User not found'})
        }

        if(user.verifyOtp === '' || user.verifyOtp !== otp){
            return res.json({success:false,message:'Invalid OTP'})
        }

        if(user.verifyOtpExpireAt < Date.now()){
            return res.json({success:false,message:"OTP Expired"})
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt=0;

        await user.save();

        res.json({success:true})


     }
     catch(e){
        return res.json({success:false,message:e.message})
     }



}

export const isAuthenticated = async (req,res)=>{
try{
    return res.json({success:true,message:"User is Authenticated"})
}
catch(e){
    return res.json({success:false,message:e.message})

}
}

export const sendResetOtp = async (req,res)=>{
    
    const {email} = req.body;
    if(!email){
        return res.json({success:false,message:"Email is required"});
    }

    try{

        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User Email not present"});
        }

        const otp = String(Math.floor(100000+Math.random()*900000));

     user.resetOtp = otp;

     user.resetOtpExpireAt = Date.now()+15*60*1000;

     await user.save();
        const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:"Password Reset OTP",
            text:`Your Password reset OTP is: ${otp}, Please reset this within 15 mins`

        }

       await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Error:', error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          })

       res.json({success:true})


    }
    catch(e){
        return res.json({success:false,message:e.message});
    }



}

export const resetPassword = async(req,res)=>{

    const {email,otp,newPassword} = req.body;
    if(!email||!otp||!newPassword){
        return res.json({success:false,message:"Missing Data"});
    }

    try{
     
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User Email not found"});
        }

        if(user.resetOtp === '' || user.resetOtp != otp ){
            return res.json({success:false,message:"Invalid OTP"});
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success:false,message:"OTP Expired"});
        }


        const hashedPassword = await bcrypt.hash(newPassword,10);
        user.password = hashedPassword;

        user.resetOtp="";
        user.resetOtpExpireAt=0;

        await user.save();


        return res.json({success:true,message:"Password Reset successful"});


    }
    catch(e){
        return res.json({success:false,message:e.message});
    }


}