import React, { useState } from "react";
import { useCreateRestaurantsMutation } from "../../services/restaurantsApi";
import { useAppDispatch } from "../../redux/store";
import { RestaurantType, updateRestaurants } from "../../redux/restaurantsSlice";

type HandleFormStateProps = {
  event: React.ChangeEvent<HTMLInputElement>;
  setFormState: React.Dispatch<
    React.SetStateAction<{
      name: string;
      rating: number;
      youtubeLink: string;
      googleLink: string;
    }>
  >;
  reset: () => void;
};

//prettier-ignore
export const handleFormState = ({event, setFormState, reset}:HandleFormStateProps) => {
  setFormState((current) => ({
    ...current,
    [event.target.id]: event.target.value,
  }));
  reset();
};

type handleSubmitProps = {
  event: React.FormEvent<HTMLFormElement>;
  formState: {
    name: string;
    rating: number;
    youtubeLink: string;
    googleLink: string;
  };
  addressState: {
    street: string | undefined;
    zipCode: string | undefined;
    city: string | undefined;
    country: string | undefined;
    latLng: number[] | undefined;
  };
  category: any;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
};

//prettier-ignore
export const useHandleSubmit = () => {
  const dispatch = useAppDispatch()
  const [trigger, {isLoading, error, isError, isSuccess, reset}] = useCreateRestaurantsMutation()

  const createRestaurant = async ({ event, formState, addressState, category, setIsShow }: handleSubmitProps) => {
    event.preventDefault()
    const name = formState.name
    const rating = formState.rating
    const youtubeLink = formState.youtubeLink
    const googleLink = formState.googleLink
    const address = {
      street: addressState.street!,
      zipCode: addressState.zipCode!,
      city: addressState.city!,
      country: addressState.country!,
      latLng: addressState.latLng!
    }
    const categories = category.map((item: {label: string, value:string}) => item.value)

    const data = {name, rating, youtubeLink, googleLink, address, category: categories}

    trigger(data).unwrap()
    .then((res: RestaurantType) => dispatch(updateRestaurants(res)))
    .then(() => {
      setTimeout(() => setIsShow(false), 1000)
    })
  }

  return {createRestaurant, isLoading, error, isSuccess, isError, reset}
};
