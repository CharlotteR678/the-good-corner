import { Link } from "react-router-dom";

export type categoryCartProps = {
    id : number;
    name : string
}

// TODO envoyer par id / name pour afficher les catégories via les catégories dans le back

export default function CategoryCard ({name, id} : categoryCartProps){
    return <Link to={`/categoryList/${id}`} className="category-navigation-link">{name}</Link>;
}