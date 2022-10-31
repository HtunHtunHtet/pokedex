const root = `https://pokeapi.co/api/v2`;

export function getAllPokemons(offset =0 , limit = 20) {
    return fetch(`${root}/pokemon/?offset=${offset}&limit=${limit}`)
        .then(result => result.json())
        .then(result => result)
}
