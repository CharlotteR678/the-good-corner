import { useEffect, useState } from 'react';

import axios from 'axios';
import AdsCart, { AdsCartProps } from '../../components/ads/AdsCart';

function App() {
  const [ads, setAds] = useState<AdsCartProps[]>([]);
  const [price, setPrice] =useState(0)

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const result =  await axios.get<AdsCartProps[]>("http://localhost:5000/ads");
      setAds(result.data)
    }

    fetchData()
  }, []);

  const addToCart = (adPrice: number) => {
    setPrice(price + adPrice);
  };

  return (
    <div>
        <h2>Annonces récentes</h2>
        <p> panier : {price}</p>
        <section className="recent-ads">
          {
            ads.map((ad) => 
            <AdsCart 
            key={ad.id}
            id={ad.id}
            title={ad.title} price={ad.price}
            addToCart={addToCart}/>
          )
          }
        </section>
    </div>
  );
}

export default App;
