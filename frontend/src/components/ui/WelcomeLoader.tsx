import { useEffect, useRef, useState } from "react";

function Loader() {
  const { placeholder } = useLoader();
  return (
    <div className="absolute w-screen h-[calc(100dvh)] top-0 left-0 flex items-center justify-center bg-darkBg">
      <span className="font-loader text-primary-500 text-center text-6xl mt-24 tracking-[10px]">
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
