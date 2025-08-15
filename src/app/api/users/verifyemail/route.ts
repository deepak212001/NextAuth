import { connectDB } from "@/dbConfig/dbConfig";
connectDB();

import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); //request me jo json aa rha hai vo body variable me store ho rha hai

    const { token } = body;
    console.log("Email verification data:", body);

    // Check if user exists
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() }, // means 10 min valid hai , aur mail 3 baje gaye hai to 3:10 tak  , to cuurent date se to badi hi hogi
    }).select("-password -verifyToken -verifyTokenExpiry -__v"); // Select isVerified field
    if (!user) {
      return NextResponse.json({ error: "Invaild Token" }, { status: 404 });
    }
    console.log("User found:", user);
    user.isVerified = true;
    user.verifyToken = null; // Clear the token after verification
    user.verifyTokenExpiry = null;
    await user.save();

    return NextResponse.json(
      {
        message: "Email verified successfully",
        success: true,
        user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error verifying email:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
