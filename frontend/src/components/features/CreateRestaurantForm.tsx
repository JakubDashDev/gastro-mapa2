import Input from "./Input";
import Modal, { ModalProps } from "../ui/Modal";
import Select from "react-select";
import { Fragment, forwardRef, useEffect, useRef, useState } from "react";
import MapGeocoder from "./MapGeocoder";
import LaneThrough from "../ui/LaneThrough";
import { CATEGORY_ARRAY } from "../../../constatns";
import PromiseButton from "../ui/PromiseButton";
import AdminInput from "./AdminInput";
import AdminRatingInput from "./AdminRatingInput";
import AdminCategorySelect from "./AdminCategorySelect";
import AdminAddressInput from "./AdminAddressInput";
import AdminSetAddressModal from "./AdminSetAddressModal";
import {
  googleValidation,
  nameFormValidation,
  ratingValidation,
  useCreateNewRestaurant,
  youtubeFormValdation,
} from "./CreateRestrauantForm.hooks";
import { useAppSelector } from "../../redux/store";

interface IAddressState {
  street: string | undefined;
  zipCode: string | undefined;
  city: string | undefined;
  country: string | undefined;
  coordinates: [number, number] | undefined;
}

function CreateRestaurantForm({ isShow, setIsShow }: ModalProps) {
  const { createNewRestaurant, isLoading, isError, error, isSuccess, reset } = useCreateNewRestaurant();

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
  const [showSetAddressModal, setShowSetAddressModal] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name,
      rating,
      isCustomRating,
      youtubeLink,
      googleLink,
      category: category.map((item: any) => item.value),
      addressState,
    };

    createNewRestaurant(data);
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsShow(false);
        reset();
      }, 1000);
    }
  }, [isSuccess]);

  return (
    <Fragment>
      <Modal isShow={isShow} setIsShow={setIsShow}>
        <form className="flex flex-col gap-8 w-full h-full lg:w-2/3" onSubmit={(e) => handleSubmit(e)}>
          <AdminInput
            labelStyles="bg-darkBg text-white"
            label="Nazwa"
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value), reset();
            }}
            required
            validation="name"
          />
          <AdminRatingInput
            rating={rating}
            setRating={setRating}
            setIsCustomRating={setIsCustiomRating}
            isCustomRating={isCustomRating}
          />
          <AdminInput
            labelStyles="bg-darkBg text-white"
            label="Youtube"
            id="yt"
            name="yt"
            type="text"
            value={youtubeLink}
            onChange={(e) => {
              setYoutubeLink(e.target.value), reset();
            }}
            required
          />
          <AdminInput
            labelStyles="bg-darkBg text-white"
            label="Google"
            id="google"
            name="google"
            type="text"
            value={googleLink}
            onChange={(e) => setGoogleLink(e.target.value)}
            required
          />
          <AdminCategorySelect category={category} setCategory={setCategory} />
          <LaneThrough title="Adres" />
          <AdminAddressInput addressState={addressState} setShowSetAddressModal={setShowSetAddressModal} />

          {isError && (
            <div className="w-full bg-red-900/50 border border-red-500 rounded-md flex items-center justify-center text-white px-4 py-2">
              {error && "data" in error ? error.data.message : "Wystąpił nieoczekiwany błąd 💔. Odśwież stronę."}
            </div>
          )}

          <div className="mt-auto w-full flex gap-2 text-white">
            <PromiseButton
              status={isLoading ? "loading" : isError ? "error" : isSuccess ? "success" : null}
              type="submit"
              className="bg-primary-500 hover:bg-primary-400 rounded-md"
            >
              Zapisz
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

export default CreateRestaurantForm;
