import { useContext } from "react"
import { ThemeTypeContext } from "../contexts/themeType"
import { iconsColorByName } from "../global/ts/icons"
import { PkmnNavigateProps } from "../global/ts/_interfaces"

import '../scss/pkmnNavigate.scss'

export default function PkmnNavigate({anterior, proximo, state, setState, type, textType} : PkmnNavigateProps) {
    const { themeType } = useContext(ThemeTypeContext)
    
    const seta =
        <svg x="0px" y="0px" viewBox="0 0 1080 1080" style={{fill: `${iconsColorByName[themeType]}`}}>
            <path d="M343.8,917c-31.4,0-62.3-14.7-81.8-42.4c-31.8-45.1-21.1-107.5,24.1-139.4L562.8,540L286,344.7
            c-45.1-31.8-55.9-94.2-24.1-139.4c31.8-45.1,94.2-55.9,139.4-24.1l392.6,277c26.6,18.7,42.4,49.2,42.4,81.7
            c0,32.5-15.8,63-42.4,81.7l-392.6,277C383.8,911.1,363.7,917,343.8,917z"/>
        </svg>

    const navegarPaginas = (action : 'proximo' | 'anterior') => {
        switch(action){
            case 'proximo':{
                if(proximo !== undefined && proximo) return setState(state + 1)
                else return () => {}
            }
            case 'anterior':{
                if(anterior !== undefined && anterior) return setState(state - 1)
                else return () => {}
            }
        }
    }


    ///////////////
    ///////////////
    ///////////////


    return(
        <div className={`pkmnNavigate ${(type === 'fundo') ? 'fundo' : ''}`}>
            <button
                className={(anterior === undefined) ? 'defining' : (anterior ? '' : 'sumiu')}
                onClick={() => navegarPaginas('anterior')}>{seta}</button>
            <div>
                <span
                    style={
                        (type === 'fundo') ? {
                            color: `${iconsColorByName[themeType]}`
                        } : {}
                    }
                >
                    {(textType === 'state') ? state : textType[state % textType.length]}
                </span>
            </div>
            <button
                className={(proximo === undefined) ? 'defining' : (proximo ? '' : 'sumiu')}
                onClick={() => navegarPaginas('proximo')}>{seta}</button>
        </div>
    )
}