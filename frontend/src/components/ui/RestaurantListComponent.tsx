import React from "react";
import img from "../../assets/logo.png";
import Rating from "./Rating";
import { useMap } from "react-map-gl";
import { RestaurantType } from "../../redux/restaurantsSlice";

type RestaurantListComponentProps = {
  restaurant: RestaurantType;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>; //NOTE: close navigation on Restaurant click on Mobile view
};

function RestaurantListComponent({ restaurant, setShowSidebar }: RestaurantListComponentProps) {
  const { name, address, category, rating, geometry } = restaurant;
  const { mapMain } = useMap();

  const handleClick = () => {
    mapMain?.flyTo({
      center: [geometry.coordinates[0], geometry.coordinates[1]],
      zoom: 17,
      duration: 2000,
    });
    setShowSidebar(false);
  };

  return (
    <div
      className="container mx-auto px-4 py-4 flex gap-2 items-center hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors rounded-lg cursor-pointer"
      onClick={handleClick}
    >
      <img src={img} alt="placeholeder image" className="rounded-full h-[50px]" />

      <div className="flex flex-col ">
        <span className="tracking-wide">
          {name} - {address.city}
        </span>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 capitalize ">{category[0]}</span>
          <Rating rating={rating} isText />
        </div>
      </div>
    </div>
  );
}
export default RestaurantListComponent;
