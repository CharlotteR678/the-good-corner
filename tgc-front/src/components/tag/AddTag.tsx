import axios from "axios";
import { useState } from "react";
import { CategoryType } from "../../type";

export type OnTagCreated= {
    onTagCreated: (id: number) => void;
  };

export function AddTag({ onTagCreated }: OnTagCreated) {
  const [name, setName] = useState("");

  async function doSubmit() {
    try {
        const result = await axios.post<CategoryType>("http://localhost:5000/tag", {
        name,
      });
      setName("");
      onTagCreated(result.data.id);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div >
      <label>
        Nom du tag :
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <button type="button" className="button" onClick={doSubmit}>
        Créer mon tag
      </button>
    </div>
  );
}