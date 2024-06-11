import React, { useState } from "react";
import AdminSetAddressModal from "./AdminSetAddressModal";

interface IAddressState {
  street: string | undefined;
  zipCode: string | undefined;
  city: string | undefined;
  country: string | undefined;
  coordinates: number[] | undefined;
}

interface IAdminAddressInputProps {
  addressState: IAddressState;
  setShowSetAddressModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function AdminAddressInput({ addressState, setShowSetAddressModal }: IAdminAddressInputProps) {
  return (
    <div>
      <button
        type="button"
        onClick={() => setShowSetAddressModal(true)}
        className="w-full rounded-lg border border-gray-500 text-white py-2 hover:text-primary-500 transition-colors"
      >
        Ustaw adres
      </button>
      <div className="text-gray-400 mt-5 flex flex-col gap-1">
        <span>
          Ulica: <span className="text-white">{addressState.street || "-"}</span>
        </span>
        <span>
          Miasto: <span className="text-white">{addressState.city || "-"}</span>
        </span>
        <span>
          Kod pocztowy: <span className="text-white">{addressState.zipCode || "-"}</span>
        </span>
        <span>
          Kraj: <span className="text-white">{addressState.country || "-"}</span>
        </span>
      </div>
    </div>
  );
}

export default AdminAddressInput;
