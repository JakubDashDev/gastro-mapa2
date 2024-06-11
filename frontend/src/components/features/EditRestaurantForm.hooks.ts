import { useEffect, useState } from "react";
import { RestaurantType, deleteRestaurant, updateRestaurant } from "../../redux/restaurantsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useDeleteRestaurantMutation, useUpdateRestaurantMutation } from "../../services/restaurantsApi";

interface IAddressState {
  street: string | undefined;
  zipCode: string | undefined;
  city: string | undefined;
  country: string | undefined;
  coordinates: [number, number] | undefined;
}

interface UpdateNewRestaurantProps {
  _id: string;
  name: string;
  rating: number | null; // rating can be null if isCustomRating is true
  isCustomRating: boolean; //custom rating = challange ostrości
  youtubeLink: string;
  googleLink: string;
  category: string[];
  addressState: IAddressState;
}

export const useSubmit = () => {
  const dispatch = useAppDispatch();
  const [trigger, { isLoading, isError, error, isSuccess }] = useUpdateRestaurantMutation();

  const submit = (props: UpdateNewRestaurantProps) => {
    const { _id, name, rating, isCustomRating, youtubeLink, googleLink, category, addressState } = props;
    const data = {
      _id,
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
      .then((res) => dispatch(updateRestaurant(res)));
  };

  return { submit, isLoading, isError, error, isSuccess };
};

export const useDelete = () => {
  const dispatch = useAppDispatch();

  const [trigger, { isLoading, isError, error, isSuccess, reset }] = useDeleteRestaurantMutation();

  const deleteR = (id: string) => {
    trigger(id)
      .unwrap()
      .then(() => dispatch(deleteRestaurant(id)))
      .catch((err) => alert(err));
  };

  return { deleteR, isLoading, isError, error, isSuccess, reset };
};
