import { createContext, useState } from "react";
import { Child_ChildrenProps } from "../../global/ts/_interfaces";


interface PaginaGridContextProps{
    pagina: number,
    setPagina: React.Dispatch<React.SetStateAction<number>>
}

export const PaginaGridContext = createContext({} as PaginaGridContextProps)

export default function PaginaGridProvider({children} : Child_ChildrenProps){
    const [pagina, setPagina] = useState<number>(0)
    return(
        <PaginaGridContext.Provider value={{pagina, setPagina}}>{children}</PaginaGridContext.Provider>
    )
}