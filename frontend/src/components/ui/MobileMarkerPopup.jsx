import React from 'react';
import { FaYoutube } from 'react-icons/fa';
import Rating from './Rating';
import { BiSolidNavigation } from 'react-icons/bi';
import useWindowDimensions from '../../hooks/useWindoDimensions';
import { IoIosClose } from 'react-icons/io';

function MobileMarkerPopup({ popupInfo, setPopupInfo }) {
  
  const handleClose = (event) => {
    if (event.target === event.currentTarget) {
      setPopupInfo(null);
    }
  };

  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen z-10 bg-black/50"
      onClick={handleClose}
    >
      <div className="flex flex-col gap-2 px-4 py-4 absolute bottom-0 w-screen bg-white rounded-t-xl border-t-2 z-10">
        <button
          type="button"
          className="absolute top-1 right-1 text-2xl"
          onClick={() => setPopupInfo(null)}
        >
          <IoIosClose />
        </button>
        <div className="flex justify-center">
          <iframe
            id="ytplayer"
            type="text/html"
            width={300}
            height={190}
            src={popupInfo.youtubeRef.link}
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col border-b border-black/5 pb-1">
          <span className="text-lg">{popupInfo.name}</span>
          {popupInfo.type.map((type) => (
            <span key={type} className="text-sm capitalize text-gray-500">
              {type}
            </span>
          ))}
        </div>
        <span className="border-b border-black/5 pb-1">
          {popupInfo.address.street} {popupInfo.address.houseNumber},{' '}
          {popupInfo.address.zipCode} {popupInfo.address.city}{' '}
        </span>
        <div className="flex justify-between items-center gap-5 pt-1">
          <span className="pb-1">
            <Rating rating={popupInfo.rating} isText />
          </span>
          <div className="flex items-center gap-3">
            <button className="flex justify-center items-center border border-red-500 p-2 text-xl text-red-500  rounded-full  ">
              <FaYoutube />
            </button>
            <button className="flex justify-center items-center border border-gray-500 text-gray-500 p-2 text-xl rounded-full ">
              <BiSolidNavigation />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMarkerPopup;
