import { connectDb } from "@/app/db/db";
import { getDataFromToken } from "@/app/helpers/serverHelpers/getDatafromToken";
import { User } from "@/app/schemas/user";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    connectDb();

    const { success, email, message } = await getDataFromToken(request);
    if (!success)
      return NextResponse.json({ success: false, message }, { status: 401 });

    const user = await User.findOne({ email }).select("-password");

    return NextResponse.json({
      success: true,
      message: "Successfully get user",
      user,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Some error occured" },
      { status: 500 }
    );
  }
};
