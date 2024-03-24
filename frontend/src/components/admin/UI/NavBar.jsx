import React from 'react';
import { FaBars, FaUser, FaBell } from 'react-icons/fa6';
import Breadcrumbs from './Breadcrumbs';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavBar({ setShowSidebar }) {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <nav className="container mx-auto px-4 flex items-center justify-between w-full py-5 h-[100px]">
      <div className="flex items-center gap-5 lg:gap-10">
        <button
          className="block lg:hidden"
          onClick={() => setShowSidebar((current) => !current)}
        >
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
          <span className="hidden sm:block text-base">{userInfo.email}</span>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
