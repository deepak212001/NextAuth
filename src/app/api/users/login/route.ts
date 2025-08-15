import { connectDB } from "@/dbConfig/dbConfig";
connectDB();

import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log("User login data:", user);
    // Check password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const tokenData = {
      id: user._id,
    };
    const token = jwt.sign(tokenData, process.env.TOEKN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "Login successful", success: true },
      { status: 200 }
    );

    response.cookies.set("token", token, {
        httpOnly:true // means use can see the token but can't change it
    });
    return response;
  } catch (error: any) {
    console.error("Error logging in:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
