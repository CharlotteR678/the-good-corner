export type Tag = {
    id : number
    name? : string
    };

export type AdCartType = {
    id : number
    title : string
    description? : string
    author? : string
    price : number
    city : string,
    category : CategoryType;
    tags? : Tag[]
    };

    export type CategoryType = {
        id: number
        name : string
        ads? : AdCartType[]
    }