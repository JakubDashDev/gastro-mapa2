import React, { Fragment, useEffect, useState } from "react";
import Modal, { ModalProps } from "../ui/Modal";
import { useParams } from "react-router-dom";
import AdminSetAddressModal from "./AdminSetAddressModal";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import PromiseButton from "../ui/PromiseButton";
import LaneThrough from "../ui/LaneThrough";
import AdminInput from "./AdminInput";
import Select from "react-select";
import { CATEGORY_ARRAY } from "../../../constatns";
import { useAppSelector } from "../../redux/store";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useSubmit } from "./EditRestaurantForm.hooks";

interface IFormInput {
  name: string;
  rating: number | null;
  isCustomRating: boolean;
  youtubeLink: string;
  googleLink: string;
  category: any;
}

interface IAddressState {
  street: string | undefined;
  zipCode: string | undefined;
  city: string | undefined;
  country: string | undefined;
  coordinates: [number, number] | undefined;
}

function EditRestaurantForm({ isShow, setIsShow }: ModalProps) {
  const { id } = useParams();
  const { restaurants } = useAppSelector((state) => state.restaurants);
  const currentRestaurant = restaurants.find((item) => item._id === id);
  const options = CATEGORY_ARRAY.map((item) => ({ value: item, label: item }));

  const { submit, isLoading, isError, error, isSuccess } = useSubmit();

  const { register, handleSubmit, watch, control, formState } = useForm<IFormInput>({
    defaultValues: {
      name: currentRestaurant?.name,
      rating: Number(currentRestaurant?.rating),
      isCustomRating: currentRestaurant?.rating === "challange ostrości" ? true : false,
      youtubeLink: currentRestaurant?.youtubeLink,
      googleLink: currentRestaurant?.googleLink,
      category: currentRestaurant?.category,
    },
  });

  const [addressState, setAddressState] = useState<IAddressState>({
    street: currentRestaurant?.address.street,
    zipCode: currentRestaurant?.address.zipCode,
    city: currentRestaurant?.address.city,
    country: currentRestaurant?.address.country,
    coordinates: currentRestaurant?.geometry.coordinates,
  });
  const [showSetAddressModal, setShowSetAddressModal] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const completeData = {
      _id: id!,
      addressState,
      ...data,
    };
    submit(completeData);
  };

  return (
    <Fragment>
      <Modal isShow={isShow} setIsShow={setIsShow}>
        <form className="flex flex-col gap-6 w-full h-full lg:w-2/3" onSubmit={handleSubmit(onSubmit)}>
          <AdminInput
            field="name"
            label="Nazwa restauracji"
            type="text"
            placeholder="Nazwa restauracji"
            register={register}
            options={{ required: { value: true, message: "To jest wymagane!" } }}
            error={
              formState.errors.googleLink?.message ||
              (error && "data" in error
                ? error.data.fields?.includes("name")
                  ? error.data.message
                  : undefined
                : undefined)
            }
          />
          <div>
            <AdminInput
              field="rating"
              label="Ocena"
              type="number"
              placeholder="Od 0.1 do 5.0"
              register={register}
              options={{
                required: { value: true, message: "To jest wymagane!" },
                valueAsNumber: true,
                max: { value: 5, message: "Ocena nie jest w skali" },
                min: { value: 0.1, message: "Ocena nie jest w skali" },
                disabled: watch("isCustomRating"),
              }}
              error={formState.errors.rating?.message}
            />
            <div className="flex items-center gap-1 text-black mt-1 px-1">
              <input
                id="isCustomRating"
                type="checkbox"
                checked={watch("isCustomRating")}
                {...register("isCustomRating")}
              />
              <label htmlFor="isCustomRating">Challange ostrości 🌶️</label>
            </div>
          </div>
          <div className="relative w-11/12 lg:w-full">
            <AdminInput
              field="youtubeLink"
              label="Youtube"
              type="text"
              placeholder="https://youtu.be/exampleid"
              register={register}
              options={{
                required: { value: true, message: "To jest wymagane!" },
                pattern: { value: /[a-z]+:\/\/[a-z]+\.[a-z]+\//i, message: "Link niepoprawny!" }, // test if link is correct
              }}
              error={formState.errors.youtubeLink?.message}
            />
            <a
              target="_blank"
              href={watch("youtubeLink")}
              className="absolute right-[-8%] lg:right-[-6%] top-[50%] text-xl text-gray-700"
            >
              <FaExternalLinkAlt />
            </a>
          </div>
          <div className="relative w-11/12 lg:w-full">
            <AdminInput
              field="googleLink"
              label="Google"
              type="text"
              placeholder="https://maps.app.goo.gl/exampleid"
              register={register}
              options={{
                required: { value: true, message: "To jest wymagane!" },
                pattern: {
                  value: /[a-z]+:\/\/([a-z]+(\.[a-z]+)+)\//i, //test if link is correct
                  message: "Link niepoprawny!",
                },
              }}
              error={formState.errors.googleLink?.message}
            />
            <a
              target="_blank"
              href={watch("googleLink")}
              className="absolute right-[-8%] lg:right-[-6%] top-[50%] text-xl text-gray-700"
            >
              <FaExternalLinkAlt />
            </a>
          </div>
          <div>
            <span className="text-gray-700">Kategorie:</span>
            <Controller
              control={control}
              defaultValue={watch("category")}
              name="category"
              render={({ field }) => (
                <Select
                  id="category"
                  required
                  options={options}
                  defaultValue={watch("category")}
                  onChange={(val) => field.onChange(val.map((c) => c.value))}
                  isMulti={true}
                  onBlur={field.onBlur}
                  value={watch("category").map((item: string) => ({ label: item, value: item })) || undefined}
                  name={field.name}
                  ref={field.ref}
                  placeholder="Wybierz do trzech kategorii"
                  isOptionDisabled={() => field.value && field.value.length === 3}
                  className="capitalize"
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: "#9CA3AF",
                      background: "transparent",
                    }),
                  }}
                />
              )}
            />
          </div>

          <LaneThrough title="Adres" />
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setShowSetAddressModal(true)}
              className="w-full border border-gray-500 hover:border-primary-500 hover:bg-primary-600 transition-colors py-1 rounded-md"
            >
              Ustaw adres
            </button>
            <div className="flex gap-1 items-center mt-5">
              <span className="text-gray-600">Ulica:</span>
              <span className="text-lg">{addressState?.street || "-"}</span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="text-gray-600">Miasto:</span>
              <span className="text-lg">{addressState?.city || "-"}</span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="text-gray-600">Miasto:</span>
              <span className="text-lg">{addressState?.zipCode || "-"}</span>
            </div>
            <div className="flex gap-1 items-center">
              <span className="text-gray-600">Kraj:</span>
              <span className="text-lg">{addressState?.country || "-"}</span>
            </div>
          </div>
          {isError && (
            <div className="w-full bg-red-300 text-gray-900 flex items-center justify-center gap-2 py-2 rounded-md">
              <span>{error && "data" in error && error.data.message}</span>
            </div>
          )}
          <div className="w-full flex items-center gap-3 mt-auto">
            <PromiseButton
              type="submit"
              status={isLoading ? "loading" : isSuccess ? "success" : null}
              disabled={Object.values(addressState).some((x) => x === undefined)}
              className="w-1/2 bg-primary-500 py-1 rounded-md disabled:bg-gray-300"
            >
              Zapisz
            </PromiseButton>
            <button
              onClick={() => setIsShow(false)}
              type="button"
              className="w-1/2 border border-primary-500 py-1 rounded-md"
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
