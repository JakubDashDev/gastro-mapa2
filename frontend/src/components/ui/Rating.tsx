import React, { Fragment } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type RatingProps = {
  rating: number | string;
  isText?: boolean;
  color: string;
};

function Rating({ rating, isText, color }: RatingProps) {
  if (rating === "challange ostrości") {
    return <span className="text-red-500">Challange ostrości 🌶️</span>;
  }

  if (rating === 5) {
    return <span className="font-loader text-primary-500 -mb-1 text-2xl tracking-widest">{rating === 5 ? "MUALA" : rating}</span>;
  }
  return (
    <div className={`flex gap-1 items-center text-base ${rating === 5 ? "text-primary-500" : color}`}>
      {typeof rating === "number" && (
        <Fragment>
          <span>{rating >= 1 ? <FaStar /> : rating >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
          <span>{rating >= 2 ? <FaStar /> : rating >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
          <span>{rating >= 3 ? <FaStar /> : rating >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
          <span>{rating >= 4 ? <FaStar /> : rating >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
          <span>{rating >= 5 ? <FaStar /> : rating >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}</span>
        </Fragment>
      )}
      {isText && (
        <span className={`mx-1 ${rating === 5 ? "font-loader text-3xl tracking-wider -mb-1" : "font-sans"}`}>
          {rating === 5 ? "MUALA" : rating}
        </span>
      )}
    </div>
  );
}

Rating.defaultProps = {
  color: "text-yellow-500",
};

export default Rating;
