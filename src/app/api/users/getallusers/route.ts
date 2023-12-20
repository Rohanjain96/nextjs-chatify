import { connectDb } from "@/app/db/db";
import { getDataFromToken } from "@/app/helpers/serverHelpers/getDatafromToken";
import { User } from "@/app/schemas/user";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        connectDb()

        let keyword = {};
        keyword = typeof request.nextUrl.searchParams.get("search") === "string" ?
            { name: { $regex: "^" + request.nextUrl.searchParams.get("search"), $options: "i" } } :
            { phonenumber: request.nextUrl.searchParams.get("search") }

        const userEmail = await getDataFromToken(request);
        const users = await User.find(keyword).find({ email: { $ne: userEmail } }).select("-password");

        return NextResponse.json({ success: true, message: "Successfully fetched all users", users })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Some error occured" }, { status: 500 })
    }
}