import { useContext, useState } from "react"
import { Action } from "../../../global/ts/_interfaces"
import { iconsGradientByName } from "../../../global/ts/icons"
import { ThemeTypeContext } from "../../../contexts/themeType"




export default function GenSelectors({action} : Action){
    const {themeType} = useContext(ThemeTypeContext)


    const gens = [1, 2, 3, 4, 5, 6, 7, 8]

    const [selectedGens, setSelectedGens] = useState<number[]>(gens)


    const styleClicked : CSSProperties = {
        background: `${iconsGradientByName[themeType]}`,
        fontWeight: 600,
        color: 'white',
        textShadow: 'rgba(0, 0, 0, 0.4) 0 0 14px',
        filter: 'brightness(0.9) saturate(2) contrast(1.2)'
    }


    return(
        <ol id="genSelectors">
            {
                gens.map(
                    gen => (
                        <li
                            key={`gen-${gen}`}
                            onClick={
                                (e) => {
                                    const target = e.currentTarget
                                    const checkbox = e.currentTarget.querySelector('input[type="checkbox"]') as HTMLInputElement
                                    
                                    const genSelectors = document.getElementById('genSelectors')

                                    if(
                                        (genSelectors !== null && genSelectors.querySelectorAll('input:checked').length > 1)
                                        || !checkbox.checked
                                    ){
                                        const indexOfIt = selectedGens.indexOf(gen)

                                        if(indexOfIt === -1){
                                            checkbox.checked = true
                                            const sg = selectedGens
                                            sg.push(gen)
                                            setSelectedGens(sg)
                                        }
                                        else{
                                            checkbox.checked = false
                                            const sg = selectedGens
                                            sg.splice(indexOfIt, 1)
                                            setSelectedGens(sg)
                                        }


                                        var event = new Event(
                                            'input',
                                            {
                                                bubbles: true,
                                                cancelable: true,
                                            }
                                        )
                                        checkbox.dispatchEvent(event)
                                    }
                                    else{
                                        target.classList.add('nope')
                                        const timeout = setTimeout(
                                            () => {
                                                target.classList.remove('nope')
                                                return clearTimeout(timeout)
                                            }, 300
                                        )
                                    }
                                }
                            }

                            style={(selectedGens.includes(gen)) ? styleClicked : {}}
                        >
                            {gen}
                            <input
                                type="checkbox"
                                name="gen"
                                value={gen}
                                checked={selectedGens.includes(gen)}
                                onInput={()=>{if(action !== undefined) action()}}
                                onChange={()=>{}}
                            />
                        </li>
                    )
                )
            }
        </ol>
    )
}