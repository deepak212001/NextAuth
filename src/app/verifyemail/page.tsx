"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const verifyEmailPage = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verify, setVerify] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      setVerify(true);
      console.log("response hai ", response);
      toast.success("Email verified successfully!");
    } catch (error: any) {
      setError(true);
      toast.error("Email verification failed.");
      console.log("error hai ", error);
      console.log("error hai ", error.response.data.error);
    }
  };

  useEffect(() => {
    // http://localhost:3000/verify?token=$2b$10$7spbmweHccSwY4LeIs9/2.gMuMizv0fgA96TxO9x0gB8iDPwen6pa
    // ye url hai to = se split hai to 2 index 0 index pe link  and 1 index pe token hai
    const urlToken = window.location.search.split("=")[1];
    console.log("urlToken:", urlToken);
    if (urlToken) {
      setToken(urlToken);
    }
    
      console.log("Verifying email with token:", token);
    //   ye js se kiya tha ab nextjs se
    //  query url ka part hai
    //  http://localhost:3000/verify ye to path hai par eke bad query hai to ki ? se start hoti hai
    // token=$2b$10$7spbmweHccSwY4LeIs9/2.gMuMizv0fgA96TxO9x0gB8iDPwen6pa ye hai wuery
    // const { query } = router;
    // const urlToken = query.token;
  }, []);

  useEffect(() => {
    
    console.log("Verifying email with token: in t ", token);  
    if (token.length > 0) {
      verifyUserEmail();
    }
    
  }, [token]); // mens koi vaise aaye to check karna hai
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-10">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {verify
          ? "Email verified successfully!"
          : error
          ? "Email verification failed."
          : "Verifying email..."}
      </h2>
      <button
        onClick={() => router.push("/login")}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-amber-50"
      >
        Go to Login
      </button>
    </div>
  );
};

export default verifyEmailPage;
// vaise best practice hoti hai hi btn pe click kare to to hi email verification ka process shuru ho
