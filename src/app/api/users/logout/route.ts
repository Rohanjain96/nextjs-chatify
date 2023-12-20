import { NextResponse } from "next/server"

export const DELETE = () => {
    const response = NextResponse.json({success:true,message:"User logged out successfully"})
    response.cookies.set("jwttoken","",{expires:new Date(0)})
    return response
}