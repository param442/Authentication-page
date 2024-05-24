import React from "react";

const Authlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" h-full flex dark-bg items-center justify-center">
      {children}
    </div>
  );
};

export default Authlayout;
