import { useRef, useState } from "react"
import PkmnCard from "./pkmnCard"


export default function PkmnGrid({pkmnObtainableArray} : any){
    return(
        <ol id="PkmnGrid">
            {pkmnObtainableArray.map(
                    (pkmn : any, index: number) => <PkmnCard key={"pkmnCard-" + index} pkmn={pkmn}/>
                )
            }
        </ol>
    )
}