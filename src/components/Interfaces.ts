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
    isShow: boolean;
    handleModel: Function
    additionalFeature: Array<IAdditionalFeatures>
    setAdditionalFeatures: Function
}
