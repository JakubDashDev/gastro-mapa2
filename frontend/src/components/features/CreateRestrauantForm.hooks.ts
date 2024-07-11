import React from "react";
import { useCreateRestaurantsMutation } from "../../services/restaurantsApi";
import { useAppDispatch } from "../../redux/store";
import { updateRestaurants } from "../../redux/restaurantsSlice";

interface IaddressState {
  street: string | undefined;
  zipCode: string | undefined;
  city: string | undefined;
  country: string | undefined;
  coordinates: [number, number] | undefined;
}

interface CreateNewRestaurantProps {
  name: string;
  rating: number | null; // rating can be null if isCustomRating is true
  isCustomRating: boolean; //custom rating = challange ostrości
  youtubeLink: string;
  googleLink: string;
  category: string[];
  addressState: IaddressState;
}

export const useCreateNewRestaurant = () => {
  const dispatch = useAppDispatch();
  const [trigger, { isLoading, error, isError, isSuccess, reset }] = useCreateRestaurantsMutation();

  const createNewRestaurant = (props: CreateNewRestaurantProps) => {
    const { name, rating, isCustomRating, youtubeLink, googleLink, category, addressState } = props;

    const data = {
      name,
      rating: isCustomRating ? ("challange ostrości" as "challange ostrości") : Number(rating),
      youtubeLink,
      youtubeEmbed: `https://www.youtube.com/embed/${youtubeLink.split("https://youtu.be/").pop()?.split("&")[0]}`,
      googleLink,
      category,
      address: {
        street: addressState.street!,
        city: addressState.city!,
        zipCode: addressState.zipCode!,
        country: addressState.country!,
      },
      geometry: {
        coordinates: addressState.coordinates!,
      },
    };

    trigger(data)
      .unwrap()
      .then((res: any) => {
        dispatch(updateRestaurants(res));
      })
      .catch((err) => console.log(err));
  };

  return { createNewRestaurant, isLoading, error, isError, isSuccess, reset };
};
