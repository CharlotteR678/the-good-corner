import { useEffect, useState } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AdCartType } from "../../type";
import "./AdDetails.css"

export default function AdDetails() {
    const {id} = useParams<Params>();
    const [ad, setAd] = useState<AdCartType>()
    const navigate = useNavigate()

    

    useEffect(() => {
      async function fetchData(): Promise<void> {
            const result =  await axios.get<AdCartType>(`http://localhost:5000/ads/${id}`);
            setAd(result.data)
      }
  
      fetchData()

    }, [id]);

    const deleteAds = async (): Promise<void> => {

        try {
          const result =  await axios.delete<AdCartType>(`http://localhost:5000/ads/${id}`);
          if (result.status === 200) {
            return navigate("/", {replace : true});
          } 
        else {
          console.log("error")
        }}
        catch(err) {
          console.error(err)
        }

}

    if (!ad) {
      return <p>Chargement ...</p>
    }
    return (
      <>
      <div className="adDetailsDiv">
        <div className="headerAdDetails">
          <h2>{ad.title}</h2>
          <p>{ad.description}</p>
          </div>
          <ul >
          <li className="adDescription"><p>Prix </p> <p>{ad.price} €</p></li>
          <hr className="hrAdDescription"/>
          <li className="adDescription"><p>Auteur </p> <p>{ad.author}</p></li>
          <hr className="hrAdDescription"/>
          <li className="adDescription"><p>Localisation </p> <p>{ad.city}</p></li>
          <hr className="hrAdDescription"/>
          <li className="adDescription"><p>Categorie </p> <p>{ad.category.name}</p></li>
          <hr className="hrAdDescription"/>

            {
            ad.tags &&
            <li className="adDescriptionTag">
          {ad.tags.map((t)=> <p key={t.id} className="tags">{t.name}</p>)}
          </li>}
          </ul>
      <div className="adDescriptionButtonList">
        <button className="button" type="button" onClick={() => navigate(`/ads/modify/${id}`)}>Modifier mon annonce</button>
        <button className="button" type="button" onClick={deleteAds}>supprimer mon annonce</button>
      </div>
      </div>
      </>
    );
  }