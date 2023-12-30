import { useContext } from 'react'
import { iconsColorByName, iconsGradientColorsByName } from '../../../global/ts/icons'
import { ThemeTypeContext } from '../../../contexts/themeType'

import '../../../scss/header.scss'




export default function Header(){
    const { themeType } = useContext(ThemeTypeContext)

    return(
        <header>
            <div></div>
            <svg id="abobada" x="0px" y="0px" viewBox="0 0 1920 102">
                <path d="M0,96c320-21.3,640-32,960-32c320,0,640,10.7,960,32V0H0V96z"/>
                <linearGradient
                    id="degradeForHeader" gradientUnits="userSpaceOnUse"
                    x1="-0.1996" y1="79.9967" x2="1920.1996" y2="79.9967"
                >
                    <stop  offset="0" style={{stopColor: iconsGradientColorsByName[themeType][1]}}/>
                    <stop  offset="1" style={{stopColor: iconsGradientColorsByName[themeType][0]}}/>
                </linearGradient>
                <path
                    style={{fill: 'none', stroke:'url(#degradeForHeader)', strokeWidth: 10, strokeMiterlimit:10}}
                    d="M0,96c320-21.3,640-32,960-32c320,0,640,10.7,960,32"
                />
            </svg>


            <nav>
                <a href="/" id="pokebola">
                <svg x="0px" y="0px" viewBox="0 0 512 512">
                    <path
                        style={{fill: iconsColorByName[themeType]}}
                        d="M330.3,256c0,41-33.3,74.3-74.3,74.3S181.7,297,181.7,256s33.3-74.3,74.3-74.3S330.3,215,330.3,256z
                        M149.1,214.1H3.5C23.4,92.6,128.9,0,256,0s232.6,92.6,252.5,214.1H362.9c-16.7-42.6-58.3-72.8-106.9-72.8
                        C207.4,141.2,165.9,171.4,149.1,214.1z M362.9,297.9h145.7C488.6,419.4,383.1,512,256,512C128.9,512,23.4,419.4,3.5,297.9h145.7
                        c16.7,42.6,58.2,72.8,106.8,72.8C304.6,370.7,346.1,340.6,362.9,297.9z"/>
                </svg>
                <svg x="0px" y="0px" viewBox="0 0 512 512">
                    <path
                        style={{fill: iconsColorByName[themeType]}}
                        d="M330.3,256c0,41-33.3,74.3-74.3,74.3S181.7,297,181.7,256s33.3-74.3,74.3-74.3S330.3,215,330.3,256z
                        M149.1,214.1H3.5C23.4,92.6,128.9,0,256,0s232.6,92.6,252.5,214.1H362.9c-16.7-42.6-58.3-72.8-106.9-72.8
                        C207.4,141.2,165.9,171.4,149.1,214.1z M362.9,297.9h145.7C488.6,419.4,383.1,512,256,512C128.9,512,23.4,419.4,3.5,297.9h145.7
                        c16.7,42.6,58.2,72.8,106.8,72.8C304.6,370.7,346.1,340.6,362.9,297.9z"/>
                </svg>
                </a>
            </nav>
            
        </header>
    )
}