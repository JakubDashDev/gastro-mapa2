import React from "react";

type LoaderType = {
  color?: string;
};

function Loader({ color }: LoaderType) {
  return <span id="loader" className={`border-[5px] border-${color}`}></span>;
}

export default Loader;
