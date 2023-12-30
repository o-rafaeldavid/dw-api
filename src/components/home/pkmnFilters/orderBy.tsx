import { CSSProperties, useContext, useState } from "react";
import { ThemeTypeContext } from "../../../contexts/themeType";
import { iconsGradientByName } from "../../../global/ts/icons";
import { Action } from "../../../global/ts/_interfaces";


export default function OrderBy({action} : Action){
    const {themeType} = useContext(ThemeTypeContext)

    const styleClicked : CSSProperties = {
        background: `${iconsGradientByName[themeType]}`,
        fontWeight: 600,
        color: 'white',
        textShadow: 'rgba(0, 0, 0, 0.4) 0 0 14px',
        filter: 'brightness(0.9) saturate(2) contrast(1.2)'
    }


    const [checked, setChecked] = useState<number>(0)

    const directions = [
        'ASC',
        'DESC'
    ]


    return(
        <ul id="orderBy">
            {
                directions.map(
                    (direction : string, index : number) => (
                        <li
                            key={`radioOrder-${index}`}
                            onClick={
                                (e) => {
                                    const radio = e.currentTarget.querySelector('input[type="radio"]') as HTMLInputElement
                                    radio.checked = true
                                    setChecked(index)

                                    var event = new Event(
                                        'input',
                                        {
                                            bubbles: true,
                                            cancelable: true,
                                        }
                                    )
                                    radio.dispatchEvent(event)
                                }
                            }

                            style={(checked === index) ? styleClicked : {}}
                        >
                            {direction}
                            <input type="radio" name="direction"
                                checked={(checked === index)}
                                onInput={() => {if(action !== undefined) action()}}
                                onChange={()=>{}}
                                value={direction.toLowerCase()}
                            />
                        </li>
                    )
                )
            }
        </ul>
    )
}