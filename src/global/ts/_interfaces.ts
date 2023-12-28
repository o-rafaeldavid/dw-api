import { EnumValueNode } from "graphql"
import { Attributes, Dispatch, Key, MouseEventHandler } from "react"

/*  */

export interface reQueryProps {
    query: string
    onLoading?: string
    onError?: string
}

/*  */

export interface Child_ChildrenProps {
    children: JSX.Element | JSX.Element[] 
}

/*  */

export interface TypesProps {
    all: string,
    normal: string,
    fighting: string,
    flying: string,
    poison: string,
    ground: string,
    rock: string,
    bug: string,
    ghost: string,
    steel: string,
    fire: string,
    water: string,
    grass: string,
    electric: string,
    psychic: string,
    ice: string,
    dragon: string,
    dark: string,
    fairy: string
}

export interface TypesPropsArray {
    all: string[],
    normal: string[],
    fighting: string[],
    flying: string[],
    poison: string[],
    ground: string[],
    rock: string[],
    bug: string[],
    ghost: string[],
    steel: string[],
    fire: string[],
    water: string[],
    grass: string[],
    electric: string[],
    psychic: string[],
    ice: string[],
    dragon: string[],
    dark: string[],
    fairy: string[]
}

export interface ThemeTypeProps{
    themeType: keyof TypesProps
}


export interface ThemeSpinnerProps{
    themeType: keyof TypesProps,
    showSpinner: boolean,
    onMouseEnter?: MouseEventHandler
    onMouseLeave?: MouseEventHandler 
}

export interface PkmnNavigateProps{
    anterior: boolean | undefined
    proximo: boolean | undefined
    state: number
    setState: React.Dispatch<React.SetStateAction<number>>
    type: 'fundo' | 'semfundo'
    textType: 'state' | string[]
}