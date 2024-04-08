import Input from "./Input";
import Modal, { ModalProps } from "../ui/Modal";
import Select from "react-select";
import { Fragment, useState } from "react";
import MapGeocoder from "./MapGeocoder";
import { Result } from "@mapbox/mapbox-gl-geocoder";
import LaneThrough from "../ui/LaneThrough";
import { CATEGORY_ARRAY } from "../../../constatns";
import { handleFormState, useHandleSubmit } from "./CreateRestrauantForm.hooks";
import PromiseButton from "../ui/PromiseButton";

function CreateRestaurantForm({ isShow, setIsShow }: ModalProps) {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    rating: 0,
    youtubeLink: "",
    googleLink: "",
  });
  const [category, setCategory] = useState<any>(null);
  const [addressState, setAddressState] = useState<{
    street: string | undefined;
    zipCode: string | undefined;
    city: string | undefined;
    country: string | undefined;
    latLng: number[] | undefined;
  }>({
    street: undefined,
    zipCode: undefined,
    city: undefined,
    country: undefined,
    latLng: undefined,
  });

  const { createRestaurant, isLoading, error, isSuccess, isError, reset } = useHandleSubmit();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await createRestaurant({ event: e, formState, addressState, category, setIsShow });
  };

  return (
    <Fragment>
      <Modal isShow={isShow} setIsShow={setIsShow}>
        <form className="w-full h-full lg:w-2/3 flex flex-col justify-center gap-5" onSubmit={handleSubmit}>
          <Input
            id="name"
            name="name"
            type="text"
            label="Nazwa restauracji"
            value={formState.name}
            onChange={(e) => handleFormState({ event: e, setFormState: setFormState, reset: reset })}
            required
            error={
              (error &&
                "data" in error &&
                error?.data.message === "Restauracja o tej nazwie już istnieje!" &&
                error.data?.message) ||
              null
            }
          />
          <div>
            <Input
              id="rating"
              name="rating"
              type="number"
              label="Ocena"
              value={formState.rating}
              onChange={(e) => handleFormState({ event: e, setFormState: setFormState, reset: reset })}
              min="0"
              max="5"
              step="0.1"
              required
            />
            <span className="text-sm text-gray-400">Zakres ocen: 0 - 5, w tym 5 = MUALA</span>
          </div>
          <Input
            id="youtubeLink"
            name="youtubeLink"
            type="text"
            label="YouTube link"
            value={formState.youtubeLink}
            onChange={(e) => handleFormState({ event: e, setFormState: setFormState, reset: reset })}
            required
          />
          <Input
            id="googleLink"
            name="googleLink"
            type="text"
            label="Google link:"
            value={formState.googleLink}
            onChange={(e) => handleFormState({ event: e, setFormState: setFormState, reset })}
            required
          />
          <div className="flex flex-col gap-1 w-full">
            <span className="text-white">Kategorie </span>
            <Select
              defaultValue="Kategorie"
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
          <div className="flex flex-col gap-5">
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
                <span className="text-white">{addressState.street || "-"}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-white/50">Kod pocztowy:</span>
                <span className="text-white">{addressState.zipCode || "-"}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-white/50">Miato:</span>
                <span className="text-white">{addressState.city || "-"}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-white/50">Kraj:</span>
                <span className="text-white">{addressState.country || "-"}</span>
              </div>
            </div>
          </div>

          <div className="w-full mt-auto flex items-center justify-center gap-4">
            <PromiseButton
              type="submit"
              bgColor="primary-500"
              isSuccess={isSuccess}
              isLoading={isLoading}
              isError={isError}
              disabled={Object.values(addressState).some((el) => el === undefined)}
            >
              Zapisz
            </PromiseButton>
            <button
              type="button"
              className="border border-primary-400  hover:border-primary-500 transiton-colors w-full py-1 rounded-lg text-white"
              onClick={() => setIsShow(false)}
            >
              Anuluj
            </button>
          </div>
        </form>
      </Modal>
      <AddressModal isShow={showAddressModal} setIsShow={setShowAddressModal} setAddressState={setAddressState} />
    </Fragment>
  );
}

export default CreateRestaurantForm;

type AddressModalProps = ModalProps & {
  setAddressState: React.Dispatch<
    React.SetStateAction<{
      street: string | undefined;
      zipCode: string | undefined;
      city: string | undefined;
      country: string | undefined;
      latLng: number[] | undefined;
    }>
  >;
};

function AddressModal(props: AddressModalProps) {
  const [result, setResult] = useState<Result | null>(null);

  const saveResult = () => {
    const street = result!.place_name.split(",")[0];
    const latLng = result!.center;
    const city = result?.context.find((obj) => obj.id.includes("place")).text;
    const zipCode = result?.context.find((obj) => obj.id.includes("postcode")).text;
    const country = result?.context.find((obj) => obj.id.includes("country")).text;

    props.setAddressState({
      street,
      latLng,
      city,
      zipCode,
      country,
    });
    props.setIsShow((current) => !current);
  };

  return (
    <Modal isShow={props.isShow} setIsShow={props.setIsShow}>
      <MapGeocoder setResult={setResult} />

      <div className="w-full lg:w-1/2 flex gap-5">
        <button type="button" className="w-full bg-blue-500 rounded-lg py-1 text-white" onClick={saveResult}>
          Zapisz
        </button>
        <button
          type="button"
          className="w-full rounded-lg py-1 text-white border border-blue-500"
          onClick={() => props.setIsShow(false)}
        >
          Anuluj
        </button>
      </div>
    </Modal>
  );
}