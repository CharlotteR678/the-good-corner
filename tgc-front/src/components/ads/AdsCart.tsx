import { Link } from "react-router-dom";

export type AdsCartProps = {
  title : string, 
  price : number, 
  id : number
}
    
export default function AdsCart({ title, price, id, addToCart } : AdsCartProps & { addToCart: (price : number) => void }) {
    return (
      <div className="ad-card-container">
        <Link className="ad-card-link" to={`/ads/${id}`}>
          <div className="ad-card-text">
            <div className="ad-card-title">{title}</div>
            <div className="ad-card-price"> {price} €</div>
          </div>
          </Link>
          <button className="button" onClick={() => addToCart(price)}>Add to Cart</button>
      </div>
    );
  }
  