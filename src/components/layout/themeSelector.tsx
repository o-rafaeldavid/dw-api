import {useContext, useEffect, useState } from "react"
import { ThemeTypeContext } from "../../contexts/themeType"
import { TypeIcon } from "../icons/typeIcon"
import { ThemeSpinnerProps } from "../../global/ts/_interfaces"
import { useREQuery } from "../../global/graphql/useREquery"

import '../../scss/themeSelector.scss'

////////////////////
////////////////////

export default function ThemeSelector(){
    const {themeType} = useContext(ThemeTypeContext)
    const [showSpinner, setShowSpinner] = useState<boolean>(false)


    return(
        <>
            <div id="themeSelector">
                <div 
                    id="themeSelected"
                    onClick={(e) => {
                        e.currentTarget.classList.toggle('clicked')
                        setShowSpinner(!showSpinner)
                    }}
                >
                    <div 
                        id="themeBar"
                        className="typeIconDescription"
                    >
                        <TypeIcon.withBackground themeType={themeType}/>
                        <span>{themeType}</span>
                    </div>
                </div>
                <ThemeSpinner
                    themeType={themeType}
                    showSpinner={showSpinner}
                    onMouseLeave={() => {
                        const themeSelected = document.getElementById('themeSelected')
                        if(themeSelected !== null) themeSelected.classList.remove('clicked')
                        setShowSpinner(false)
                    }}
                />
            </div>
        </>
    )
}


////////////////////
////////////////////

function ThemeSpinner({themeType, showSpinner, onMouseLeave, onMouseEnter} : ThemeSpinnerProps){
    const {setThemeType} = useContext(ThemeTypeContext)
    const queryTypesByName = useREQuery(
        {
          query:
          `
            pokemon_v2_type(order_by: {name: asc}, where: {name: {_neq: "unknown"}, _and: {name: {_neq: "shadow"}}}) {
                id
                name
            }
          `
        }
     )

    const [types, setTypes] = useState<any>([])
    useEffect(
        () => {
            if(!queryTypesByName.isLoading){
                let array = queryTypesByName.res.pokemon_v2_type
                array.push({
                    id: -1,
                    name: 'all'
                })
                setTypes(array)
            };
        }, [queryTypesByName.res]
    )

    useEffect(
        () => {
            console.log('showSpinner')
        }, [showSpinner]
    )

    return(
        <ul
            id="themeSpinner"
            className={(showSpinner) ? "show" : ""}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {types.map((type : any) => 
                <li
                    key={"themeSelector-" + type.name}
                    className={"typeIconDescription" + ((themeType === type.name) ? " selecionado" : "")}
                    onClick={
                        (e) => {
                            setThemeType(type.name)
                        }
                    }
                >
                    <TypeIcon.withBackground themeType={type.name}/>
                    <span>{type.name}</span>
                </li>
            )}
        </ul>
    )
}