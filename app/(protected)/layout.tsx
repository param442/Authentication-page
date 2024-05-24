import React from "react";
import Navbar from "./_components/Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-900 h-screen w-full text-slate-300 flex items-center justify-center flex-col">
      <Navbar />
      {children}
    </div>
  );
};

export default layout;
