import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"
export const getDataFromToken = async(request: NextRequest) =>{
    try {        
        const token = request.cookies.get("jwttoken")?.value || undefined;
        if(!token) return NextResponse.json({suceess:false,message:"You are not authenticated"},{status:401});
        const email = await jwt.verify(token,process.env.JSON_SECRET as string)
        return email;
    } catch (error) {
        console.log(error)
        return NextResponse.redirect("/login")
    }
}