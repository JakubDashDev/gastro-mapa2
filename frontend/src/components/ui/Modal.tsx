import { useTransition, animated, useSpring } from "@react-spring/web";
import React from "react";

export type ModalProps = {
  children?: React.ReactNode;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>> | (() => void);
};

function Modal({ children, isShow, setIsShow }: ModalProps) {
  const transitions = useTransition(isShow, {
    from: { opacity: 0, transform: "translateY(-10px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(-10px)" },
    config: { duration: 100 },
  });

  const backgroundTranstion = useSpring({
    opacity: isShow ? 1 : 0,
  });

  return transitions(
    (style, item) =>
      item && (
        <div className="fixed top-0 left-0 w-screen h-[calc(100dvh)] flex items-center justify-center z-30">
          <animated.div
            style={style}
            id="modal"
            className="z-10 container px-4 py-5 flex flex-col gap-5 items-center w-[95%] 2xl:w-[35%] xl:w-[50%] lg:w-[60%] h-[98%] rounded-lg border border-black/70 bg-neutral-200 dark:bg-darkBg overflow-x-auto"
          >
            {children}
          </animated.div>
          <animated.div
            style={backgroundTranstion}
            className="absolute top-0 left-0 w-screen h-[calc(100dvh)] bg-black/50"
            onClick={() => setIsShow(false)}
          ></animated.div>
        </div>
      )
  );
}

export default Modal;
