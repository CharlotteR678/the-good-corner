import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdsCart from "../components/ads/AdsCart";
import { CategoryType } from "../type";

export default function CategoryList() {
    const {id} = useParams();
    const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
    const [price, setPrice] =useState(0);
  
    useEffect(() => {
      async function fetchData(): Promise<void> {
        const result =  await axios.get<CategoryType[]>(`http://localhost:5000/category/${id}`);
        setCategoryList(result.data)
      }
  
      fetchData()
    }, [id]);

    const addToCart = (adPrice: number) => {
        setPrice(price + adPrice);
      };

      if (categoryList[0]?.ads?.length === 0) {
        <h2>{categoryList[0]?.name} </h2>
        return <p>Aucun item ne correpons à cette catégorie pour le moment</p>
      }


    return (
      <>
      <h2>{categoryList[0]?.name} </h2>
    <section className="recent-ads">
        {
          categoryList[0]?.ads?.map((cat) => 
          <AdsCart 
          key={cat.id}
          id={cat.id}
          title={cat.title} price={cat.price}
          addToCart={addToCart}/>
        )
        }
      </section>
      </>)
}