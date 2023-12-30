import { CSSProperties, LegacyRef, useRef, useState } from "react"
import { capitalizarPosTracos, mapear } from "../../../global/ts/functions"
import Switcher from "../../layout/switcher"
import { TypeIcon } from "../../icons/typeIcon"

const mapearStats = (stat : number) => {
    const mapeamento = mapear(stat, 1, 255, 10, 120)
    return mapeamento
}



export default function PokemonPageMain({pokemon , nome} : {pokemon: any, nome: string}){
    let mainRef = useRef<HTMLElement>()
    const [styleAboutAbility, setStyleAboutAbility] = useState<CSSProperties>({})
    const [textAboutAbility, setTextAboutAbility] = useState<string>('')



    const sprites = JSON.parse(
                        pokemon
                            .pokemon_v2_pokemonsprites[0]
                            .sprites
                    )
    
    const [pkmnIsShiny, setPkmnIsShiny] = useState<boolean>(false)
    
    
    
    


    return(
        <main ref={mainRef as LegacyRef<HTMLElement>}>
            <span id="aboutAbility" style={styleAboutAbility}>{textAboutAbility}</span>

            <h1>{nome}</h1>
            <Switcher
                name="Shiny"
                actions={{
                    checked: () => setPkmnIsShiny(true),
                    unchecked: () => setPkmnIsShiny(false)
                }}
            />
            <img
                id="imagemPrincipal"
                alt=""
                src={ sprites.other.home[`${pkmnIsShiny ? 'front_shiny' : 'front_default'}`]}
            />
            <ul id="types">
                {
                    pokemon.pokemon_v2_pokemontypes.map(
                        (type : any) => {
                            const tipoNome = type.pokemon_v2_type.name
                            return(
                                <li>
                                    <TypeIcon.withBackground themeType={tipoNome}/>
                                    <span>{tipoNome}</span>
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <div id="info">
                <h3>Base Stats</h3>
                <table>
                    <tbody>
                    {
                        pokemon.pokemon_v2_pokemonstats.map(
                            (stat : any) => (
                                <tr key={`pkmn-${pokemon.name}-stats-${stat.pokemon_v2_stat.name}`}>
                                    <td className="statName">
                                        {capitalizarPosTracos(stat.pokemon_v2_stat.name)}
                                    </td>

                                    <td>{stat.base_stat}</td>

                                    <td className="barra">
                                        <div
                                            style={{width: `${mapearStats(255)}px`}}
                                        >
                                            <div style={{width: `${mapearStats(stat.base_stat)}px`}}></div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        )
                    }
                    </tbody>
                </table>
                <br/>
                <div>
                    <div>
                        <h3>Abilities</h3>
                        <ul>
                            {
                                pokemon.pokemon_v2_pokemonabilities.map(
                                    (ability : any) => (
                                        <li key={`pkmn-${pokemon.name}-ability-${ability.pokemon_v2_ability.name}`}>
                                            <p>
                                                <span>{capitalizarPosTracos(ability.pokemon_v2_ability.name)}</span>
                                                <span
                                                    className="about"
                                                    style={{marginLeft: '6px'}}
                                                    onMouseEnter={
                                                        (e) => {
                                                            if(mainRef.current !== undefined){
                                                                const bounds = mainRef.current.getBoundingClientRect()
                                                                const boundsTarget = e.currentTarget.getBoundingClientRect()
                                                                console.log(e.currentTarget)
                                                                setStyleAboutAbility({
                                                                    top: `${boundsTarget.top - bounds.y}px`,
                                                                    left: `${boundsTarget.right - bounds.x + 10}px`,
                                                                    display: 'block'
                                                                })
                                                                setTextAboutAbility(
                                                                    capitalizarPosTracos(
                                                                        ability
                                                                            .pokemon_v2_ability
                                                                            .pokemon_v2_abilityeffecttexts[0]
                                                                            .effect
                                                                    )
                                                                )
                                                            }
                                                        }
                                                    }

                                                    onMouseLeave={
                                                        () => {
                                                            setStyleAboutAbility({display: 'none'})
                                                        }
                                                    }
                                                    
                                                    >?</span>
                                                {/* <br />
                                                {capitalizarPosTracos(ability.pokemon_v2_ability.pokemon_v2_abilityeffecttexts[0].effect)} */}
                                            </p>
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    </div>
                    <div>
                    <h3>Weight</h3>
                    <p>{parseInt(pokemon.weight) / 10} kg</p>
                    </div>
                </div>
            </div>
        </main>
    )
}