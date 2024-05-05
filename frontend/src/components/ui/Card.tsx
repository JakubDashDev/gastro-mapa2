import React from "react";
import { Link, useLocation } from "react-router-dom";

type CardNode = {
  children: React.ReactNode;
};

interface CardProps extends CardNode {
  linkTo?: string;
}

function Card({ children, linkTo }: CardProps) {
  const location = useLocation();
  return (
    <Link
      to={linkTo ? linkTo : location}
      className="relative flex flex-col gap-5 w-full h-full bg-white p-4 border border-black/15 rounded-lg shadow-xl"
    >
      {children}
    </Link>
  );
}

interface CardHeaderProps extends CardNode {
  backgroundColor: string;
}
function CardHeader({ children, backgroundColor }: CardHeaderProps) {
  return (
    <div
      className={`${backgroundColor} -mt-8 z-10 h-[50px] mx-1 md:mx-3 rounded-lg shadow-lg flex justify-center items-center`}
    >
      {children}
    </div>
  );
}

function CardBody({ children }: CardNode) {
  return <div className="mx-1 md:mx-3 flex flex-col">{children}</div>;
}

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;
