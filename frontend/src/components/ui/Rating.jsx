import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function Rating({ rating, textSize }) {
  return (
    <div
      className={`flex gap-1 items-center text-base font-bold ${
        rating === 5 ? 'text-primary-500' : 'text-yellow-500'
      }`}
    >
      <span>
        {rating >= 1 ? (
          <FaStar />
        ) : rating >= 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {rating >= 2 ? (
          <FaStar />
        ) : rating >= 1.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {rating >= 3 ? (
          <FaStar />
        ) : rating >= 2.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {rating >= 4 ? (
          <FaStar />
        ) : rating >= 3.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {rating >= 5 ? (
          <div
            className={`${textSize} flex items-center gap-1 text-primary-500 mt-[-5]`}
          >
            <FaStar />
          </div>
        ) : rating >= 4.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span className={`mx-1 ${rating === 5 ? 'font-loader' : 'font-sans'}`}>
        {rating === 5 ? 'MUALA' : rating}
      </span>
    </div>
  );
}

Rating.defaultProps = {
  textSize: 'text-base',
};

export default Rating;
