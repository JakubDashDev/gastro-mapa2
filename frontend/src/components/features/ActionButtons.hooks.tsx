import { RestaurantType, deleteRestaurant } from "../../redux/restaurantsSlice";
import { useAppDispatch } from "../../redux/store";
import { useDeleteRestaurantMutation } from "../../services/restaurantsApi";

export const useDelete = () => {
  const dispatch = useAppDispatch();
  const [trigger, { isLoading, isError, error, isSuccess }] = useDeleteRestaurantMutation();

  const deleteR = (event: any, restaurant: RestaurantType) => {
    event.stopPropagation();

    restaurant &&
      trigger(restaurant._id!)
        .unwrap()
        .then(() => {
          setTimeout(() => {
            dispatch(deleteRestaurant(restaurant._id!));
          }, 2000);
        });
  };

  return { deleteR, isLoading, isError, error, isSuccess };
};
