import { connect } from "@/dbconfig/dbconfig";
import {NextResponse,NextRequest} from 'next/server';
import User from "@/models/userModel";

connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {token}=reqBody;
        console.log(token);

        const user=await User.findOne({verifyToken:token});
        if (!user)
        {
            return NextResponse.json({error:"Invalid Token"},{status:400});
        }
        // console.log(user);
        console.log("email checked and verified")
        user.isVerfied=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        await user.save();

        return NextResponse.json({
            message:"Email verified Successfully",
            success:true,
        })
        
    } catch (e:any) {
        console.log('error occured in verification');
        return NextResponse.json({error: e.message},{status:500});
        
    }
}

