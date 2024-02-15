import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import  jwt from 'jsonwebtoken';
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(request.body);
    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        { error: "No such user found" },
        { status: 400 }
      );
    console.log("user exists");
    //check for password
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
    {
      console.log("invalid password");
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }
      console.log(user);
    const tokenData= {
        email : user.email , 
        id : user._id,
        password:user.password,
    }
    const token=await jwt.sign(tokenData,process.env.SECRET_KEY!,{expiresIn:"1h"},);
    const response=NextResponse.json({
         message: "login succcess",
         success: "true",
    })
    response.cookies.set('token',token,{
        httpOnly:true,  
       //  path:'/',
    });
    return response;
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
