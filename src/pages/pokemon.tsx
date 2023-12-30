import { useLocation } from "react-router-dom";
import { useREQuery } from "../global/graphql/useREquery";
import NotFound from "./404";
import PokemonPage from "../components/pokemon/pokemonpage/pokemonpage";

import '../scss/pokemon.scss'
import PaginaAsideProvider from "../contexts/pokemon/paginaAside";

export default function Pokemon(){
    const location = useLocation();
    const { pathname } = location;

    const lastIndexBarra = pathname.lastIndexOf('/')
    const pokemonToGet = pathname.substring(lastIndexBarra + 1, pathname.length)



    const queryPkmnURL = useREQuery({query:`
            pokemon_v2_pokemonspecies(where: {name: {_eq: "${pokemonToGet}"}}) {
                id
                name
                generation_id



                pokemon_v2_pokemons(order_by: {id: asc}) {
                    name
                    weight
                    pokemon_species_id

                    pokemon_v2_pokemonstats {
                        base_stat
                        pokemon_v2_stat {
                            name
                        }
                    }

                    pokemon_v2_pokemonabilities {
                        ability_id
                        pokemon_v2_ability {
                        name
                        pokemon_v2_abilityeffecttexts(where: {language_id: {_eq: 9}}) {
                            effect
                            language_id
                        }
                        }
                    }

                    pokemon_v2_pokemontypes {
                        pokemon_v2_type {
                            name
                        }
                    }

                    pokemon_v2_pokemonsprites {
                        sprites
                    }
                }



                pokemon_v2_evolutionchain {
                    pokemon_v2_pokemonspecies(order_by: {order: asc}) {
                        name
                        pokemon_v2_pokemons(order_by: {id: asc}) {
                            pokemon_v2_pokemonsprites {
                                sprites
                            }
                        }
                    }
                }
            }
        `}
    )

    const ret = () => {
        if(queryPkmnURL.isLoading) return <p>loading</p>
        else{
            const res = queryPkmnURL.res
            const especies = res.pokemon_v2_pokemonspecies
            if(especies.length === 0) return <NotFound/>
            else return(
                <PaginaAsideProvider>
                    <PokemonPage especies={especies}/>
                </PaginaAsideProvider>
            )
        }
    }
    return(
        <>
            {
                (queryPkmnURL.isLoading) ? <p>loading</p>
                : <></>
            }
        </>
    )
}