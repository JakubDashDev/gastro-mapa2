import Input from "./Input";
import Modal, { ModalProps } from "../ui/Modal";
import Select from "react-select";
import { Fragment, useEffect, useState } from "react";
import MapGeocoder from "./MapGeocoder";
import { Result } from "@mapbox/mapbox-gl-geocoder";
import LaneThrough from "../ui/LaneThrough";
import { CATEGORY_ARRAY } from "../../../constatns";
import { handleFormState, useHandleSubmit } from "./CreateRestrauantForm.hooks";
import PromiseButton from "../ui/PromiseButton";

type addressStateType = {
  street: string | undefined;
  zipCode: string | undefined;
  city: string | undefined;
  country: string | undefined;
  lngLat: number[] | undefined;
};

type formStateType = {
  name: string;
  rating: number | string | undefined;
  youtubeLink: string;
  googleLink: string;
};

function CreateRestaurantForm({ isShow, setIsShow }: ModalProps) {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [formState, setFormState] = useState<formStateType>({
    name: "",
    rating: "",
    youtubeLink: "",
    googleLink: "",
  });
  const [category, setCategory] = useState<any>(null);
  const [addressState, setAddressState] = useState<addressStateType>({
    street: undefined,
    zipCode: undefined,
    city: undefined,
    country: undefined,
    lngLat: undefined,
  });

  const { createRestaurant, isLoading, error, isSuccess, isError, reset } = useHandleSubmit();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await createRestaurant({ event: e, formState, setFormState, addressState, setAddressState, category, setIsShow });
  };
  const setChallange = () => {
    setFormState((current) => ({
      ...current,
      rating: current.rating === "challange ostrości" ? 0 : "challange ostrości",
    }));
  };

  useEffect(() => {
    setTimeout(() => reset(), 1000);
    isShow ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "auto");
  }, [isShow]);

  return (
    <Fragment>
      <Modal isShow={isShow} setIsShow={setIsShow}>
        <form className="w-full h-full lg:w-2/3 flex flex-col items-center gap-5" onSubmit={handleSubmit}>
          <Input
            id="name"
            name="name"
            type="text"
            label="Nazwa restauracji"
            value={formState.name}
            onChange={(e) => handleFormState({ event: e, setFormState: setFormState, reset: reset })}
            required
            error={error && "data" in error && error.data.fields?.includes("name") ? error.data.message : null}
            styles="bg-dashboardSecondary border-dashboardSecondary text-white"
            labelClassName="text-white"
          />
          <div className="w-full">
            <div>
              <Input
                id="rating"
                name="rating"
                type="text"
                label="Ocena"
                value={formState.rating}
                onChange={(e) => handleFormState({ event: e, setFormState: setFormState, reset: reset })}
                disabled={formState.rating === "challange ostrości"}
                required
                error={error && "data" in error && error.data.fields?.includes("rating") ? error.data.message : null}
                styles="capitalize bg-dashboardSecondary border-dashboardSecondary text-white"
                labelClassName="text-white"
              />
              <span className="text-sm text-gray-400">Zakres ocen: 0 - 5, w tym 5 = MUALA</span>
              <div className="flex gap-1 items-center">
                <input
                  type="checkbox"
                  className="text-red-500"
                  onChange={setChallange}
                  checked={formState.rating === "challange ostrości"}
                />
                <label className="text-red-500">Challange Ostrości 🌶️</label>
              </div>
            </div>
          </div>
          <Input
            id="youtubeLink"
            name="youtubeLink"
            type="text"
            label="YouTube link"
            value={formState.youtubeLink}
            onChange={(e) => handleFormState({ event: e, setFormState: setFormState, reset: reset })}
            required
            styles="bg-dashboardSecondary border-dashboardSecondary text-white"
            labelClassName="text-white"
          />
          <Input
            id="googleLink"
            name="googleLink"
            type="text"
            label="Google link:"
            value={formState.googleLink}
            onChange={(e) => handleFormState({ event: e, setFormState: setFormState, reset })}
            required
            styles="bg-dashboardSecondary border-dashboardSecondary text-white"
            labelClassName="text-white"
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
              className="capitalize"
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
              disabled={!isSuccess && Object.values(addressState).some((el) => el === undefined)}
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
      lngLat: number[] | undefined;
    }>
  >;
  initalMarker?: {
    lat: number;
    lng: number;
  };
  center?: {
    lat: number;
    lng: number;
  };
};

export function AddressModal(props: AddressModalProps) {
  const [result, setResult] = useState<Result | null>(null);

  const saveResult = () => {
    const street = result!.place_name.split(",")[0];
    const lngLat = result!.center;
    const city = result?.context.find((obj) => obj.id.includes("place")).text;
    const zipCode = result?.context.find((obj) => obj.id.includes("postcode")).text;
    const country = result?.context.find((obj) => obj.id.includes("country")).text;

    props.setAddressState({
      street,
      lngLat,
      city,
      zipCode,
      country,
    });
    props.setIsShow((current) => !current);
  };

  return (
    <Modal isShow={props.isShow} setIsShow={props.setIsShow}>
      <MapGeocoder setResult={setResult} initalMarker={props.initalMarker} center={props.center} />

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
