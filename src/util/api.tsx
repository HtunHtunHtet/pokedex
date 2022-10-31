const root = `https://pokeapi.co/api/v2`;

export function getAllPokemons() {
    return fetch(`${root}/pokemon/`)
        .then(result => result.json())
        .then(result => result)
}
