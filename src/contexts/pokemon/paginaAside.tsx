import { createContext, useState } from "react";
import { Child_ChildrenProps } from "../../global/ts/_interfaces";


interface PaginaAsideContextProps{
    paginaAside: number,
    setPaginaAside: React.Dispatch<React.SetStateAction<number>>
}

export const PaginaAsideContext = createContext({} as PaginaAsideContextProps)

export default function PaginaAsideProvider({children} : Child_ChildrenProps){
    const [paginaAside, setPaginaAside] = useState<number>(0)
    return(
        <PaginaAsideContext.Provider value={{paginaAside, setPaginaAside}}>{children}</PaginaAsideContext.Provider>
    )
}