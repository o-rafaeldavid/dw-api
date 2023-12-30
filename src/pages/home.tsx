import { CSSProperties, useContext, useEffect, useRef, useState } from 'react';
import { useREQuery } from '../global/graphql/useREquery';

import PkmnGrid from '../components/home/pkmnGrid/_pkmnGrid';
import PkmnNavigate from '../components/layout/pkmnNavigate';
import PkmnFilters from '../components/home/pkmnFilters/_pkmnFilters';
import { PaginaGridContext } from '../contexts/home/paginaGrid';
import { ThemeTypeContext } from '../contexts/themeType';
import { WindowDimensionContext } from '../contexts/windowResize';

import { allTypes, iconsGradientColorsByName } from '../global/ts/icons';
import { TypesProps } from '../global/ts/_interfaces';


import '../scss/home.scss'



function FilterIcon({style} : {style? : CSSProperties}){
  return(
    <svg x="0px" y="0px" viewBox="0 0 1080 1080">
        <g>
          <g>
            <path style={style} d="M908.6,181H540C522,115.4,461.8,67,390.6,67S259.2,115.4,241.2,181h-70.7c-22.5,0-40.7,18.3-40.7,40.7
              c0,22.5,18.3,40.7,40.7,40.7h70.7c17.9,65.6,78.1,114.1,149.4,114.1S522.1,328.1,540,262.5h368.7c22.5,0,40.7-18.3,40.7-40.7
              C949.4,199.3,931.1,181,908.6,181z M390.6,295.1c-25.4,0-47.7-12.9-60.9-32.6c-7.9-11.7-12.5-25.6-12.5-40.7
              c0-15.1,4.6-29.1,12.5-40.7c13.2-19.6,35.6-32.6,60.9-32.6s47.7,12.9,60.9,32.6c7.9,11.7,12.5,25.6,12.5,40.7
              c0,15.1-4.6,29.1-12.5,40.7C438.3,282.2,415.9,295.1,390.6,295.1z"/>
          </g>
          <g>
            <path style={style} d="M170.6,580.3h368.7c17.9,65.6,78.1,114.1,149.4,114.1S820.1,646,838.1,580.3h70.7c22.5,0,40.7-18.3,40.7-40.7
              c0-22.5-18.3-40.7-40.7-40.7h-70.7c-17.9-65.6-78.1-114.1-149.4-114.1s-131.5,48.4-149.4,114.1H170.6c-22.5,0-40.7,18.3-40.7,40.7
              C129.8,562.1,148.1,580.3,170.6,580.3z M688.6,466.2c25.4,0,47.7,12.9,60.9,32.6c7.9,11.7,12.5,25.6,12.5,40.7
              c0,15.1-4.6,29.1-12.5,40.7c-13.2,19.6-35.6,32.6-60.9,32.6c-25.4,0-47.7-12.9-60.9-32.6c-7.9-11.7-12.5-25.6-12.5-40.7
              c0-15.1,4.6-29.1,12.5-40.7C640.9,479.2,663.3,466.2,688.6,466.2z"/>
          </g>
          <g>
            <path style={style} d="M908.6,816.6H540C522,751,461.8,702.5,390.5,702.5S259.1,751,241.1,816.6h-70.7c-22.5,0-40.7,18.3-40.7,40.7
              c0,22.5,18.3,40.7,40.7,40.7h70.7c17.9,65.6,78.1,114.1,149.4,114.1S522,963.7,540,898.1h368.7c22.5,0,40.7-18.3,40.7-40.7
              S931.1,816.6,908.6,816.6z M390.6,930.7c-25.4,0-47.7-12.9-60.9-32.6c-7.9-11.7-12.5-25.6-12.5-40.7c0-15.1,4.6-29.1,12.5-40.7
              c13.2-19.6,35.6-32.6,60.9-32.6s47.7,12.9,60.9,32.6c7.9,11.7,12.5,25.6,12.5,40.7c0,15.1-4.6,29.1-12.5,40.7
              C438.3,917.8,415.9,930.7,390.6,930.7z"/>
          </g>
        </g>
    </svg>
  )
}


const betweenCommas = (str : string) => `"${str}"`

let tipos = allTypes
tipos.shift()
let allTypesString = betweenCommas(tipos.join('","'))


