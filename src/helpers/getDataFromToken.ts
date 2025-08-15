import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = async (request: NextRequest) => {
  const token = request.cookies.get("token")?.value || ""; // means token key ki value lo
  if (!token) {
    throw new Error("No token found");
  }
  try {
    const decoded: any = jwt.verify(token, process.env.TOEKN_SECRET!);
    // decoded me user ki information hogi
    // jo ham token bante hai use time jo information dali hoti hai
    if (!decoded) throw new Error("Failed to decode token");
    return decoded.id;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
