import mongoose from 'mongoose';

const connectDB = async()=>{

    mongoose.connection.on('connected',()=>{
        console.log("Mongo Connected Successfully");
    })
   
    await mongoose.connect(process.env.MONGOURL);
    
    

}

export default connectDB;