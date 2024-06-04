import React, { Fragment, useEffect, useState } from "react";
import Modal, { ModalProps } from "../ui/Modal";
import { useParams } from "react-router-dom";
import LaneThrough from "../ui/LaneThrough";
import PromiseButton from "../ui/PromiseButton";
import { useDelete, useFormState, useSubmit } from "./EditRestaurantForm.hooks";
import AdminSetAddressModal from "./AdminSetAddressModal";
import AdminInput from "./AdminInput";
import { useAppSelector } from "../../redux/store";
import AdminRatingInput from "./AdminRatingInput";
import AdminCategorySelect from "./AdminCategorySelect";
import AdminAddressInput from "./AdminAddressInput";
import { useUpdateRestaurantMutation } from "../../services/restaurantsApi";
import { RestaurantType } from "../../redux/restaurantsSlice";
import { FaTrash } from "react-icons/fa";
import { googleValidation, nameFormValidation } from "./CreateRestrauantForm.hooks";

interface IAddressState {
  street: string | undefined;
  zipCode: string | undefined;
  city: string | undefined;
  country: string | undefined;
  coordinates: [number, number] | undefined;
}

function EditRestaurantForm({ isShow, setIsShow }: ModalProps) {
  const { id } = useParams();
  const {
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
  } = useFormState(id);
  const { submit, isLoading, isError, error, isSuccess } = useSubmit();
  const {
    deleteR,
    isLoading: deleteLoading,
    isError: deleteIsError,
    error: deleteError,
    isSuccess: deleteIsSuccess,
    reset,
  } = useDelete();

  const [showSetAddressModal, setShowSetAddressModal] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: RestaurantType = {
      _id: id,
      name,
      rating: isCustomRating ? "challange ostrości" : (rating as number),
      youtubeLink,
      youtubeEmbed: `https://www.youtube.com/embed/${youtubeLink.split("https://youtu.be/").pop()?.split("&")[0]}`,
      googleLink,
      category: category.map((item: any) => item.value),
      address: {
        street: addressState.city!,
        zipCode: addressState.zipCode!,
        city: addressState.city!,
        country: addressState.country!,
      },
      geometry: {
        coordinates: addressState.coordinates!,
      },
    };

    submit(data);
  };

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) setTimeout(() => setIsShow(false), 1000);
    if (deleteIsSuccess && !deleteError && !deleteLoading)
      setTimeout(() => {
        setIsShow(false);
      }, 1000);
  }, [isSuccess, deleteIsSuccess]);

  return (
    <Fragment>
      <Modal isShow={isShow} setIsShow={setIsShow}>
        <form className="flex flex-col gap-8 w-full h-full lg:w-2/3" onSubmit={handleSubmit}>
          <AdminInput
            labelStyles="bg-darkBg text-gray-300"
            label="Nazwa"
            id="editname"
            name="editname"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="off"
          />
          <AdminRatingInput
            rating={rating}
            setRating={setRating}
            setIsCustomRating={setIsCustiomRating}
            isCustomRating={isCustomRating}
          />
          <AdminInput
            labelStyles="bg-darkBg text-gray-300"
            label="Youtube"
            id="edityt"
            name="edityt"
            type="text"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            required
            autoComplete="off"
          />
          <AdminInput
            labelStyles="bg-darkBg text-gray-300"
            label="Google"
            id="editgoogle"
            name="editgoogle"
            type="text"
            value={googleLink}
            onChange={(e) => setGoogleLink(e.target.value)}
            required
            autoComplete="off"
          />
          <AdminCategorySelect category={category} setCategory={setCategory} />
          <LaneThrough title="Adres" />
          <AdminAddressInput addressState={addressState} setShowSetAddressModal={setShowSetAddressModal} />

          {isError && (
            <div className="w-full bg-red-900/50 border border-red-500 rounded-md flex items-center justify-center text-white px-4 py-2">
              {error && "data" in error ? error.data.message : "Wystąpił nieoczekiwany błąd 💔. Odśwież stronę."}
            </div>
          )}
          {deleteIsError && (
            <div className="w-full bg-red-900/50 border border-red-500 rounded-md flex items-center justify-center text-white px-4 py-2">
              {deleteError && "data" in deleteError
                ? deleteError.data.message
                : "Wystąpił nieoczekiwany błąd 💔. Odśwież stronę."}
            </div>
          )}

          <div className="mt-auto w-full flex gap-2 text-white">
            <PromiseButton
              status={isLoading ? "loading" : isError ? "error" : isSuccess ? "success" : null}
              type="submit"
              // disabled={
              //   Object.values(addressState).some((value) => value === undefined) ||
              //   [validationStatus, youtubeValidateStatus, googleValidationStatus].some((el) => el === "error")
              // }
              className="bg-primary-500 hover:bg-primary-400 rounded-md"
            >
              Zapisz
            </PromiseButton>
            <PromiseButton
              status={deleteLoading ? "loading" : deleteIsSuccess ? "success" : null}
              type="button"
              onClick={() => deleteR(id!)}
              className="bg-red-700 hover:bg-red-600 rounded-md"
            >
              <FaTrash />
            </PromiseButton>
            <button
              onClick={() => setIsShow(false)}
              type="button"
              className="border border-gray-500 py-2 w-full rounded-md hover:text-primary-600 transition-colors"
            >
              Anuluj
            </button>
          </div>
        </form>
      </Modal>
      <AdminSetAddressModal
        setAddressState={setAddressState}
        isShow={showSetAddressModal}
        setIsShow={setShowSetAddressModal}
      />
    </Fragment>
  );
}

export default EditRestaurantForm;
