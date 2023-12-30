import { useContext, useEffect, useRef, useState } from 'react';
import { useREQuery } from '../global/graphql/useREquery';

import PkmnGrid from '../components/home/pkmnGrid/_pkmnGrid';
import PkmnNavigate from '../components/layout/pkmnNavigate';
import PkmnFilters from '../components/home/pkmnFilters/_pkmnFilters';
import { PaginaGridContext } from '../contexts/home/paginaGrid';
import { ThemeTypeContext } from '../contexts/themeType';

import { allTypes } from '../global/ts/icons';
import { TypesProps } from '../global/ts/_interfaces';


import '../scss/home.scss'

const betweenCommas = (str) => `"${str}"`

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
  const pkmnsNumGrid = 6 * 2
  const { pagina, setPagina } = useContext(PaginaGridContext)
  const { themeType } = useContext(ThemeTypeContext)




  const [formState, setFormState] = useState<filterFormProps>({
    type: themeType,
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

      setPagina(-Math.round(1000*Math.random()))
      setFormStateAnterior(formState)
    }, [formState]
  )

  const queryReturn = (
    pg: number,
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
        limit: ${pkmnsNumGrid},
        offset: ${pkmnsNumGrid * pg}
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

  const queryPkmn = useREQuery({ query: queryReturn(pagina, name, themeType, order, generations, weight) })
  const queryPreviousPkmn = useREQuery({ query: queryReturn(pagina - 1, name, themeType, order, generations, weight) })
  const queryNextPkmn = useREQuery({ query: queryReturn(pagina + 1, name, themeType, order, generations, weight) })

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
        queryPkmn.newQuery(({ query: queryReturn(pagina, name, themeType, order, generations, weight) }))

        setExistPkmnAnteriores(false)
        setExistPkmnProximos(false)
        queryPreviousPkmn.newQuery(({ query: queryReturn(pagina - 1, name, themeType, order, generations, weight) }))
        queryNextPkmn.newQuery(({ query: queryReturn(pagina + 1, name, themeType, order, generations, weight) }))
        return
      }
      else{
        setPagina(0)
      }
    }, [pagina]
  )

  const useCheckPkmnList = (query : any, booleanStateSetter : React.Dispatch<React.SetStateAction<boolean | undefined>>, any : any) => {
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

  useCheckPkmnList(queryPreviousPkmn, setExistPkmnAnteriores, 'anteriores')
  useCheckPkmnList(queryNextPkmn, setExistPkmnProximos, 'proximos')

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
      </div>
    </>
  )
}
