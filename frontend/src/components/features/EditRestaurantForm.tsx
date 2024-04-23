import React, { Fragment, useEffect, useState } from "react";
import Modal, { ModalProps } from "../ui/Modal";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import Rating from "../ui/Rating";
import ActionButtons from "./ActionButtons";
// import { handleFormState, useHandleSubmit } from "./CreateRestrauantForm.hooks";
import Input from "./Input";
import Select from "react-select";
import { CATEGORY_ARRAY } from "../../../constatns";
import LaneThrough from "../ui/LaneThrough";
import { AddressModal } from "./CreateRestaurantForm";
import PromiseButton from "../ui/PromiseButton";
import {
  handleFormState,
  useDeleteRestaurant,
  useIntialRestaurant,
  useIsSubmitDisabled,
  useUpdateRestaurant,
} from "./EditRestaurantForm.hooks";

function EditRestaurantForm({ isShow, setIsShow }: ModalProps) {
  const { id } = useParams();
  const { restaurant } = useIntialRestaurant(id, isShow);

  const { updateRestaurantFunc, isLoading, isError, error, isSuccess, reset } = useUpdateRestaurant();
  const {
    deleteR,
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    reset: resetDelete,
  } = useDeleteRestaurant();

  const [showAddressModal, setShowAddressModal] = useState(false);

  const { state, setState, addressState, setAddressState, category, setCategory, setFormState } = handleFormState(
    restaurant!,
    reset
  );

  const isSubmitDisabled = useIsSubmitDisabled(restaurant, { state, category, addressState });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    updateRestaurantFunc({ event: e, _id: restaurant?._id, state, addressState, category, setIsShow });
  };

  const setChallange = () => {
    setState((current) => ({
      ...current,
      rating: current.rating === "challange ostrości" ? 0 : "challange ostrości",
    }));
  };

  useEffect(() => {
    setTimeout(() => {
      reset();
      resetDelete();
    }, 1000);
    isShow ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "auto");
  }, [isShow]);

  if (!restaurant) {
    return (
      <Modal isShow={isShow} setIsShow={setIsShow}>
        <span className="text-red-500">Nie udało się załadować wybranej restauracji :(</span>
      </Modal>
    );
  }

  return (
    <Fragment>
      <Modal isShow={isShow} setIsShow={setIsShow}>
        <form className="w-full h-full lg:w-2/3 flex flex-col items-center gap-5" onSubmit={handleSubmit}>
          <Input
            id="name"
            name="name"
            type="text"
            label="Nazwa restauracji:"
            placeholder={restaurant.name}
            onChange={(event) => setFormState(event)}
            value={state.name}
            required
            error={error && "data" in error && error.data.fields?.includes("name") ? error.data.message : null}
          />
          <div className="w-full">
            <div>
              <Input
                id="rating"
                name="rating"
                type="text"
                label="Ocena:"
                value={state.rating}
                onChange={(event) => setFormState(event)}
                placeholder={restaurant.rating.toString()}
                disabled={state.rating === "challange ostrości"}
                required
                error={error && "data" in error && error.data.fields?.includes("rating") ? error.data.message : null}
                styles="capitalize"
              />
              <span className="text-sm text-gray-400">Zakres ocen: 0 - 5, w tym 5 = MUALA!</span>
              <div className="flex gap-1 items-center">
                <input type="checkbox" onChange={setChallange} checked={state.rating === "challange ostrości"} />
                <label className="text-red-500">Challange Ostrości 🌶️</label>
              </div>
            </div>
          </div>
          <div className="relative w-full">
            <Input
              id="youtubeLink"
              name="youtubeLink"
              type="text"
              label="YouTube link:"
              placeholder={restaurant.youtubeLink}
              value={state.youtubeLink}
              onChange={(event) => setFormState(event)}
              required
            />
            <div className="absolute top-[50%] right-4 bg-dashboardSecondary">
              <ActionButtons restaurant={restaurant} isYoutubeIcon isEmbedIcon textColor="text-white/90" />
            </div>
          </div>
          <div className="relative w-full">
            <Input
              id="googleLink"
              name="googleLink"
              type="text"
              label="Google link:"
              placeholder={restaurant.googleLink}
              onChange={(event) => setFormState(event)}
              value={state.googleLink}
              required
            />
            <div className="absolute top-[50%] right-4 bg-dashboardSecondary">
              <ActionButtons restaurant={restaurant} isLocationIcon textColor="text-white/90" />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <span className="text-white">Kategorie </span>
            <Select
              defaultValue={restaurant.category.map((item) => ({ label: item, value: item }))}
              onChange={setCategory}
              options={
                CATEGORY_ARRAY.map((item) => ({
                  value: item,
                  label: item,
                })) as any
              }
              isMulti
              placeholder="Wybierz..."
              isOptionDisabled={() => category?.length! >= 3}
              required
              classNames={{
                control: () => "!border-dashboardSecondary !rounded-lg",
                valueContainer: () => "bg-dashboardSecondary ",
                placeholder: () => "!text-gray-300",
                indicatorsContainer: () => "bg-dashboardSecondary !text-gray-500",
                clearIndicator: () => "bg-dashboardSecondary !text-gray-300",
              }}
            />
          </div>
          <div className="w-full flex flex-col gap-5">
            <LaneThrough title="Adres i mapa" />
            <button
              type="button"
              className="text-white bg-gray-700 py-1 rounded-lg hover:bg-gray-500 transition-all"
              onClick={() => setShowAddressModal((current) => !current)}
            >
              Ustaw Adres
            </button>
            <div className="flex flex-col gap-1 text-white/70">
              <div className="flex items-center gap-1">
                <span className="text-white/50">Ulica:</span>
                <span className="text-white">{restaurant.address.street || "-"}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-white/50">Kod pocztowy:</span>
                <span className="text-white">{restaurant.address.zipCode || "-"}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-white/50">Miato:</span>
                <span className="text-white">{restaurant.address.city || "-"}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-white/50">Kraj:</span>
                <span className="text-white">{restaurant.address.country || "-"}</span>
              </div>
            </div>
          </div>

          {error &&
            "data" in error &&
            !error?.data.fields?.every((i) => i.includes("name") || i.includes("rating")) && (
              <div className="w-full py-2 px-5 border border-red-500 bg-red-500/30 text-white">
                {error.data.message}
              </div>
            )}

          <div className="w-full mt-auto flex  gap-4">
            <PromiseButton
              type="submit"
              bgColor="primary-500"
              hoverColor="primary-300"
              isSuccess={isSuccess}
              isLoading={isLoading}
              isError={isError}
              disabled={!isSuccess && isSubmitDisabled}
            >
              Zapisz
            </PromiseButton>
            <PromiseButton
              type="button"
              bgColor="red-500"
              hoverColor="red-600"
              onClick={() =>
                window.confirm(`Czy na pewno chcesz usunąć ${restaurant.name}?`) && id && deleteR(id, setIsShow)
              }
              isSuccess={isSuccessDelete}
              isError={isErrorDelete}
              isLoading={isLoadingDelete}
            >
              Usuń
            </PromiseButton>
            <button
              type="button"
              className="border border-primary-400 hover:border-primary-500 transition-colors w-full py-1 rounded-lg text-white"
              onClick={() => setIsShow(false)}
            >
              Anuluj
            </button>
          </div>
        </form>
      </Modal>
      <AddressModal
        isShow={showAddressModal}
        setIsShow={setShowAddressModal}
        setAddressState={setAddressState}
        initalMarker={{ lat: restaurant.address.lngLat[1], lng: restaurant.address.lngLat[0] }}
        center={{ lat: restaurant.address.lngLat[1], lng: restaurant.address.lngLat[0] }}
      />
    </Fragment>
  );
}

export default EditRestaurantForm;
