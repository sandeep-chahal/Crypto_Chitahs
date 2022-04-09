import React from "react";
import MobileNav from "./mobile-nav";
import DesktopNav from "./desktop-nav";

const Nav = () => {
  return (
    <>
      <div className="block lg:hidden">
        <MobileNav />
      </div>
      <div className="hidden lg:block">
        <DesktopNav />
      </div>
    </>
  );
};

export default Nav;
