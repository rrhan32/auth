import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect(); //connecting the database with the code

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: "user already exists" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    
    //send verification email
    await sendEmail({email,emailType:"VERIFY",userId:savedUser._id});
    return NextResponse.json({ message: "successfully created the user" });
  } 
  
  catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
