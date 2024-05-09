import React from "react";

type LoaderType = {
  color?: string;
  colorDark?: string;
};

function Loader({ color, colorDark }: LoaderType) {
  return <span id="loader" className={`border-[4px] border-${color} dark:border-${colorDark}`}></span>;
}

export default Loader;
