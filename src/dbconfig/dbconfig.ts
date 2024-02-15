import mongoose from "mongoose";
export async function connect(){   //whenever interacting with the database , use async functions
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection=mongoose.connection;

        connection.on('connected',()=>{
            console.log("Connection Successfull");
        })
        connection.on('error',()=>{
            console.log("Database connection error");
            process.exit();

        })
    }
    catch(e){
        console.log('error', e);

    }
}
