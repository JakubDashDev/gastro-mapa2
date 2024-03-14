import React, { Fragment, useState, useTransition } from 'react';
import RestaurantListComponent from './RestaurantListComponent';
import Search from '../features/Search';
import SortDropdown from '../features/SortDropdown';
import FilterButton from '../features/FilterButton';
import useWindowDimensions from '../../hooks/useWindoDimensions';
import { MdMenuOpen } from 'react-icons/md';
import { FaArrowLeft } from 'react-icons/fa';
import { current } from '@reduxjs/toolkit';
import { MdOutlineLightMode, MdDarkMode } from 'react-icons/md';
import { useSpring, animated } from '@react-spring/web';

function SideNav({ data, darkMode, setDarkMode }) {
  const { width } = useWindowDimensions();

  if (width >= 1280)
    return (
      <DesktopSideNav
        data={data}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    );
  if (width < 1280)
    return (
      <MobileSideNav
        data={data}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    );
}

export default SideNav;

function DesktopSideNav({ data, darkMode, setDarkMode }) {
  return (
    <div className="w-[390px] bg-white dark:bg-darkBg h-screen overflow-y-auto relative text-gray-600 dark:text-darkText">
      <h1 className="text-center text-lg font-extrabold my-5 col-span-2">
        Gastro Mapa
      </h1>

      <div className="container mx-auto px-4 my-6">
        <Search />
      </div>
      <div className="container mx-auto px-4 my-6 flex justify-between items-center">
        <SortDropdown />
        <FilterButton />
      </div>

      <div>
        {data.map((restaurant) => {
          return (
            <RestaurantListComponent
              key={restaurant._id}
              restaurant={restaurant}
            />
          );
        })}
      </div>

      <div className="absolute bottom-0 p-4 bg-white dark:bg-darkBg w-full border-t border-black/10 dark:border-white/10">
        <DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
}

function MobileSideNav({ data, darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  const bg = useSpring({
    left: isOpen ? '0' : '-100%',
  });

  const nav = useSpring({
    left: isOpen ? '0' : '-100%',
    delay: 300,
  });

  return (
    <Fragment>
      <button
        type="button"
        className="absolute top-5 left-5 bg-white border-2 border-[#d3d3d3] p-2 rounded-full shadow-xl shadow-black/60 z-10 text-2xl"
        onClick={() => setIsOpen((current) => !current)}
      >
        <MdMenuOpen />
      </button>

      <animated.div
        style={bg}
        className="absolute top-0 left-0 w-screen h-screen bg-black/70 dark:bg-black/40 z-20"
      >
        <animated.nav
          style={nav}
          className="w-screen sm:w-[390px] h-screen relative bg-white dark:bg-darkBg text-gray-600 dark:text-darkText"
        >
          <div className="grid items-center grid-rows-1 grid-cols-4 container mx-auto px-4">
            <button
              type="button"
              className="text-lg"
              onClick={() => setIsOpen((current) => !current)}
            >
              <FaArrowLeft />
            </button>
            <h1 className="text-center text-lg font-extrabold my-5 col-span-2">
              Gastro Mapa
            </h1>
          </div>

          <div className="container mx-auto px-4 my-6">
            <Search />
          </div>
          <div className="container mx-auto px-4 my-6 flex justify-between items-center">
            <SortDropdown />
            <FilterButton />
          </div>

          <div>
            {data.map((restaurant) => {
              return (
                <RestaurantListComponent
                  key={restaurant._id}
                  restaurant={restaurant}
                  setIsOpen={setIsOpen}
                />
              );
            })}
          </div>
          <div className="absolute bottom-0 p-4 bg-white dark:bg-darkBg w-full border-t border-black/20 dark:border-white/20">
            <DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </animated.nav>
      </animated.div>
    </Fragment>
  );
}

function DarkModeButton({ darkMode, setDarkMode }) {
  const toggle = () => {
    setDarkMode((current) => !current);
    localStorage.setItem('darkMode', !darkMode);
  };

  return (
    <button
      className={`toggle-btn ${darkMode ? 'toggled' : undefined}`}
      onClick={toggle}
    >
      <div className="thumb"></div>
      {darkMode ? (
        <span className="absolute left-1 text-xs bottom-[50%] translate-y-[50%] text-white">
          Dark
        </span>
      ) : (
        <span className="absolute right-1 text-xs bottom-[50%] translate-y-[50%] text-black">
          Light
        </span>
      )}
    </button>
  );
}
