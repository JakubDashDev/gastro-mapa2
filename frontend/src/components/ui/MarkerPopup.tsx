import React from "react";
import { FaYoutube } from "react-icons/fa";
import { BiSolidNavigation } from "react-icons/bi";
import { Popup } from "react-map-gl";
import Rating from "./Rating";
import { RestaurantType } from "../../redux/restaurantsSlice";

type MarkerPopupProps = {
  popupInfo: RestaurantType | null;
  setPopupInfo: React.Dispatch<React.SetStateAction<RestaurantType | null>>;
};

function MarkerPopup({ popupInfo, setPopupInfo }: MarkerPopupProps) {
  return (
    <Popup
      offset={25}
      longitude={Number(popupInfo?.address.lngLat[0])}
      latitude={Number(popupInfo?.address.lngLat[1])}
      onClose={() => setPopupInfo(null)}
      closeButton
    >
      <div className="flex flex-col gap-2 font-sans">
        <iframe
          id="ytplayer"
          width="360"
          height="203"
          src={popupInfo?.youtubeEmbed}
          className="rounded-lg"
        />
        <div className="flex flex-col pb-1">
          <span className="text-lg">{popupInfo?.name}</span>
          {popupInfo?.category.map((type: string) => (
            <span key={type} className="text-sm capitalize text-gray-500">
              {type}
            </span>
          ))}
        </div>
        <span className="border-b border-black/15 pb-1">
          {popupInfo?.address.street}, {popupInfo?.address.zipCode}{" "}
          {popupInfo?.address.city}{" "}
        </span>

        <div className="flex justify-between items-center gap-5 pt-1">
          <span className="pb-1">
            <Rating rating={popupInfo?.rating || 0} isText />
          </span>
          <div className="flex items-center gap-3">
            <button className="flex justify-center items-center border border-red-500  p-2 text-xl text-red-500  rounded-full transition-all hover:scale-105 ">
              <FaYoutube />
            </button>
            <button className="flex justify-center items-center border border-gray-500 text-gray-500 p-2 text-xl rounded-full transition-all hover:scale-105">
              <BiSolidNavigation />
            </button>
          </div>
        </div>
      </div>
    </Popup>
  );
}

export default MarkerPopup;
