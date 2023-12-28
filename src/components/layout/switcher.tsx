import { useEffect, useState } from "react"

interface ActionsProps {
    checked: Function,
    unchecked: Function
}

export default function Switcher({name, actions} : {name: string, actions: ActionsProps}){
    const [toggle, setToggle] = useState<boolean>(false)
    useEffect(
        () => {
            if(toggle) actions.checked()
            else actions.unchecked()
        }, [toggle]
    )
    return(
        <div id="toShiny" className="switcher">
            <h3>{name}</h3>
            <div 
                className="switch"
                onClick={(e) => {
                    e.currentTarget.classList.toggle('clicked')
                    setToggle(!toggle)
            }}>
                <div className="bola"></div>
                <div className="barra"></div>
            </div>
        </div>
    )
}