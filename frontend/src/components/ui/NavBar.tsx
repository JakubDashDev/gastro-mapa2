import React from "react";
import { FaBars, FaUser, FaBell } from "react-icons/fa6";
import Breadcrumbs from "./Breadcrumbs";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

type NavBarProps = {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

function NavBar({ setShowSidebar }: NavBarProps) {
  const { userInfo } = useAppSelector((state) => state.auth);
  return (
    <nav className="bg-neutral-50 border-b-2 border-gray-300  w-full py-5 h-[100px]">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className=" flex items-center gap-5 lg:gap-10">
          <button className="block lg:hidden" onClick={() => setShowSidebar((current) => !current)}>
            <FaBars />
          </button>
          <Breadcrumbs />
        </div>
        <div className="flex gap-5 text-gray-600 text-lg">
          <button>
            <FaBell />
          </button>
          <Link to="/dashboard/account" className="flex items-center gap-1">
            <FaUser />
            <span className="hidden sm:block text-base">{userInfo?.email}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
