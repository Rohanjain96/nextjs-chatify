import { connectDb } from "@/app/db/db";
import { User } from "@/app/schemas/user";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export const POST = async (request: NextRequest) => {
  try {
    connectDb();

    const { phoneNumber, email, password, name, profilePic, dateOfBirth } =
      await request.json();
    if (!phoneNumber || !email || !password || !name) {
      return NextResponse.json({ success: false, message: "Bad request" }, { status: 400 });
    }

    const userExists = await User.findOne({ phoneNumber, email });
    if (userExists) {
      return NextResponse.json({
        success: false,
        message: "User already exists",
      }, { status: 409 });
    }

    const token = jwt.sign(email, process.env.JSON_SECRET as string)

    const body = {
      phoneNumber,
      email,
      password,
      name,
      profilePic,
      dateOfBirth,
    };

    const user = await User.create(body);

    if (user) {
      const response = NextResponse.json({
        success: true,
        message: "User created successfully",
        response: {
          name: user.name,
          phoneNumber: user.phoneNumber,
          profilePic: user.profilePic,
          email: user.email,
          dateOfBirth: user.dateOfBirth,
        },
      }, { status: 201 });

      response.cookies.set('jwttoken', token, {
        httpOnly: true, secure: false, expires: new Date(Date
          .now() + 2592000000),
      })
      return response
    } else {
      return NextResponse.json({
        success: false,
        message: "User not created",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Some error occured" },
      { status: 500 },
    );
  }
};
