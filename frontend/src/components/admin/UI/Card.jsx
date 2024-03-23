import React from 'react';

function Card({ children }) {
  return (
    <div className="relative flex flex-col gap-5 w-full h-full bg-white p-4 border border-black/15 rounded-lg shadow-xl">
      {children}
    </div>
  );
}

function CardHeader({ children }) {
  return (
    <div className="-mt-8 bg-red-500 z-10 mx-1 md:mx-3 rounded-lg p-0 shadow-lg">
      {children}
    </div>
  );
}

function CardBody({ children }) {
  return <div className="mx-1 md:mx-3 flex flex-col">{children}</div>;
}

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;
