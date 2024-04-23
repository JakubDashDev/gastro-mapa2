import React from "react";
import { FaEyeSlash, FaLocationArrow, FaYoutube } from "react-icons/fa6";
import { FaCode, FaEdit, FaTrashAlt } from "react-icons/fa";
import { RestaurantType } from "../../redux/restaurantsSlice";
import { useDelete } from "./ActionButtons.hooks";
import PromiseButton from "../ui/PromiseButton";

type ActionButtonsProps = {
  restaurant: RestaurantType;
  textSize?: string;
  textColor?: string;
  isEditIcon?: boolean;
  isTrashIcon?: boolean;
  isLocationIcon?: boolean;
  isYoutubeIcon?: boolean;
  isEmbedIcon?: boolean;
};

function ActionButtons({
  restaurant,
  isEditIcon,
  isTrashIcon,
  isLocationIcon,
  isYoutubeIcon,
  isEmbedIcon,
  textSize,
  textColor,
}: ActionButtonsProps) {
  const { deleteR, isLoading, isError, isSuccess } = useDelete();

  return (
    <div
      className={`flex gap-4 items-center justify-start ${textSize ? textSize : "text-2xl"} ${
        textColor ? textColor : "text-black"
      }`}
    >
      {isEditIcon && (
        <ActionButton>
          <FaEdit />
        </ActionButton>
      )}
      {isTrashIcon && (
        <div>
          <PromiseButton
            type="button"
            textColor="text-red-500"
            textHover="text-blue-500"
            isSuccess={isSuccess}
            isLoading={isLoading}
            isError={isError}
            onClick={(e) =>
              window.confirm(`Czy na pewno chcesz usunąć ${restaurant.name}?`)
                ? deleteR(e, restaurant)
                : e.stopPropagation()
            }
          >
            <FaTrashAlt />
          </PromiseButton>
        </div>
      )}
      {isLocationIcon && (
        <a target="_blank" href={restaurant.googleLink} className="hover:text-blue-500 transition-colors">
          <FaLocationArrow />
        </a>
      )}
      {isYoutubeIcon && (
        <a target="_blank" href={restaurant.youtubeLink} className="hover:text-blue-500 transition-colors">
          <FaYoutube />
        </a>
      )}
      {isEmbedIcon && (
        <a target="_blank" href={restaurant.youtubeEmbed} className="hover:text-blue-500 transition-colors">
          <FaCode />
        </a>
      )}
    </div>
  );
}

export default ActionButtons;

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  styles?: string;
}

function ActionButton({ styles, children, ...props }: ActionButtonProps) {
  return (
    <button className={`${styles} hover:text-blue-500 transition-colors`} onClick={props.onClick}>
      {children}
    </button>
  );
}
