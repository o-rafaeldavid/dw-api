import { useParams } from "react-router-dom";
import { useREQuery } from "../global/graphql/useREquery";
import NotFound from "./404";
import PokemonPage from "../components/pokemon/pokemonpage/pokemonpage";

import '../scss/pokemon.scss'
import PaginaAsideProvider from "../contexts/pokemon/paginaAside";

export default function Pokemon(){
    const params = useParams()
    const pkmn = params.pkmn




    const queryPkmnURL = useREQuery({query:`
            pokemon_v2_pokemonspecies(where: {name: {_eq: "${pkmn}"}}) {
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