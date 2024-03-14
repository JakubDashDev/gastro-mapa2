import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function Rating({ rating, isText, color }) {
  return (
    <div
      className={`flex gap-1 items-center text-base font-bold ${
        rating === 5 ? 'text-primary-500' : color
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
          <FaStar />
        ) : rating >= 4.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </span>
      {isText && (
        <span
          className={`mx-1 ${
            rating === 5 ? 'font-loader -mb-1' : 'font-sans'
          }`}
        >
          {rating === 5 ? 'MUALA' : rating}
        </span>
      )}
    </div>
  );
}

Rating.defaultProps = {
  color: 'text-yellow-500',
};

export default Rating;
