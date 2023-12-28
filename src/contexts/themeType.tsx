import { createContext, useState } from "react";
import { Child_ChildrenProps, TypesProps } from "../global/ts/_interfaces";


interface ThemeTypeContextProps{
    themeType: keyof TypesProps,
    setThemeType: React.Dispatch<React.SetStateAction<keyof TypesProps>>
}

export const ThemeTypeContext = createContext({} as ThemeTypeContextProps)

export default function ThemeTypeProvider({children} : Child_ChildrenProps){
    const [themeType, setThemeType] = useState<keyof TypesProps>('all')
    return(
        <ThemeTypeContext.Provider value={{themeType, setThemeType}}>{children}</ThemeTypeContext.Provider>
    )
}