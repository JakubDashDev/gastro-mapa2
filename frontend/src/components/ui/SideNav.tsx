import React, { Fragment, useState } from "react";
import RestaurantListComponent from "./RestaurantListComponent";
import Search from "../features/Search";
import SortDropdown from "../features/SortDropdown";
import FilterButton from "../features/FilterButton";
import useWindowDimensions from "../../hooks/useWindoDimensions";
import { MdMenuOpen } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { RestaurantType } from "../../redux/restaurantsSlice";

type SideNavProps = {
  data: RestaurantType[];
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

function SideNav({ data, darkMode, setDarkMode }: SideNavProps) {
  const { width } = useWindowDimensions();

  if (width >= 1280) return <DesktopSideNav data={data} darkMode={darkMode} setDarkMode={setDarkMode} />;
  if (width < 1280) return <MobileSideNav data={data} darkMode={darkMode} setDarkMode={setDarkMode} />;
}

export default SideNav;

function DesktopSideNav({ data, darkMode, setDarkMode }: SideNavProps) {
  return (
    <div className="w-[390px] flex flex-col gap-3 bg-white dark:bg-darkBg h-screen overflow-x-auto relative text-gray-600 dark:text-darkText">
      <h1 className="text-center text-lg font-extrabold my-5 col-span-2">Gastro Mapa</h1>

      <div className="container mx-auto px-4 ">
        <Search />
      </div>
      <div className="container mx-auto px-4  flex justify-between items-center">
        <SortDropdown />
        <FilterButton />
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col flex-grow text-gray-400 dark:text-gray-500 text-3xl font-bold px-4 justify-center ">
          <span>Nie ma restauracji o podanych kryteriach :(</span>
        </div>
      ) : (
        data.map((restaurant: RestaurantType) => {
          return <RestaurantListComponent key={restaurant._id} restaurant={restaurant} />;
        })
      )}

      <div className="p-4 bg-white dark:bg-darkBg w-full border-t border-black/10 dark:border-white/10">
        <DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
}

function MobileSideNav({ data, darkMode, setDarkMode }: SideNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const transition = useTransition(isOpen, {
    from: { transform: "translateX(-100%)" },
    enter: { transform: "translateX(0%)" },
    leave: { transform: "translateX(-100%)" },
  });

  const backdropAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
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
      {transition(
        (styles, item) =>
          item && (
            <Fragment>
              <animated.nav
                style={styles}
                className="w-screen sm:w-[390px] h-screen absolute top-0 left-0 bg-white dark:bg-darkBg text-gray-600 dark:text-darkText z-30"
              >
                <div className="grid items-center grid-rows-1 grid-cols-4 container mx-auto px-4">
                  <button type="button" className="text-lg" onClick={() => setIsOpen((current) => !current)}>
                    <FaArrowLeft />
                  </button>
                  <h1 className="text-center text-lg font-extrabold my-5 col-span-2">Gastro Mapa</h1>
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
                      <RestaurantListComponent key={restaurant._id} restaurant={restaurant} handleClose={setIsOpen} />
                    );
                  })}
                </div>
                <div className="mt-auto p-4 bg-white dark:bg-darkBg w-full border-t border-black/20 dark:border-white/20">
                  <DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} />
                </div>
              </animated.nav>
              <animated.div
                style={backdropAnimation}
                className="absolute top-0 left-0 w-screen h-screen bg-black/30 z-20 "
                onClick={() => setIsOpen((current) => !current)}
              />
            </Fragment>
          )
      )}
    </Fragment>
  );
}

type DarkModeButtonProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

function DarkModeButton({ darkMode, setDarkMode }: DarkModeButtonProps) {
  const toggle = () => {
    setDarkMode((current) => !current);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };

  return (
    <button className={`toggle-btn ${darkMode ? "toggled" : undefined}`} onClick={toggle}>
      <div className="thumb"></div>
      {darkMode ? (
        <span className="absolute left-1 text-xs bottom-[50%] translate-y-[50%] text-white">Dark</span>
      ) : (
        <span className="absolute right-1 text-xs bottom-[50%] translate-y-[50%] text-black">Light</span>
      )}
    </button>
  );
}
