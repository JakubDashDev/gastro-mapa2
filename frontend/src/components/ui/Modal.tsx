import { useTransition, animated, useSpring } from "@react-spring/web";
import React, { Fragment, useEffect } from "react";

export type ModalProps = {
  children?: React.ReactNode;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({ children, isShow, setIsShow }: ModalProps) {
  const transitions = useTransition(isShow, {
    from: { opacity: 0, transform: "translateY(-40px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(-40px)" },
  });

  const backgroundTranstion = useSpring({
    opacity: isShow ? 1 : 0,
  });

  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isShow]);

  return transitions(
    (style, item) =>
      item && (
        <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center">
          <animated.div
            style={style}
            className="z-10 container px-4 py-5 flex flex-col gap-5 items-center w-[90%] lg:w-[40%] h-[95%] rounded-lg border border-white/70 bg-dashboardPrimary overflow-x-auto"
          >
            {children}
          </animated.div>
          <animated.div
            style={backgroundTranstion}
            className="absolute top-0 left-0 w-full h-full bg-black/50"
            onClick={() => setIsShow(false)}
          ></animated.div>
        </div>
      )
  );
}

export default Modal;
