import { connectDB } from "@/dbConfig/dbConfig";
connectDB();


import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: "Logout successful", success: true },
      { status: 200 }
    );
    response.cookies.set("token", "", { 
        httpOnly: true, 
        expires: new Date(0) 
    }); // Clear the token by setting it to an empty string and expiring it
    return response;
  } catch (error: any) {
    console.error("Error logging out:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
