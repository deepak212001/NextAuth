import { verify } from "crypto";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgetPasswordToken: String,
  forgetPasswordExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// next js  edge time framework hai , so es ko pta nhi hota hai ki pehle bar ho rha hu ya nahi
// means ki create karna hai ya db me hai to vaha se lena hai 
// to ham check karte hain ki agar user exist karta hai to usay uthao warna naya banao

const User = mongoose.models.users || mongoose.model("users", userSchema);

// model("User", userSchema); bhi hai hai par par  users likh hai to same rhe ho sahi hai(symmetry rhe aur code consistency rhe)
export default User;
