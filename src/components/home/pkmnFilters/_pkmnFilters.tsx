import { LegacyRef, useContext, useRef } from "react";
import OrderBy from "./orderBy";
import ThemeSelector from "./themeSelector";
import WeightSlider from "./weightSlider";
import { filterFormProps } from "../../../pages/home";
import { TypesProps } from "../../../global/ts/_interfaces";
import GenSelectors from "./generationSelectors";
import { WindowDimensionContext } from "../../../contexts/windowResize";
import { ThemeTypeContext } from "../../../contexts/themeType";
import { iconsColorByName } from "../../../global/ts/icons";



export default function PkmnFilters({stateSetter} : {stateSetter : React.Dispatch<filterFormProps>}){
    
    const {windowWidth} = useContext(WindowDimensionContext)
    const {themeType} = useContext(ThemeTypeContext)

    let submitRef = useRef<HTMLButtonElement>()

    const submit = () => {
        if(submitRef.current !== undefined) submitRef.current.click()
    }


    return(
        <form
            id="pkmnFilters"
            onSubmit={(e) => {
                e.preventDefault()

                const form = e.currentTarget

                const typeSelecionado = form.querySelector('#themeSelector input[type="radio"][name="type"]:checked') as HTMLInputElement
                const generationsSelecionados = Array.from(
                    form.querySelectorAll('#genSelectors input[type="checkbox"][name="gen"]:checked')
                ) as HTMLInputElement[]
                
                if(typeSelecionado !== null){
                    if(windowWidth < 1200) form.removeAttribute('style')
                    stateSetter(
                        {
                            type: typeSelecionado.value.toLowerCase() as keyof TypesProps,
                            name: form.pesquisaNome.value.toLowerCase(),
                            weight:{
                                min: form.input_left.value,
                                max: form.input_right.value
                            },
                            generations: generationsSelecionados.map(input => parseInt(input.value)),
                            direction: form.direction.value.toLowerCase() as 'asc' | 'desc'
                        }
                    )
                }
            }}
        >
            <h2 style={{textAlign: 'center', marginBottom: '18px', color: 'black'}}>Filters</h2>
            {(windowWidth < 1200) ? (
                <svg id="cruz" x="0px" y="0px" viewBox="0 0 1080 1080"
                    onClick={
                        (e) => {
                            const form = e.currentTarget.parentElement
                            if(form !== null) form.removeAttribute('style')
                        }
                    }
                >
                    <rect
                        style={{fill: `${iconsColorByName[themeType]}`}}
                        x="0" y="450"
                        transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 1303.6753 540)"
                        width="1080" height="180"
                    />
                    <rect
                        style={{fill: `${iconsColorByName[themeType]}`}}
                        x="0" y="450"
                        transform="matrix(0.7071 0.7071 -0.7071 0.7071 540 -223.6753)"
                        width="1080" height="180"
                    />
                </svg>
            ) : <></>}
            <br />
                <h3>Name</h3>
                <fieldset>
                    <input
                        type="search" id="pesquisaNome"
                        name="pesquisaNome"
                        onChange={submit}
                    />
                </fieldset>
            <br />
                <h3>Type</h3>
                <fieldset id="theme">
                    <ThemeSelector action={submit}/>
                </fieldset>
            <br />
                <h3>Weight (kg)</h3>
                <fieldset>
                    <WeightSlider action={submit}/>
                </fieldset>
            <br />
                <h3>Generations</h3>
                <fieldset>
                    <GenSelectors action={submit}/>
                </fieldset>
            <br />
                <h3>Order by</h3>
                <fieldset>
                    <OrderBy action={submit}/>
                </fieldset>

            <button id="submit" ref={submitRef as LegacyRef<HTMLButtonElement>}>submit</button>
        </form>
    )
}