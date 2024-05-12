import React, { Fragment } from "react";
import { FaYoutube } from "react-icons/fa";
import Rating from "./Rating";
import { BiSolidNavigation } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { animated, useSpring, useTransition } from "@react-spring/web";
import { RestaurantType } from "../../redux/restaurantsSlice";

type MobileMarkerPopupProps = {
  popupInfo: RestaurantType | null;
  setPopupInfo: React.Dispatch<React.SetStateAction<RestaurantType | null>>;
};

function MobileMarkerPopup({ popupInfo, setPopupInfo }: MobileMarkerPopupProps) {
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      setPopupInfo(null);
    }
  };

  const transition = useTransition(popupInfo, {
    from: { transform: "translateY(100%)" },
    enter: { transform: "translateY(0%)" },
    leave: { transform: "translateY(100%)" },
  });

  const backdropAnimation = useSpring({
    opacity: popupInfo ? 1 : 0,
  });

  return transition(
    (styles, item) =>
      item && (
        <Fragment>
          <animated.div
            style={styles}
            className="flex flex-col gap-2 p-2 fixed bottom-0 left-0 w-screen bg-white dark:bg-darkBg rounded-t-xl border-t-2 border-white dark:border-darkBg dark:text-gray-200 z-20"
          >
            <button type="button" className="absolute top-1 right-1 text-2xl" onClick={() => setPopupInfo(null)}>
              <IoIosClose />
            </button>
            <div className="flex justify-center">
              <iframe id="ytplayer" width={300} height={181} src={popupInfo?.youtubeEmbed} className="rounded-lg" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg">{popupInfo?.name}</span>
              {popupInfo?.category.map((type) => (
                <span key={type} className="text-sm capitalize text-gray-500">
                  {type}
                </span>
              ))}
            </div>
            <span className="border-b border-black/5 dark:border-white/15 pb-1">
              {popupInfo?.address.street}, {popupInfo?.address.zipCode} {popupInfo?.address.city}{" "}
            </span>
            <div className="flex justify-between items-center gap-5 pt-1">
              <span className="pb-1">
                <Rating rating={popupInfo?.rating || 0} isText />
              </span>
              <div className="flex items-center gap-3">
                <button className="flex justify-center items-center border border-red-500 p-2 text-xl text-red-500  rounded-full  ">
                  <FaYoutube />
                </button>
                <button className="flex justify-center items-center border border-gray-500 dark:border-gray-200 text-gray-500 dark:text-gray-200 p-2 text-xl rounded-full ">
                  <BiSolidNavigation />
                </button>
              </div>
            </div>
          </animated.div>
          <animated.div
            style={backdropAnimation}
            className="absolute top-0 left-0 w-screen h-[calc(100dvh)] z-10 bg-black/50"
            onClick={handleClose}
          />
        </Fragment>
      )
  );
}

export default MobileMarkerPopup;
