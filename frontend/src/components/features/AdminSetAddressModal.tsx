import React, { useState } from "react";
import Modal, { ModalProps } from "../ui/Modal";
import MapGeocoder from "./MapGeocoder";

interface IAddressState {
  street: string | undefined;
  zipCode: string | undefined;
  city: string | undefined;
  country: string | undefined;
  coordinates: [number, number] | undefined;
}

interface AddressModalProps extends ModalProps {
  setAddressState: React.Dispatch<React.SetStateAction<IAddressState>>;
}

function AdminSetAddressModal({ setAddressState, ...modal }: AddressModalProps) {
  const [result, setResult] = useState<any>();

  const saveResult = () => {
    const street = result?.place_name.split(",")[0];
    const coordinates = result?.center;
    const city = result?.context.find((obj: any) => obj.id.includes("place")).text;
    const zipCode = result?.context.find((obj: any) => obj.id.includes("postcode")).text;
    const country = result?.context.find((obj: any) => obj.id.includes("country")).text;

    setAddressState({
      street,
      city,
      coordinates,
      zipCode,
      country,
    });

    modal.setIsShow(false);
  };
  return (
    <Modal isShow={modal.isShow} setIsShow={modal.setIsShow}>
      <MapGeocoder setResult={setResult} />

      <div className="w-full lg:w-1/2 flex gap-5">
        <button type="button" className="w-full bg-blue-500 rounded-lg py-1 text-white" onClick={saveResult}>
          Zapisz
        </button>
        <button
          type="button"
          className="w-full rounded-lg py-1 border border-blue-500"
          onClick={() => modal.setIsShow(false)}
        >
          Anuluj
        </button>
      </div>
    </Modal>
  );
}

export default AdminSetAddressModal;
