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

export const useSubmit = () => {
  const dispatch = useAppDispatch();
  const [trigger, { isLoading, isError, error, isSuccess }] = useUpdateRestaurantMutation();

  const submit = (data: RestaurantType) => {
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

export const useFormState = (id: string | undefined) => {
  const { restaurants } = useAppSelector((state) => state.restaurants);
  const currentRestaurant = restaurants.find((item) => item._id === id);

  useEffect(() => {
    if (currentRestaurant) {
      setName(currentRestaurant.name);
      setRating(currentRestaurant.rating === "challange ostrości" ? 0 : (currentRestaurant.rating as number));
      setIsCustiomRating(currentRestaurant.rating === "challange ostrości");
      setYoutubeLink(currentRestaurant.youtubeLink);
      setGoogleLink(currentRestaurant.googleLink);
      setCategory(currentRestaurant.category.map((item) => ({ label: item, value: item })));
      setAddressState({
        street: currentRestaurant.address.street,
        zipCode: currentRestaurant.address.zipCode,
        city: currentRestaurant.address.city,
        country: currentRestaurant.address.country,
        coordinates: currentRestaurant.geometry.coordinates,
      });
    }
  }, [currentRestaurant]);

  //name input
  const [name, setName] = useState("");

  //rating input
  const [rating, setRating] = useState<number | null>(2.5);
  const [isCustomRating, setIsCustiomRating] = useState(false);

  //youtube input
  const [youtubeLink, setYoutubeLink] = useState("");

  //google input
  const [googleLink, setGoogleLink] = useState("");

  //category input
  const [category, setCategory] = useState<any>([]);

  //address input
  const [addressState, setAddressState] = useState<IAddressState>({
    street: undefined,
    zipCode: undefined,
    city: undefined,
    country: undefined,
    coordinates: undefined,
  });

  return {
    name,
    setName,
    rating,
    setRating,
    isCustomRating,
    setIsCustiomRating,
    youtubeLink,
    setYoutubeLink,
    googleLink,
    setGoogleLink,
    category,
    setCategory,
    addressState,
    setAddressState,
  };
};
