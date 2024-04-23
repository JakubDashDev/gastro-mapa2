import React, { useState } from "react";
import { useCreateRestaurantsMutation } from "../../services/restaurantsApi";
import { useAppDispatch } from "../../redux/store";
import { RestaurantType, updateRestaurants } from "../../redux/restaurantsSlice";

type HandleFormStateProps = {
  event: React.ChangeEvent<HTMLInputElement>;
  setFormState: React.Dispatch<
    React.SetStateAction<{
      name: string;
      rating: number | string | undefined;
      youtubeLink: string;
      googleLink: string;
    }>
  >;
  reset?: () => void;
};

//prettier-ignore
export const handleFormState = ({event, setFormState, reset}:HandleFormStateProps) => {
  setFormState((current) => ({
    ...current,
    [event.target.id]: event.target.value,
  }));
  reset && reset();
};

type handleSubmitProps = {
  event: React.FormEvent<HTMLFormElement>;
  formState: {
    name: string;
    rating: number | string | undefined;
    youtubeLink: string;
    googleLink: string;
  };
  setFormState: React.Dispatch<
    React.SetStateAction<{ name: string; rating: number | string | undefined; youtubeLink: string; googleLink: string }>
  >;
  addressState: {
    street: string | undefined;
    zipCode: string | undefined;
    city: string | undefined;
    country: string | undefined;
    lngLat: number[] | undefined;
  };
  setAddressState: React.Dispatch<
    React.SetStateAction<{
      street: string | undefined;
      zipCode: string | undefined;
      city: string | undefined;
      country: string | undefined;
      lngLat: number[] | undefined;
    }>
  >;
  category: any;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
};

//prettier-ignore
export const useHandleSubmit = () => {
  const dispatch = useAppDispatch()
  const [trigger, {isLoading, error, isError, isSuccess, reset}] = useCreateRestaurantsMutation()

  const createRestaurant = async ({ event, formState, setFormState, addressState, setAddressState, category, setIsShow }: handleSubmitProps) => {
    event.preventDefault()
    const name = formState.name
    const rating =  formState.rating === "challange ostrości" ? "challange ostrości" : Number(formState.rating)
    const youtubeLink = formState.youtubeLink
    const googleLink = formState.googleLink
    const address = {
      street: addressState.street!,
      zipCode: addressState.zipCode!,
      city: addressState.city!,
      country: addressState.country!,
      lngLat: addressState.lngLat!
    }
    const categories = category.map((item: {label: string, value:string}) => item.value)

    const data = {name, rating, youtubeLink, googleLink, address, category: categories}

    trigger(data).unwrap()
    .then((res: any) => setTimeout(() => {
      dispatch(updateRestaurants(res))
      setIsShow(false)
      setFormState({
        name: "",
        rating: undefined,
        googleLink: "",
        youtubeLink: ""
      })
      setAddressState({
        street: undefined,
        city: undefined,
        lngLat: undefined,
        zipCode: undefined,
        country: undefined
      })
      reset()
    }, 1000))
  }

  return {createRestaurant, isLoading, error, isSuccess, isError, reset}
};
