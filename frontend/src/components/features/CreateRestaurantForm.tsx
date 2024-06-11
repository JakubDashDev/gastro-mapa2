import Modal, { ModalProps } from "../ui/Modal";
import { Fragment, useState } from "react";
import LaneThrough from "../ui/LaneThrough";
import { CATEGORY_ARRAY } from "../../../constatns";
import PromiseButton from "../ui/PromiseButton";
import AdminSetAddressModal from "./AdminSetAddressModal";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import AdminInput from "./AdminInput";
import Select from "react-select";
import { useCreateNewRestaurant } from "./CreateRestrauantForm.hooks";

interface IFormInput {
  name: string;
  rating: number | null;
  isCustomRating: boolean;
  youtubeLink: string;
  googleLink: string;
  category: string[];
}

interface IAddressState {
  street: string | undefined;
  zipCode: string | undefined;
  city: string | undefined;
  country: string | undefined;
  coordinates: [number, number] | undefined;
}

function CreateRestaurantForm({ isShow, setIsShow }: ModalProps) {
  const { register, handleSubmit, watch, control, formState } = useForm<IFormInput>({
    defaultValues: {
      isCustomRating: false,
    },
  });

  const { createNewRestaurant, isLoading, isError, error, isSuccess } = useCreateNewRestaurant();
  const options = CATEGORY_ARRAY.map((item) => ({ value: item, label: item }));

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const completeData = {
      addressState,
      ...data,
    };
    createNewRestaurant(completeData);
  };

  //address input
  const [addressState, setAddressState] = useState<IAddressState>({
    street: undefined,
    zipCode: undefined,
    city: undefined,
    country: undefined,
    coordinates: undefined,
  });
  const [showSetAddressModal, setShowSetAddressModal] = useState(false);

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
              <input id="isCustomRating" type="checkbox" {...register("isCustomRating")} />
              <label htmlFor="isCustomRating">Challange ostrości 🌶️</label>
            </div>
          </div>
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
          <div>
            <span className="text-gray-700">Kategorie:</span>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select
                  id="category"
                  required
                  options={options}
                  onChange={(val) => field.onChange(val.map((c) => c.value))}
                  isMulti={true}
                  onBlur={field.onBlur}
                  value={options.filter((el) => field.value?.includes(el.value)) || undefined}
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

export default CreateRestaurantForm;
