export const root = `https://pokeapi.co/api/v2`;

export  function getAllPokemons(offset: number =0 , limit:number = 20) {
    return getDataFromURL(`${root}/pokemon/?offset=${offset}&limit=${limit}`)
}

export function getPokemon(id: string): Promise<any> {
    return getDataFromURL(`${root}/pokemon/${id}/`)
}

export function getDataFromURL(url: string): Promise<any> {
    return fetch(url)
        .then(result => result.json())
        .then(result => result)
}
