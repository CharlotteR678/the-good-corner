import { useEffect, useState } from "react";
import axios from "axios";

import { AdCartType, CategoryType, Tag } from "../../type";
import { useNavigate } from "react-router-dom";
import "./AdsForm.css"
import { AddCategory } from "../category/AddCategory";
import { AddTag } from "../tag/AddTag";

export type AdAddsFormType = {
  ad: undefined | AdCartType;
};

export default function AdsForm({ ad }: AdAddsFormType) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: ad?.title || "",
    description: ad?.description || "",
    author: ad?.author || "",
    price: ad?.price || 0,
    city: ad?.city || "",
    category: 0,
    tags: ad?.tags || [],
  });
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [tag, setTag] = useState<Tag[]>([]);
  const [addCategory, setAddCategory] = useState<boolean>(false);
  const [addTag, setAddTag] = useState<boolean>(false);

  async function fetchCategory(): Promise<void> {
    const result = await axios.get<CategoryType[]>(
    "http://localhost:5000/category"
  );
  setCategory(result.data);
  if (formData.category === 0) {if (ad === undefined) {
    setFormData({
      ...formData,
      category: result.data[0].id,
    });
  } else {
    setFormData({
      ...formData,
      category: ad.category.id,
    });
  }}
    
  }

  
  async function fetchTag(): Promise<void> {
    const result = await axios.get<Tag[]>("http://localhost:5000/tag");
    setTag(result.data);
    
  }

  useEffect(() => {
    fetchCategory()
    fetchTag()
  }, []);

  const updateFormData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendFormDataInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const transformedData = {
        ...formData,
        category: { id: formData.category },
      };

      const data = ad ? 
      await axios.patch(
        `http://localhost:5000/ads/${ad.id}`,
        transformedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ) :  await axios.post(
        "http://localhost:5000/ads",
        transformedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.status === 201) {
        navigate(`/ads/${data.data.id}`);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const tagID = Number(value);
    if (checked) {
      setFormData({
        ...formData,
        tags: [...formData.tags, { id: tagID }],
      });
    } else {
      setFormData({
        ...formData,
        tags: formData.tags.filter((t) => t.id !== tagID),
      });
    }
  };

  const showAddCategory = () => {
    setAddCategory(!addCategory)
  }

  const showAddTag = () => {
    setAddTag(!addTag)
  }

  return (
    <div className="formPage">
      <h2>Publier une annonce</h2>
      <form onSubmit={(e) => sendFormDataInfo(e)} className="newAdsFrom">
        <label className="labelForm">
          <p>titre</p>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={(e) => updateFormData(e)}
            className="text-field"
          />
        </label>
        <label className="labelForm">
          <p>description</p>
          <input
            name="description"
            type="text"
            value={formData.description}
            onChange={(e) => updateFormData(e)}
            className="text-field"
          />
        </label>
        <label className="labelForm">
          <p>auteur</p>
          <input
            name="author"
            type="text"
            value={formData.author}
            onChange={(e) => updateFormData(e)}
            className="text-field"
          />
        </label>
        <label className="labelForm">
          <p>prix</p>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={(e) => updateFormData(e)}
            className="text-field"
          />
        </label>
        <label className="labelForm">
          <p>location</p>
          <input
            name="city"
            type="text"
            value={formData.city}
            onChange={(e) => updateFormData(e)}
            className="text-field"
          />
        </label>
        <label className="labelForm">
            {/* TO DO ajouter possibilité d'ajouter une catégorie / un tage côté client */}
          <p>categorie</p>
          <select
            name="category"
            onChange={(e) => updateFormData(e)}
            className="text-field"
          >
            {category.map((cat) => (
              <option value={cat.id} key={cat.id} selected={formData && formData.category === cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
            </label>
          <button onClick={showAddCategory} className="button" type="button">Ajouter une catégorie</button>
          {addCategory && <AddCategory onCategoryCreated={(id) => { showAddCategory(); fetchCategory();  setFormData({
      ...formData,
      category: id,
    }); }} />}
          <div className="checkboxDiv">
            {tag.map((t) => (
              <label className="checkboxForm" key={t.id}>
                <input
                  type="checkbox"
                  id="tag"
                  checked={formData.tags.some((tag) => tag.id === t.id)} 
                  name={t.name}
                  value={t.id}
                  onChange={(e) => handleTagChange(e)}
                />
                {t.name}
              </label>
            ))}
          </div>
          <button onClick={showAddTag} className="button" type="button">Ajouter un tag</button>
          {addTag && <AddTag onTagCreated={(id) => { showAddTag(); fetchTag();  setFormData({
        ...formData,
        tags: [...formData.tags, { id }],
      }); }} />}
        <button className="button" type="submit">
          {ad ? "Modifier mon annonce" : "Enregistrer mon annonce"}
        </button>
      </form>
    </div>
  );
}
