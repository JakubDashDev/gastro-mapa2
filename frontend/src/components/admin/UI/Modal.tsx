import { useTransition, animated, useSpring } from "@react-spring/web";
import React from "react";

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
  return transitions(
    (style, item) =>
      item && (
        <animated.div
          style={backgroundTranstion}
          className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black/50"
        >
          <animated.div
            style={style}
            className="container mx-auto px-4 py-5 flex flex-col gap-5 items-center w-[90%] lg:w-[40%] h-[90%] rounded-lg border border-white/70   bg-dashboardPrimary"
          >
            {children}
          </animated.div>
        </animated.div>
      )
  );
}

export default Modal;
