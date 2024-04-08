import { useEffect, useRef, useState } from "react";

function Loader() {
  const { placeholder } = useLoader();
  return (
    <div className="absolute w-screen h-screen top-0 left-0 flex items-center justify-center bg-gray-800">
      <span className="font-loader text-primary-500 text-center text-5xl mt-24">
        {placeholder}
      </span>
    </div>
  );
}

export default Loader;

function useLoader() {
  const string = "MUALA";
  const index = useRef(0);

  const [placeholder, setPlaceholder] = useState(string[0]);

  useEffect(() => {
    function tick() {
      index.current++;
      setPlaceholder((prev) => prev + string[index.current]);
    }

    if (index.current < string.length) {
      let addChar = setInterval(tick, 400);
      return () => clearInterval(addChar);
    }

    if (index.current === string.length) {
      index.current = 0;
      setPlaceholder(string[0]);
    }
  }, [placeholder]);

  return { placeholder };
}
