import PkmnCard from "./pkmnCard"


export default function PkmnGrid({pkmnObtainableArray} : any){
    return(
        <ol id="PkmnGrid">
            {pkmnObtainableArray.map(
                    (pkmn : any, index: number) => {
                        return (pkmn !== undefined) ? <PkmnCard key={"pkmnCard-" + index} pkmn={pkmn}/> : <div key={`undefined-` + index}></div>
                    }
                )
            }
        </ol>
    )
}