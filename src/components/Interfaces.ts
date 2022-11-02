export interface IPokemon {
    name: string,
    url: string,
    id?: string,
}

export interface IPokemonTypes {
    slot: string;
    type: IPokemonType
}

export interface IPokemonType  {
    name: string;
    url: string;
}

export interface IPokemonAbilities {
    ability:  IPokemonAbility;
    is_hidden: boolean;
    slot: number;
}

export interface  IPokemonAbility {
    name: string;
    url: string;
}

export interface IPokemonStats {
    base_stat: number;
    effort: number;
    stat: IPokemonStat;
}

export interface IPokemonStat {
    name: string;
    url: string
}

export interface IAdditionalFeatures {
    name: string;
    value: string;
}

export interface IAddModel {
    id?:string;
    isShow: boolean;
    handleModel: Function
    additionalFeature: Array<IAdditionalFeatures>
    setAdditionalFeatures: Function
}

export interface IAddPokemon {
    id: string;
    name: string;
    height: number;
    weight: number;
    type: string;
    ability: string;
}

export interface PokemonDetail {
    id: number|null,
    name: string,
    image: string[],
    height: number | null,
    weight?: number | null,
    types: Array<IPokemonTypes>
    abilities: Array<IPokemonAbilities>
    stats: Array<IPokemonStats>
}
