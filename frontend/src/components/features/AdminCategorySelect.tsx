import React from "react";
import { CATEGORY_ARRAY } from "../../../constatns";
import Select from "react-select";

interface IAdminCategorySelect {
  category: any;
  setCategory: React.Dispatch<any>;
}

function AdminCategorySelect({ category, setCategory }: IAdminCategorySelect) {
  const options = CATEGORY_ARRAY.map((item) => ({ value: item, label: item }));

  return (
    <div className="w-full flex flex-col gap-1">
      <Select
        id="editSelect"
        options={options}
        isMulti
        className="capitalize"
        placeholder="Wybierz do 3 kategorii"
        value={category}
        onChange={setCategory}
        isOptionDisabled={() => category.length === 3}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            background: "transparent",
            borderRadius: "0.5rem",
            borderColor: "#6B7280",
            padding: "4px 0px 4px 0px",
          }),
        }}
      />
    </div>
  );
}

export default AdminCategorySelect;
