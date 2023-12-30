import { useContext, useEffect, useRef, useState } from "react"
import { ThemeTypeContext } from "../../../contexts/themeType"
import NavigateLists from "./navigateLists"
import { PaginaAsideContext } from "../../../contexts/pokemon/paginaAside"
import PokemonPageMain from "./mainContainer"
import { capitalizarPosTracos } from "../../../global/ts/functions"
import { WindowDimensionContext } from "../../../contexts/windowResize"
import Cruz from "../../layout/cruz"
import { iconsColorByName } from "../../../global/ts/icons"

/* 
pokemon_v2_pokemonspecies(where: {name: {_eq: "charizard"}}) {
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
*/

export default function PokemonPage({especies} : {especies : any}){
    const { themeType, setThemeType } = useContext(ThemeTypeContext)
    const {windowWidth} = useContext(WindowDimensionContext)

    const linhaEvolutiva = especies[0]
                                .pokemon_v2_evolutionchain
                                .pokemon_v2_pokemonspecies

    
    //  index das várias formas disponíveis deste pokemon
    const [pkmnAtualindex, setPkmnAtualindex] = useState<number>(0)

    useEffect(
        () => {
            setThemeType(
                especies[0]
                    .pokemon_v2_pokemons[pkmnAtualindex]
                    .pokemon_v2_pokemontypes[0]
                    .pokemon_v2_type
                    .name
            )
        }, [pkmnAtualindex]
    )






    const { paginaAside } = useContext(PaginaAsideContext)
    let onMountRef = useRef(true)

    useEffect(
        () => {
            if(onMountRef.current){
                onMountRef.current = false
                return
            }
            else{
                console.log('Pagina Aside')
                const ols = document.querySelectorAll('#lists > ol')
                const olAtiva = document.querySelector('#lists > ol.active')

                ols.forEach(
                    (ol, index) => {
                        if(index === paginaAside){
                            if(!ol.classList.contains('active')){
                                ol.classList.add('active')
                                olAtiva?.classList.remove('active')
                            }
                        }
                    }
                )
            }
        }, [paginaAside]
    )








    return(
        <div id="pokemonPage">
            <PokemonPageMain
                nome={capitalizarPosTracos(especies[0].pokemon_v2_pokemons[pkmnAtualindex].name)}
                pokemon={especies[0].pokemon_v2_pokemons[pkmnAtualindex]}
            />
            {
                /*////////////////////*/
                /*////////////////////*/
                /*////////////////////*/
                /*////////////////////*/
            }
            <aside>
                <NavigateLists/>
                {
                    (windowWidth <= 1200) ? (
                        <div>
                            <Cruz
                                style={{fill: `${iconsColorByName[themeType]}`}}
                                parentElement={document.querySelector('#pokemonPage > aside')}
                            />
                        </div>
                    ) : <></>
                }
                <div id="lists">
                    <ol className="active" id="listaEvolucoes">
                        {
                            linhaEvolutiva.map(
                                (pkmn : any, index : number) => {
                                    const imagem = (
                                        <img
                                            alt=""
                                            src={
                                                JSON.parse(
                                                    pkmn
                                                        .pokemon_v2_pokemons[0]
                                                        .pokemon_v2_pokemonsprites[0]
                                                        .sprites    )
                                                        .other
                                                        .home
                                                        .front_default
                                            }
                                        />
                                    )

                                    const listaEvolucoes = document.getElementById('listaEvolucoes')
                                    if(index > 4 && listaEvolucoes !== null) {
                                        listaEvolucoes.style.justifyContent = 'start'
                                    }

                                    return(
                                    <li 
                                        key={`especie-${especies[0].name}-${pkmn.name}`}
                                        className={
                                            (especies[0].name === pkmn.name) ? 'active' : undefined
                                        }
                                    >
                                        {(especies[0].name === pkmn.name) ? imagem : <a href={`/pokemon/${pkmn.name}`}>{imagem}</a>}
                                    </li>
                                )}
                            )
                        }
                    </ol>
                    <ol id="listaFormas">
                        {
                            especies[0].pokemon_v2_pokemons.map(
                                (pkmn : any, index : number) => {
                                    const listaFormas = document.getElementById('listaFormas')
                                    if(index > 4 && listaFormas !== null) {
                                        listaFormas.style.justifyContent = 'start'
                                    }
                                    return(
                                        <li 
                                            key={`especie-${especies[0].name}-${index}`}
                                            className={
                                                (pkmnAtualindex === index) ? 'active' : undefined
                                            }
                                            onClick={() => { setPkmnAtualindex(index) }}
                                        >
                                            <img
                                                alt=""
                                                src={
                                                    JSON.parse(
                                                        pkmn
                                                            .pokemon_v2_pokemonsprites[0]
                                                            .sprites    )
                                                            .other
                                                            .home
                                                            .front_default
                                                }
                                            />
                                        </li>
                                    )
                                }
                            )
                        }
                    </ol>
                </div>
            </aside>
        </div>
    )
}