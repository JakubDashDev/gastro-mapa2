import React, { Fragment, useState } from "react";
import RestaurantListComponent from "./RestaurantListComponent";
import Search from "../features/Search";
import SortDropdown from "../features/SortDropdown";
import FiltersContainer from "../features/FiltersContainer";
import useWindowDimensions from "../../hooks/useWindoDimensions";
import { MdMenuOpen } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { RestaurantType } from "../../redux/restaurantsSlice";
import getParams from "../../utils/getUrlParams";

type SideNavProps = {
  data: RestaurantType[];
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

function SideNav({ data, darkMode, setDarkMode }: SideNavProps) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <Container showSidebar={showSidebar} setShowSidebar={setShowSidebar}>
      <div>
        <h1 className="text-center text-xl font-extrabold my-5 col-span-2">Gastro Mapa</h1>
        <button
          type="button"
          className="block lg:hidden text-gray-600 dark:text-white/80 text-xl absolute top-1 right-1 p-2"
          onClick={() => setShowSidebar((current) => !current)}
        >
          <FaTimes />
        </button>
      </div>

      <div className="container mx-auto px-4 ">
        <Search />
      </div>
      <div className="container mx-auto px-4  flex justify-between items-center">
        <SortDropdown />
        <FiltersContainer />
      </div>

      <div id="restaurantListSideNav" className="overflow-y-auto h-full">
        {data.length === 0 ? (
          <div className="flex flex-col h-full text-gray-400 dark:text-gray-500 text-3xl font-bold px-4 justify-center items-center ">
            <span>Nie ma restauracji o podanych kryteriach 💔</span>
          </div>
        ) : (
          data.map((restaurant: RestaurantType) => {
            return (
              <RestaurantListComponent key={restaurant._id} restaurant={restaurant} setShowSidebar={setShowSidebar} />
            );
          })
        )}
      </div>

      <footer className="px-4 py-1 mt-auto bg-white dark:bg-darkBg w-full border-t border-black/10 dark:border-white/10 flex items-center justify-between">
        <DarkModeButton darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="flex flex-col text-gray-500 text-[10px] font-thin ">
          <span>© Jakub Cieślik</span>
          <span>jakub.dev@icloud.com</span>
        </div>
      </footer>
    </Container>
  );
}

export default SideNav;

type ContainerProps = {
  children: React.ReactNode;
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
function Container({ children, showSidebar, setShowSidebar }: ContainerProps) {
  const { width } = useWindowDimensions();
  const { filtersQuery, keywordQuery } = getParams(location);
  const paramsTogheter = { filtersQuery, keywordQuery };

  const transition = useTransition(showSidebar, {
    from: { transform: "translateX(-100%)" },
    enter: { transform: "translateX(0%)" },
    leave: { transform: "translateX(-100%)" },
  });

  const backdropAnimation = useSpring({
    opacity: showSidebar ? 1 : 0,
  });

  if (width < 1024)
    return (
      <Fragment>
        <button
          type="button"
          className="absolute top-5 left-5 bg-white border-2 border-[#d3d3d3] p-2 rounded-full shadow-xl shadow-black/60 z-10 text-2xl"
          onClick={() => setShowSidebar((current) => !current)}
        >
          <MdMenuOpen />
          {Object.values(paramsTogheter).filter((e) => e.length > 0).length > 0 && (
            <span className="absolute -top-2 -right-1 bg-red-500 text-sm w-[20px] rounded-full">
              {Object.values(paramsTogheter).filter((e) => e.length > 0).length}
            </span>
          )}
        </button>
        {transition(
          (styles, item) =>
            item && (
              <Fragment>
                <animated.aside
                  style={styles}
                  className="fixed left-0 h-[calc(100dvh)] w-screen md:w-[420px] z-20 flex flex-col gap-3 bg-white dark:bg-darkBg text-gray-600 dark:text-darkText"
                >
                  {children}
                </animated.aside>
                <animated.div
                  style={backdropAnimation}
                  className="fixed left-0 top-0 w-screen h-[calc(100dvh)] bg-black/20 z-10"
                  onClick={() => setShowSidebar(false)}
                />
              </Fragment>
            )
        )}
      </Fragment>
    );

  return (
    <aside className="w-[420px] flex flex-col gap-3 bg-white dark:bg-darkBg h-[calc(100dvh)] overflow-x-auto relative text-gray-600 dark:text-darkText">
      {children}
    </aside>
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
