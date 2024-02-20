import { CSSProperties, LegacyRef, useContext, useRef, useState } from "react"
import { capitalizarPosTracos, mapear } from "../../../global/ts/functions"
import Switcher from "../../layout/switcher"
import { TypeIcon } from "../../icons/typeIcon"
import { WindowDimensionContext } from "../../../contexts/windowResize"

const mapearStats = (stat : number, windowWidthSize : number) => {
    const mapeamento = mapear(stat, 1, 255, 10, (windowWidthSize > 1550) ? 120 : 90)
    return mapeamento
}



export default function PokemonPageMain({pokemon , nome} : {pokemon: any, nome: string}){
    const {windowWidth} = useContext(WindowDimensionContext)

    let mainRef = useRef<HTMLElement>()
    const [styleAboutAbility, setStyleAboutAbility] = useState<CSSProperties>({})
    const [textAboutAbility, setTextAboutAbility] = useState<string>('')



    const sprites = pokemon
                        .pokemon_v2_pokemonsprites[0]
                        .sprites
    
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
                                            style={{width: `${mapearStats(255, windowWidth)}px`}}
                                        >
                                            <div style={{width: `${mapearStats(stat.base_stat, windowWidth)}px`}}></div>
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

            {
                (windowWidth <= 1200) ? (
                    <div id="toAside">
                        <svg x="0px" y="0px" viewBox="0 0 1080 1080"
                            onClick={
                                () => {
                                    const aside = document.querySelector('#pokemonPage aside') as HTMLElement

                                    if(aside !== null){
                                        aside.style.translate = '0 0';
                                    }
                                }
                            }
                        >
                            <g>
                            <path d="M505.1,88.4l-204,353.3C285.6,468.5,305,502,336,502h407.9c31,0,50.3-33.5,34.9-60.4l-204-353.3
                                C559.3,61.5,520.6,61.5,505.1,88.4z"/>
                            <circle cx="262.4" cy="780.4" r="202.4"/>
                            <path d="M979.8,982.8H655.5c-22.2,0-40.2-18-40.2-40.2V618.2c0-22.2,18-40.2,40.2-40.2h324.3c22.2,0,40.2,18,40.2,40.2v324.3
                                C1020,964.7,1002,982.8,979.8,982.8z"/>
                            </g>
                        </svg>
                    </div>
                ) : <></>
            }
        </main>
    )
}