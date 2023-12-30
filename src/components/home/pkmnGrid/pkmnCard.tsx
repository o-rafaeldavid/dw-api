import {LegacyRef, useContext, useEffect, useReducer, useRef, useState } from "react"
import { iconsColorByName, iconsGradientByName } from "../../../global/ts/icons";
import { mapear } from "../../../global/ts/functions";
import { TypesProps } from "../../../global/ts/_interfaces";
import { WindowDimensionContext } from "../../../contexts/windowResize";
import { Link } from "react-router-dom";


/* estrutura recebida
!!!!!!!!!!!!!!!!!!!!!!!!!!!
{
    "id": 1,
    "name": "bulbasaur",
    "pokemon_v2_pokemons": [
        {
        "pokemon_species_id": 1,
        "pokemon_v2_pokemontypes": [
            {
            "pokemon_v2_type": {
                "name": "grass"
            }
            },
            {
            "pokemon_v2_type": {
                "name": "poison"
            }
            }
        ],
        "pokemon_v2_pokemonsprites": [
            {
            "sprites": "{
                ........................
                ........................
                "other": {
                    .......
                    "home": {
                        .......
                        "front_default": "URL"
                        .......
                    }
                    .......
                }
                ........................
                ........................
            }"
        ]
    ]
}
*/

export default function PkmnCard({pkmn} : any ){
    ////////////////////////

    const primeiraEspecie = pkmn.pokemon_v2_pokemons[0]

    const types = primeiraEspecie.pokemon_v2_pokemontypes
    const sprite = JSON.parse(primeiraEspecie.pokemon_v2_pokemonsprites[0].sprites)
    
    const initialBumb = -105
    const [SVGMiddleBumb, setSVGMiddleBumb] = useState<number>(initialBumb)

    const [frameCounter, setFrameCounter] = useState<number>(0)
    const [animationStarted, setAnimationStarted] = useState<boolean>(false)
    let animationRef = useRef<number>(-1)

    let svgRef = useRef<SVGSVGElement>()

    ////////////////////////

    const svgAnimate = (timestamp : number) => {
        console.log(timestamp)
        setFrameCounter((lastframe) => lastframe + 1)
        animationRef.current = requestAnimationFrame(svgAnimate)
    }

    useEffect(
        () => {
            if(svgRef.current !== undefined && animationStarted){
                animationRef.current = requestAnimationFrame(svgAnimate)
            }
            return () => { cancelAnimationFrame(animationRef.current) }
        }, [animationStarted]
    )

    useEffect(
        () => {
            if(animationStarted){
                /////////////////////////////////////
                if(frameCounter < 10){
                    setSVGMiddleBumb(
                        mapear(
                            frameCounter,
                            0, 9,
                            initialBumb, 100
                        )
                    )
                }
                else if(frameCounter < 20){
                    setSVGMiddleBumb(
                        mapear(
                            frameCounter,
                            10, 19,
                            100, initialBumb - 70
                        )
                    )
                }
                else if(frameCounter < 30){
                    setSVGMiddleBumb(
                        mapear(
                            frameCounter,
                            20, 29,
                            initialBumb - 70, initialBumb
                        )
                    )
                }
                /////////////////////////////////////
                else{
                    cancelAnimationFrame(animationRef.current)
                    setFrameCounter(0)
                    setAnimationStarted(false)
                }
            }
        }, [frameCounter]
    )


    const { windowWidth, windowHeight } = useContext(WindowDimensionContext)

    const [ratioLI, setRatioLi] = useState<number>(188)
    let listaRef = useRef<HTMLLIElement>()
    useEffect(
        () => {
            if(listaRef.current !== undefined){
                const bounds = listaRef.current.getBoundingClientRect()
                setRatioLi(bounds.height / bounds.width)
            }
        }, [listaRef.current, windowWidth, windowHeight]
    )

    ///////////////////////
    ///////////////////////
    ///////////////////////

    enum HoverListActionKind {
        TEXTO = 'TEXTO',
        SVG = 'SVG',
    }
    
    interface HoverListAction {
        type: HoverListActionKind;
        set: string | undefined;
    }
    
    interface HoverListState {
        TEXTO: string | undefined,
        SVG: string | undefined
    }

    function hoverListReducer(state: HoverListState, action: HoverListAction) {
        const { type, set } = action;
        switch (type) {
          case HoverListActionKind.TEXTO:{
            const {TEXTO, ...other} = {...state}
            return{
                ...other,
                TEXTO: set
            }
          }
            
          case HoverListActionKind.SVG:{
            const {SVG, ...other} = {...state}
            return{
                ...other,
                SVG: set
            }
          };
          default:
            return state;
        }
    }

    
    const corTipoPkmn = iconsColorByName[types[0].pokemon_v2_type.name as keyof TypesProps]
    const [onHoverStyle, dispatchOnHoverStyle] = useReducer(hoverListReducer, { TEXTO: 'white', SVG: corTipoPkmn });

    useEffect(
        () => {
            dispatchOnHoverStyle({
                type: HoverListActionKind.SVG,
                set: corTipoPkmn
            })
        }, [pkmn]
    )

    ///////////////////////
    ///////////////////////
    ///////////////////////
    return(
        <li
            onMouseEnter={() => {
                if(!animationStarted){
                    setAnimationStarted(true)

                    dispatchOnHoverStyle({
                        type: HoverListActionKind.SVG,
                        set: 'white'
                    })

                    dispatchOnHoverStyle({
                        type: HoverListActionKind.TEXTO,
                        set: corTipoPkmn
                    })
                }
            }}
            onMouseLeave={() =>{
                dispatchOnHoverStyle({
                    type: HoverListActionKind.SVG,
                    set: corTipoPkmn
                })

                dispatchOnHoverStyle({
                    type: HoverListActionKind.TEXTO,
                    set: 'white'
                })
            }}
            style={{ background: iconsGradientByName[types[0].pokemon_v2_type.name as keyof TypesProps]}}
            ref={listaRef as LegacyRef<HTMLLIElement>}
        >
            <Link to={`/pokemon/${pkmn.name}`}>
            {/* 
                =
                =
                =
                =
                =
                =
                =
                =
                =
             */}
            <div className="backgroundBranco"></div>
            {/* 
                =
                =
                =
             */}
            <svg x="0px" y="0px" viewBox={`0 0 1000 ${mapear(ratioLI, 1.5, 1.3, 1300, 1100)}`} ref={svgRef as LegacyRef<SVGSVGElement>}>
                <path d={`
                        M 1000,100000
                        v495 H0 V405
                        c127 -64.8,304.1 ${SVGMiddleBumb},500 ${SVGMiddleBumb}
                        S 873,340.2,1000,405z
                    `}

                    fill={onHoverStyle.SVG}
                />
            </svg>
            {/* 
                =
                =
                =
             */}
            <div className="pkmnCardData">
                <div
                    className="pkmnCardImage"
                    style={{
                        backgroundImage: `url('${sprite.other.home.front_default}')`
                    }}
                ></div>
                <div className="pkmnCardInfo">
                    <h3 style={{color: onHoverStyle.TEXTO}}>{pkmn.name}</h3>
                    <h4 style={{color: onHoverStyle.TEXTO}}>#{primeiraEspecie.pokemon_species_id}</h4>
                </div>
            </div>
            </Link>
        </li>
    )
}