export interface filterFormProps{
  type: keyof TypesProps,
  name: string,
  weight:{
      min: number,
      max: number
  },
  generations: number[]
  direction: 'asc' | 'desc'
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function Home() {
  const [pkmnsNumGrid, setPkmnsNumGrid] = useState<number>(6 * 2)
  const {windowWidth, windowHeight} = useContext(WindowDimensionContext)
  useEffect(
    () => {
      if(windowHeight <= 720 || windowWidth <= 1600){

        if(windowWidth > 670 && windowWidth <= 1000) setPkmnsNumGrid(3 * 3)
        else if(windowWidth <= 670) setPkmnsNumGrid(2 * 3)
        else setPkmnsNumGrid(4 * 2)
      }
      else if(windowHeight > 720 && windowWidth > 1600) setPkmnsNumGrid(6 * 2)


    }, [windowWidth, windowHeight]
  )

  const { pagina, setPagina } = useContext(PaginaGridContext)
  const { themeType } = useContext(ThemeTypeContext)




  const [formState, setFormState] = useState<filterFormProps>({
    type: themeType,
    name: '',
    weight:{
        min: 0,
        max: 100
    },
    generations: [1, 2, 3, 4, 5, 6, 7, 8],
    direction: 'asc'
  })
  const [formStateAnterior, setFormStateAnterior] = useState<filterFormProps>(formState)

  const [weight, setWeight] = useState< {min: number, max: number} >( {min: 0, max: 9999} )
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [generations, setGenerations] = useState<string>(`[${formState.generations.join(',')}]`)
  const [name, setName] = useState<string>('')




  useEffect(
    () => {
      if(formState.name !== formStateAnterior.name) setName(formState.name)
      if(formState.weight !== formStateAnterior.weight) setWeight(formState.weight)
      if(formState.direction !== formStateAnterior.direction) setOrder(formState.direction)
      if(formState.generations !== formStateAnterior.generations) setGenerations(`[${formState.generations.join(',')}]`)

      console.log('change')
      setPagina(-Math.round(1000*Math.random()))
      setFormStateAnterior(formState)
    }, [formState, pkmnsNumGrid]
  )

  const queryReturn = (
    pg: number,
    howMany: number,
    name: string,
    type: keyof TypesProps,
    direction : 'asc' | 'desc',
    generations: string,
    weight: {min: number, max: number}
  ) => `
    pokemon_v2_pokemonspecies(
        order_by: {id: ${direction}, generation_id: ${direction}},
        where: {
          generation_id: {_in: ${generations}},
          name: {_regex: "${name}"},
          pokemon_v2_pokemons: {
            weight: {_gte: ${weight.min}, _lte: ${weight.max}},
            pokemon_v2_pokemontypes: {
              pokemon_v2_type: {name: {_in: [${(type === 'all') ? allTypesString : betweenCommas(themeType)}]}}
            }
          }
        },
        limit: ${howMany},
        offset: ${howMany * pg}
    ){
      id
      name


      pokemon_v2_pokemons(
        order_by: {id:asc},
        limit: 1,
        where:{
          weight: {_gte: ${weight.min}, _lte: ${weight.max}},
          pokemon_v2_pokemontypes: {
            pokemon_v2_type: {name: {_in: [${(type === 'all') ? allTypesString : betweenCommas(themeType)}]}}
          }
        }
      ){
        pokemon_species_id
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }


        pokemon_v2_pokemonsprites {
          sprites
        }
      }
    }
  `

  const queryPkmn = useREQuery({ query: queryReturn(pagina, pkmnsNumGrid, name, themeType, order, generations, weight) })
  const queryPreviousPkmn = useREQuery({ query: queryReturn(pagina - 1, pkmnsNumGrid, name, themeType, order, generations, weight) })
  const queryNextPkmn = useREQuery({ query: queryReturn(pagina + 1, pkmnsNumGrid, name, themeType, order, generations, weight) })

  let onMountRef = useRef(true)

  const [existPkmnAnteriores, setExistPkmnAnteriores] = useState<boolean | undefined>(undefined)
  const [pkmnAtuais, setPkmnAtuais] = useState<any>([])
  const [existPkmnProximos, setExistPkmnProximos] = useState<boolean | undefined>(undefined)

  ///////////////

  useEffect(
    () => {
      if(onMountRef.current){
        onMountRef.current = false
        return
      }
      else if(pagina >= 0){
        queryPkmn.newQuery(({ query: queryReturn(pagina, pkmnsNumGrid, name, themeType, order, generations, weight) }))

        setExistPkmnAnteriores(false)
        setExistPkmnProximos(false)
        queryPreviousPkmn.newQuery(({ query: queryReturn(pagina - 1, pkmnsNumGrid, name, themeType, order, generations, weight) }))
        queryNextPkmn.newQuery(({ query: queryReturn(pagina + 1, pkmnsNumGrid, name, themeType, order, generations, weight) }))
        return
      }
      else{
        setPagina(0)
      }
    }, [pagina]
  )

  const useCheckPkmnList = (query : any, booleanStateSetter : React.Dispatch<React.SetStateAction<boolean | undefined>>) => {
    useEffect(
      () => {
        if(!query.isLoading){
          const res = query.res.pokemon_v2_pokemonspecies
          const antiCaso = res === undefined || (res !== undefined && res?.length === 0)
          booleanStateSetter(!antiCaso)
        }
      }, [query.res]
    )
  }

  useCheckPkmnList(queryPreviousPkmn, setExistPkmnAnteriores)
  useCheckPkmnList(queryNextPkmn, setExistPkmnProximos)

  ///////////////

  useEffect(
    () => {
      if(!queryPkmn.isLoading){
        const res = queryPkmn.res.pokemon_v2_pokemonspecies
        
        let atuais = []
        for(let i = 0; i < pkmnsNumGrid; i++){
          atuais.push(res[i])
        }
        setPkmnAtuais(atuais)
      }
    }, [queryPkmn.res]
  )


  return (  
    <>
      <div id="interface">

        {(windowWidth <= 1200) ? (
          <div
            className='showMobile' id="filterIcon"
            onClick={
              () => {
                const pkmnFilters = document.getElementById('pkmnFilters')
                if(pkmnFilters !== null){
                  pkmnFilters.style.opacity = 1 + ''
                  pkmnFilters.style.zIndex = 10 + ''
                }
              }
            }
          >
            <FilterIcon style={{fill: `${iconsGradientColorsByName[themeType][0]}`}}/>
            <FilterIcon style={{fill: `white`}}/>
          </div>
        ): <></>}


        <PkmnFilters stateSetter={setFormState}/>
        <div id="PkmnList">
          {
            (queryPkmn.isLoading) ? <p>loading</p>
            :
            <>
              <PkmnGrid pkmnObtainableArray={pkmnAtuais}/>
              <PkmnNavigate
                anterior={existPkmnAnteriores}
                proximo={existPkmnProximos}
                state={(pagina < 0) ? 0 : pagina}
                setState={setPagina}
                type='semfundo'
                textType={'state'}
              />
            </>
          }
        </div>
        {(windowWidth <= 1200) ? <div className='showMobile'></div> : <></>}
      </div>
    </>
  )
}
