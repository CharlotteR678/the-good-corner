import axios from "axios";
import { useState } from "react";
import { CategoryType } from "../../type";

export type onCategoryCreatedProps = {
    onCategoryCreated: (id : number) => void;
}

export function AddCategory({ onCategoryCreated }: onCategoryCreatedProps) {
  const [name, setName] = useState("");

  async function doSubmit() {
    try {
      const response = await axios.post<CategoryType>("http://localhost:5000/category", {
        name,
      });
      setName("");
      onCategoryCreated(response.data.id);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div >
      <label>
        Nom de la catégorie :
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <button type="button" className="button" onClick={doSubmit}>
        Créer ma catégorie
      </button>
    </div>
  );
}