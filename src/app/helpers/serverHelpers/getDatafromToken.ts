import jwt from "jsonwebtoken"
import { NextRequest } from "next/server"
export const getDataFromToken = async (request: NextRequest) => {
    try {
        const token = request.cookies.get("jwttoken")?.value || undefined;
        if (!token) return { success: false, message: "You are not authenticated" }

        const email = await jwt.verify(token, process.env.JSON_SECRET as string)

        return { success: true, email };
    } catch (error) {
        console.log(error)
        return { success: false, message: "Some error occured" }
    }
}