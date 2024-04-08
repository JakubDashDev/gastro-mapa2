import React from "react";

type LoaderType = {
  color?: string;
};

function Loader({ color }: LoaderType) {
  return <span id="loader" className={`border-[5px] ${color}`}></span>;
}

export default Loader;
