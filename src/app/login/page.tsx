"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Signup response:", response.data);
      toast.success("Signup successful!");
      router.push("/profile"); //ye redirect on login page
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message);
      setMessage(error.response.data.error);
    } finally {
      setLoading(false);
      setUser({
        email: "",
        password: "",
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 5000);
  }, [message]);

  useEffect(() => {
    const isUserValid =  user.email && user.password;
    setBtnDisabled(!isUserValid);
    //  aur
    // if(user.email.length>0 && user.password.length>0 && user.username.length>0) {
    //   setBtnDisabled(false);
    // }
    // else {
    //   setBtnDisabled(true);
    // }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Creating your account..." : "Create an account"}</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black  bg-amber-50"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter your email"
        disabled={loading}
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-amber-50"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter your password"
        disabled={loading}
      />
      <button
        onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-amber-50"
        disabled={btnDisabled || loading}
      >
        {loading ? "Login ...." : "Login"}
      </button>
      {message && (
        <div className="text-red-500 mb-4">
          <p>{message}</p>
        </div>
      )}
      <Link href="/signup">Create an  new account</Link>
    </div>
  );
};

export default LoginPage;
