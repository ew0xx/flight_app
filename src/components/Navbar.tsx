import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="h-20 text-blue-500 p-4 flex items-center justify-between border-b-2 border-b-blue-500 uppercase">
      {/* LOGO */}
      <div className="text-xl">
        <Link href="/">Amadeus Travel To Future</Link>
      </div>
    </div>
  );
};

export default Navbar;
