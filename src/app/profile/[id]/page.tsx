// ye dynamic routing hai
//  means ki hum URL mein [id] ke jagah kisi bhi user ka ID daal sakte hain
//  aur fir us user ki profile dekh sakte hain

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const User = ({ params }: any) => {
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screenpy-2">
      <h1>User Profile</h1>
      <hr />
      <div className="flex flex-col items-center">
        <h2>User ID: {params.id}</h2>
      </div>
    </div>
  );
};

export default User;
