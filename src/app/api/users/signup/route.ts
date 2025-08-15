// nextjs edge pe chalta hai means jo mere nearest computing resources hain unpe ye code chalega  , ek standard server pe nhi chalta hai
// to yaha pe jab bhi db pe kam karna hoga to mujhe edge functions ka istemal karna padega
// means check ki db se connect hu ya nhi
//  to har route me dbconnect ka function chahiye

import { connectDB } from "@/dbConfig/dbConfig";

connectDB();

import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); //request me jo json aa rha hai vo body variable me store ho rha hai
    // nextjs me middleware ki jrur nhi hoti hai

    const { username, email, password } = body;
    console.log("User signup data:", body);
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    console.log("User created:", user);

    // send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: user._id });

    return NextResponse.json(
      {
        message: "User registered successfully",
        succeess: true,
        user,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error signing up user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// yaha pe hi GET POST YE LIKHTE HAI
// link ye hoga -> localhost:3000/api/users/signup
