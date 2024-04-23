import React, { Fragment, useState } from "react";
import RestaurantList from "../../components/ui/RestaurantListAdmin";
import { FaPlus } from "react-icons/fa6";
import RestaurantSearch from "../../components/features/RestaurantSearch";
import CreateRestaurantForm from "../../components/features/CreateRestaurantForm";
import useGetRestaurantsAdmin from "../../hooks/useGetRestaurantsAdmin";
import Loader from "../../components/ui/Loader";
import EditRestaurantForm from "../../components/features/EditRestaurantForm";

function RestaurantsPage() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const { isLoading, error } = useGetRestaurantsAdmin({
    keyword: undefined,
    filters: undefined,
  });

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader color="border-primary-500" />
      </div>
    );
  if (error) return <span>error...</span>;

  return (
    <Fragment>
      <div className="flex flex-col gap-3 container mx-auto px-4 mt-10">
        <div className="overflow-x-auto bg-neutral-50 dark:bg-neutral-700 rounded-lg shadow-xl">
          <div className="flex flex-col lg:flex-row gap-5 items-center my-3 px-4">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center w-[150px] gap-2 py-1 bg-primary-500 hover:bg-primary-400 transition-colors rounded-lg text-white"
            >
              <FaPlus /> Dodaj
            </button>
            <RestaurantSearch />
          </div>
          <RestaurantList isShow={showEditModal} setIsShow={setShowEditModal} />
        </div>
      </div>
      <CreateRestaurantForm isShow={showModal} setIsShow={setShowModal} />
      <EditRestaurantForm isShow={showEditModal} setIsShow={setShowEditModal} />
    </Fragment>
  );
}

export default RestaurantsPage;
