import { connectDB } from "@/dbConfig/dbConfig";
connectDB();

import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(request: NextRequest) {
  try {
    //extract data from token
    const userid = await getDataFromToken(request);

    const user = await User.findById({ _id: userid }).select("-password -__v -verifyToken -verifyTokenExpiry");

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json(
      {
        message: "Successfully fetch user data",
        data: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error logging in:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
