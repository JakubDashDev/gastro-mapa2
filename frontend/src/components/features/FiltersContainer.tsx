import React, { Fragment, useState } from "react";
import { FaArrowLeft, FaFilter } from "react-icons/fa";
import { useTransition, animated } from "@react-spring/web";
import Filters from "./Filters";
import getParams from "../../utils/getUrlParams";

function FilersContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const { filtersQuery } = getParams(location);

  const transition = useTransition(isOpen, {
    from: { transform: "translateX(-100%)" },
    enter: { transform: "translateX(0%)" },
    leave: { transform: "translateX(-100%)" },
  });

  return (
    <Fragment>
      <div className="flex flex-col justify-center items-center gap-1">
        <button onClick={() => setIsOpen((prev) => !prev)} className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            <span className="text-gray-500 dark:text-gray-300 ">Filtry</span>
            {filtersQuery && <span className="text-red-600">({filtersQuery && JSON.parse(filtersQuery).length})</span>}
          </div>
          <FaFilter />
        </button>
      </div>

      {transition(
        (styles, item) =>
          item && (
            <animated.div
              style={styles}
              className="container mx-auto px-4 pb-4 absolute top-0 left-0 h-[calc(100dvh)] w-screen md:w-[420px] bg-white dark:bg-darkBg overflow-y-auto z-20"
            >
              <section className="grid items-center grid-rows-1 grid-cols-4">
                <button className="text-lg" onClick={() => setIsOpen((current) => !current)}>
                  <FaArrowLeft />
                </button>
                <h2 className="text-center text-lg font-extrabold my-5 col-span-2">Filtry</h2>
              </section>

              <Filters setIsOpen={setIsOpen} />
            </animated.div>
          )
      )}
    </Fragment>
  );
}

export default FilersContainer;
