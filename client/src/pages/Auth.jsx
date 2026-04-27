import React from "react";
import { BsRobot } from "react-icons/bs";

function Auth() {
  return (
    <div className="w-full min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20">
      <div className="W-full max-w-md p-8 rounded-3xl bg-white shadow-2xl border border-gray-200">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className=" bg-black text-white p-2 rounded-lg">
             <BsRobot size={18}/>
          </div>
          <h2 className="font-semibold text-lg">InterView.AI</h2>
        </div>
        
        <h1 className= 'text-2x1 md:text-3xl font-semibold text-center leading-snug mb-4'>
            Continue with 
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2">

            </span>
        </h1>
      </div>
    </div>
  );
}

export default Auth;
