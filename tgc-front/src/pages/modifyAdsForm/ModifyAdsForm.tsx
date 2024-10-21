import { useEffect, useState } from "react";
import { Params, useParams } from "react-router-dom";
import axios from "axios";
import { AdCartType } from "../../type";
import AdsForm from "../../components/Form/AdsForm";

export default function ModifyAdsForm() {
    const {id} = useParams<Params>();
    const [ad, setAd] = useState<AdCartType>()

    useEffect(() => {
      async function fetchData(): Promise<void> {
            const result =  await axios.get<AdCartType>(`http://localhost:5000/ads/${id}`);
            setAd(result.data)
      }
  
      fetchData()

    }, [id]);

    if (!ad) {
      return <p>Chargement ...</p>
    }

      return <AdsForm ad={ad} />
  }