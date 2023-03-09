import React from 'react';

function Navbar() {
  return (
    <div className="w-full h-20 pl-[15px] bg-black flex justify-between align-center items-center">
      <h1 className="text-white font-semibold text-2xl">HDM</h1>
      <div className="flex justify-end">
        <button className="bg-slate-300 p-3 mr-3 ">Log In</button>
        <button className="bg-slate-300 p-3 mr-3">Register</button>
      </div>
    </div>
  );
}

export default Navbar;
