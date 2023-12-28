import { LegacyRef, useContext, useEffect, useRef, useState } from "react"
import { PaginaAsideContext } from "../../../contexts/pokemon/paginaAside"
import PkmnNavigate from "../../layout/pkmnNavigate"

export default function NavigateLists(){
    const { paginaAside, setPaginaAside} = useContext(PaginaAsideContext)

    const [hasAnterior, setHasAnterior] = useState<boolean | undefined>(undefined)
    const [hasProximo, setHasProximo] = useState<boolean | undefined>(undefined)
    const bolinhasDivRef = useRef<HTMLDivElement | undefined>(undefined)


    useEffect(
        () => {
            if(bolinhasDivRef.current !== undefined){
                const bolinhasDiv = bolinhasDivRef.current

                const selectedBolinha = bolinhasDiv.querySelector('.selected')

                setHasAnterior(selectedBolinha?.previousElementSibling !== null)
                setHasProximo(selectedBolinha?.nextElementSibling !== null)

            }
        }, [paginaAside, bolinhasDivRef.current]
    )

    return(
        <div id="navigateLists">
            <div id="bolinhas" ref={bolinhasDivRef as LegacyRef<HTMLDivElement>}>
            {
                [0, 1].map(
                    n => {
                        return (
                            <div
                                key={`bolinhas-${n}`}
                                className={'bolinha ' + ((n === paginaAside) ? "selected" : '')}
                                onClick={() => { setPaginaAside(n) }}
                            ></div>
                        )
                    }
                )
            }
            </div>
            <PkmnNavigate
                anterior={hasAnterior}
                proximo={hasProximo}
                state={paginaAside}
                setState={setPaginaAside}
                type='fundo'
                textType={['Evolution', 'Forms']}
            />
        </div>
    )
}