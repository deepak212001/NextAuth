"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProfilePage = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("nothing");

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log("User details:", response.data.data);
      setUserId(response.data.data._id);
    } catch (error) {
      console.error("Error fetching user details:", error);
      toast.error("Failed to fetch user details.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully.");
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out.");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screenpy-2">
      <h1>Profile</h1>
      <hr />
      <div className="flex flex-col items-center">
        
        <h2>{userId==="nothing" ? "Nothing": <Link href={`/profile/${userId}`}>{userId}</Link>}</h2>

        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
