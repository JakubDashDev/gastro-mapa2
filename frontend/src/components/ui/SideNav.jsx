import React, { Fragment, useState } from 'react';
import RestaurantListComponent from './RestaurantListComponent';
import Search from '../features/Search';
import SortDropdown from '../features/SortDropdown';
import FilterButton from '../features/FilterButton';
import useWindowDimensions from '../../hooks/useWindoDimensions';
import { MdMenuOpen } from 'react-icons/md';
import { FaArrowLeft } from 'react-icons/fa';
import { current } from '@reduxjs/toolkit';

function SideNav({ data }) {
  const { width } = useWindowDimensions();

  if (width >= 1280) return <DesktopSideNav data={data} />;
  if (width < 1280) return <MobileSideNav data={data} />;
}

export default SideNav;

function DesktopSideNav({ data }) {
  return (
    <div className="w-[390px] bg-white h-screen overflow-y-auto">
      <h1 className="text-center text-gray-600 text-lg font-extrabold my-5">
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
    </div>
  );
}

function MobileSideNav({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Fragment>
      <button
        type="button"
        className="absolute top-5 left-5 bg-white border-2 border-[#d3d3d3] p-2 rounded-full shadow-xl shadow-black/60 z-10 text-2xl"
        onClick={() => setIsOpen((current) => !current)}
      >
        <MdMenuOpen />
      </button>
      {isOpen && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-black/70 z-20">
          <nav className="absolute top-0 left-0 h-screen w-screen sm:w-[390px] bg-white">
            <div className="grid items-center grid-rows-1 grid-cols-4 container mx-auto px-4 text-gray-600">
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
                  />
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </Fragment>
  );
}
