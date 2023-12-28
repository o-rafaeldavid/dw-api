import { useContext, useEffect, useRef, useState } from 'react';
import { useREQuery } from '../global/graphql/useREquery';

import PkmnGrid from '../components/home/pkmnGrid/_pkmnGrid';
import PkmnNavigate from '../components/layout/pkmnNavigate';
import PkmnFilters from '../components/home/pkmnFilters';
import { PaginaGridContext } from '../contexts/home/paginaGrid';
import { ThemeTypeContext } from '../contexts/themeType';



import '../scss/home.scss'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function Home() {
  const pkmnsNumGrid = 6 * 2
  const { pagina, setPagina } = useContext(PaginaGridContext)
  const { themeType } = useContext(ThemeTypeContext)

  useEffect(
    () => {
      setPagina(0)
    }, [themeType]
  )

  const queryReturn = (pg: number) => `
    pokemon_v2_pokemonspecies(
        order_by: {id: asc, generation_id: asc},
        where: {generation_id: {_in: [1, 2, 3, 4, 5, 6, 7, 8]}},
        limit: ${pkmnsNumGrid},
        offset: ${pkmnsNumGrid * pg}
    ){
      id
      name
      pokemon_v2_pokemons(order_by: {id:asc}, limit: 1){
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

  const queryPkmn = useREQuery({ query: queryReturn(pagina) })
  const queryPreviousPkmn = useREQuery({ query: queryReturn(pagina - 1) })
  const queryNextPkmn = useREQuery({ query: queryReturn(pagina + 1) })

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
      else{
        queryPkmn.newQuery(({ query: queryReturn(pagina) }))

        setExistPkmnAnteriores(undefined)
        setExistPkmnProximos(undefined)
        queryPreviousPkmn.newQuery(({ query: queryReturn(pagina - 1) }))
        queryNextPkmn.newQuery(({ query: queryReturn(pagina + 1) }))
        return
      }
    }, [pagina]
  )

  const useCheckPkmnList = (query : any, booleanStateSetter : React.Dispatch<React.SetStateAction<boolean | undefined>>) => {
    useEffect(
      () => {
        if(!query.isLoading){
          const res = query.res.pokemon_v2_pokemonspecies
          booleanStateSetter(res !== undefined)
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
        <PkmnFilters/>
        <div id="PkmnList">
          {
            (queryPkmn.isLoading) ? <p>loading</p>
            :
            <>
              <PkmnGrid pkmnObtainableArray={pkmnAtuais}/>
              <PkmnNavigate
                anterior={existPkmnAnteriores}
                proximo={existPkmnProximos}
                state={pagina}
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
