import { useEffect, useRef, useState } from "react";
import { RestaurantType, deleteRestaurant, updateRestaurant, updateRestaurants } from "../../redux/restaurantsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useDeleteRestaurantMutation, useUpdateRestaurantMutation } from "../../services/restaurantsApi";

export const useIntialRestaurant = (id: string | undefined, isShow: boolean) => {
  const { restaurants } = useAppSelector((state) => state.restaurants);

  const restaurant = isShow ? restaurants.find((el) => el._id == id) : undefined;

  return { restaurant };
};

type stateType = {
  street: string | undefined;
  zipCode: string | undefined;
  city: string | undefined;
  country: string | undefined;
  lngLat: number[] | undefined;
};
export const handleFormState = (restaurant: RestaurantType, reset: () => void) => {
  const [state, setState] = useState({
    name: "",
    rating: 0,
    youtubeLink: "",
    googleLink: "",
  });
  const [category, setCategory] = useState<any>([]);
  const [addressState, setAddressState] = useState<stateType>({
    street: "",
    zipCode: "",
    city: "",
    country: "",
    lngLat: [0, 0],
  });

  useEffect(() => {
    if (restaurant) {
      setState({
        name: restaurant?.name,
        rating: restaurant?.rating,
        youtubeLink: restaurant?.youtubeLink,
        googleLink: restaurant?.googleLink,
      });

      setCategory(restaurant?.category.map((item) => ({ label: item, value: item })));

      setAddressState({
        street: restaurant?.address.street,
        zipCode: restaurant?.address.zipCode,
        city: restaurant?.address.city,
        country: restaurant?.address.country,
        lngLat: restaurant?.address.lngLat,
      });
    } else {
      setState({
        name: "",
        rating: 0,
        youtubeLink: "",
        googleLink: "",
      });

      setCategory([]);

      setAddressState({
        street: "",
        zipCode: "",
        city: "",
        country: "",
        lngLat: [0, 0],
      });
    }
  }, [restaurant]);

  const setFormState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((current) => ({
      ...current,
      [event.target.id]: event.target.value,
    }));

    reset && reset();
  };

  return { state, category, setCategory, addressState, setAddressState, setFormState };
};

export const useIsSubmitDisabled = (restaurant: RestaurantType | undefined, state: any) => {
  if (restaurant) {
    const name = restaurant.name === state.state.name;
    const rating = restaurant.rating.toString() === state.state.rating.toString();
    const category =
      JSON.stringify([...restaurant.category].sort()) === JSON.stringify(state.category.map((item: any) => item.value));
    const address = JSON.stringify(restaurant.address.lngLat) === JSON.stringify(state.addressState.lngLat);

    if (!name || !rating || !category || !address) {
      return false;
    } else {
      return true;
    }
  }

  return true;
};

type useUpdateRestaurantType = {
  event: React.FormEvent<HTMLFormElement>;
  _id: string | undefined;
  state: {
    name: string | undefined;
    rating: number | undefined;
    youtubeLink: string | undefined;
    googleLink: string | undefined;
  };
  addressState: {
    street: string | undefined;
    zipCode: string | undefined;
    city: string | undefined;
    country: string | undefined;
    lngLat: number[] | undefined;
  };
  category: { label: string; value: string }[];
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>; //NOTE: for modal close
};
export const useUpdateRestaurant = () => {
  const dispatch = useAppDispatch();
  const [trigger, { isLoading, isError, error, isSuccess, reset }] = useUpdateRestaurantMutation();

  //prettier-ignore
  const updateRestaurantFunc = async ({event, _id, state, addressState, category, setIsShow,}: useUpdateRestaurantType) => {
    event.preventDefault();

    const name = state.name
    const rating = state.rating 
    const youtubeLink = state.youtubeLink
    const googleLink = state.googleLink
    const address = {
      street: addressState.street!,
      zipCode: addressState.zipCode!,
      city: addressState.city!,
      country: addressState.country!,
      lngLat: addressState.lngLat!
    }
    const categories = category.map((item) => item.value)

    const data = {_id, name, rating, youtubeLink, googleLink, address, category: categories}

    trigger(data).unwrap()
    .then((res: any) => dispatch(updateRestaurant(res)))
    .then(() => {
      setTimeout(() => setIsShow(false), 1000)
    })
    .then(() => reset())
  };
  return { updateRestaurantFunc, isLoading, error, isSuccess, isError, reset };
};

export const useDeleteRestaurant = () => {
  const dispatch = useAppDispatch();

  const [trigger, { isLoading, isError, error, isSuccess }] = useDeleteRestaurantMutation();

  const deleteR = (id: string, setIsShow: React.Dispatch<boolean>) => {
    trigger(id)
      .unwrap()
      .then(() =>
        setTimeout(() => {
          dispatch(deleteRestaurant(id));
          setIsShow(false);
        }, 1000)
      )
      .catch((err) => alert(err));
  };

  return { deleteR, isLoading, isError, error, isSuccess };
};
