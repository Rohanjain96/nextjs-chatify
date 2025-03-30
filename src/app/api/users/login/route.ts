import { connectDb } from "@/app/db/db";
import { User } from "@/app/schemas/user";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
  try {
    connectDb();
    const { email, password } = await request.json();
    const user = await User.findOne({ email }).exec();
    const matched = await user?.comparePassword(password);
    if (!user || !matched) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials",
        },
        { status: 401 }
      );
    }

    const token = jwt.sign(email, process.env.JSON_SECRET as string);

    const response = NextResponse.json({
      success: true,
      message: "User loggedin successfully",
      response: {
        name: user.name,
        phoneNumber: user.phoneNumber,
        profilePic: user.profilePic,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
      },
    });

    response.cookies.set("jwttoken", token, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 2592000000),
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Some error occured" },
      { status: 500 }
    );
  }
};
