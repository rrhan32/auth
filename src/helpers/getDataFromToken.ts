import { NextRequest } from "next/server";
import  jwt  from "jsonwebtoken";

export const getDataFromToken=(request:NextRequest)=>{
    try {
        const token=request.cookies.get("token")?.value||"";
        const decodedToken:any=jwt.verify(token,process.env.SECRET_KEY!);
        return decodedToken.id;
        
    } catch (e:any) {
        throw new Error("Invalid or expired token"); 
    }

}