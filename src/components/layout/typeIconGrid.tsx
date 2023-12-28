import { useContext, useEffect, useState } from "react"
import { ThemeTypeContext } from "../../contexts/themeType"
import { TypeIcon } from "../icons/typeIcon";
import { iconsGradientByName } from "../../global/ts/icons";
import { mapear } from "../../global/ts/functions";
import { TypesProps } from "../../global/ts/_interfaces";


export default function TypeIconGrid(){
    const {themeType} = useContext(ThemeTypeContext)

    const [arrayOfType, setArrayOfType] = useState<any>([]);

    const toContrastBackground : Array<keyof TypesProps> = [
        'all',
        'electric',
        'ice'
    ]

    useEffect(
        () => {
            let array = []
            for(let y = 0; y < 40; y++){
                for(let x = 0; x < 20; x++){
                    array.push(
                        <div
                            style={{
                                opacity: mapear(
                                    y,
                                    20,
                                    (y < 20) ? 0 : 40,
                                    0,
                                    (toContrastBackground.includes(themeType)) ? 0.3 : 0.1
                                )
                            }}

                            key={`iconBgonGrid-${x}-${y}`}
                        >
                            <TypeIcon.withoutBackground themeType={themeType}/>
                        </div>
                    )
                }
            }

            setArrayOfType(array)
        }, [themeType]
    )
    return(
        <>
            <div id="typeIconGrid" style={{background: iconsGradientByName[themeType]}}>
                {arrayOfType}
            </div>
        </>
    )
}