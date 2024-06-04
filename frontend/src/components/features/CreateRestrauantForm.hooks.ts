import React, { useState } from "react";
import { useCreateRestaurantsMutation } from "../../services/restaurantsApi";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { RestaurantType, updateRestaurants } from "../../redux/restaurantsSlice";

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

export const nameFormValidation = () => {
  const { restaurants } = useAppSelector((state) => state.restaurants);
  const [validationStatus, setValidationStatus] = useState<"ok" | "error" | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | undefined>(undefined);

  const validate = (value: string) => {
    const exists = restaurants.some((item) => item.name.toLowerCase() === value.toLowerCase());

    setValidationStatus(null);
    setValidationMessage(undefined);

    if (value === "") return;

    if (exists) {
      setValidationStatus("error");
      setValidationMessage("Restauracja o tej nazwie już istnieje");
    } else {
      setValidationStatus("ok");
    }
  };

  return { validate, validationStatus, validationMessage };
};

export const youtubeFormValdation = () => {
  const [validationStatus, setValidationStatus] = useState<"ok" | "error" | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | undefined>(undefined);

  const validate = (value: string) => {
    const isValid = value.split("https://youtu.be/")[1];

    setValidationStatus(null);
    setValidationMessage(undefined);

    if (value === "") return;

    if (!isValid) {
      setValidationStatus("error");
      setValidationMessage("Link niepoprawny. Wejdź w: Youtube -> udostępnij -> kopiuj ");
    } else {
      setValidationStatus("ok");
    }
  };

  return { validate, validationStatus, validationMessage };
};

export const ratingValidation = () => {
  const [validationStatus, setValidationStatus] = useState<"ok" | "error" | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | undefined>(undefined);

  const validate = (value: number | null) => {
    const isValid = value! > 0 && value! < 5.1;

    setValidationStatus(null);
    setValidationMessage(undefined);

    if (!isValid) {
      setValidationStatus("error");
      setValidationMessage("Wartość powinna wynosić od 0.1 do 5");
    } else {
      setValidationStatus("ok");
    }
  };

  return { validate, validationStatus, validationMessage };
};

export const googleValidation = () => {
  const [validationStatus, setValidationStatus] = useState<"ok" | "error" | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | undefined>(undefined);

  const validate = (value: string) => {
    setValidationStatus(null);
    setValidationMessage(undefined);

    const isValid = value.split("/")[2] === "maps.app.goo.gl";

    if (value === "") return;

    if (!isValid) {
      setValidationStatus("error");
      setValidationMessage("Niepoprawny link. Wejdź w: GoogleMaps -> udostępnij -> kopiuj");
    } else {
      setValidationStatus("ok");
    }
  };

  return { validate, validationStatus, validationMessage };
};
