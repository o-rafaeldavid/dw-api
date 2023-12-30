

import { LegacyRef, useContext, useRef, useState } from "react"
import { ThemeTypeContext } from "../../../contexts/themeType"
import { iconsGradientByName } from "../../../global/ts/icons"
import { Action } from "../../../global/ts/_interfaces"


import "../../../scss/weightSlider.scss"




export default function WeightSlider({action} : Action){
    const { themeType } = useContext(ThemeTypeContext)

    const inputRef = {
        left: useRef<HTMLInputElement>(),
        right: useRef<HTMLInputElement>()
    }

    const thumbRef = {
        left: useRef<HTMLDivElement>(),
        right: useRef<HTMLDivElement>()
    }

    const spanRef = {
        left: useRef<HTMLSpanElement>(),
        right: useRef<HTMLSpanElement>()
    }

    const spanValue = {
        left: useState<number>(0),
        right: useState<number>(999.9)
    }

    const rangeRef = useRef<HTMLDivElement>()




    const setValues = {
        left: (e : React.FormEvent<HTMLInputElement>) => {
            const target = e.currentTarget
            const min = parseInt(target.min)
            const max = parseInt(target.max)

            const inputRight = inputRef.right.current
            const leftThumb = thumbRef.left.current
            const leftSpan = spanRef.left.current
            const range = rangeRef.current



            if(
                inputRight !== undefined
                && leftThumb !== undefined
                && leftSpan !== undefined
                && range !== undefined
            ){
                target.value = Math.min(
                    parseInt(target.value),
                    parseInt(inputRight.value) - 1
                ) + ''

                spanValue.left[1](parseInt(target.value) / 10)

                var percent = ((parseInt(target.value) - min) / (max - min)) * 100
                leftThumb.style.left = range.style.left = leftSpan.style.left = percent + '%'
            }
        },

        ////////////////////
        ////////////////////
        ////////////////////

        right: (e : React.FormEvent<HTMLInputElement>) => {
            const target = e.currentTarget
            const min = parseInt(target.min)
            const max = parseInt(target.max)

            const inputLeft = inputRef.left.current
            const rightThumb = thumbRef.right.current
            const rightSpan = spanRef.right.current
            const range = rangeRef.current


            
            if(
                inputLeft !== undefined
                && rightThumb !== undefined
                && rightSpan !== undefined
                && range !== undefined
            ){
                target.value = Math.max(
                    parseInt(target.value),
                    parseInt(inputLeft.value) + 1
                ) + ''

                spanValue.right[1](parseInt(target.value) / 10)

                var percent = ((parseInt(target.value) - min) / (max - min)) * 100
                rightThumb.style.right = range.style.right = rightSpan.style.right = (100 - percent) + '%'
                
            }
        }
    }

    return(
        <div id="weightSlider">

            <div className="slider">
                <div className="track"></div>

                <div
                    className="range"
                    style={{background: `${iconsGradientByName[themeType]}`}}
                    ref={rangeRef as LegacyRef<HTMLDivElement>}
                ></div>

                <div className="thumb left" ref={thumbRef.left as LegacyRef<HTMLDivElement>}></div>
                <span ref={spanRef.left as LegacyRef<HTMLDivElement>}>{spanValue.left[0]}</span>
                <div className="thumb right" ref={thumbRef.right as LegacyRef<HTMLDivElement>}></div>
                <span ref={spanRef.right as LegacyRef<HTMLDivElement>}>{spanValue.right[0]}</span>
            </div>


            <input
                type="range"
                min={0} max={9999} step={1}
                defaultValue={0}
                name="input_left"
                id="input_left"
                ref={inputRef.left as LegacyRef<HTMLInputElement>}

                onInput={setValues.left}
                onMouseEnter={() => {
                    const leftThumb = thumbRef.left.current
                    if(leftThumb !== undefined) leftThumb.classList.add('hover')
                }}
                onMouseLeave={() => {
                    const leftThumb = thumbRef.left.current
                    if(leftThumb !== undefined) leftThumb.classList.remove('hover')
                }}
                onMouseUp={() => {if(action !== undefined) action()}}
                onTouchEnd={() => {if(action !== undefined) action()}}
            />
            <input
                type="range"
                min={0} max={9999} step={1}
                defaultValue={9999}
                name="input_right"
                id="input_right"
                ref={inputRef.right as LegacyRef<HTMLInputElement>}

                onInput={setValues.right}
                onMouseEnter={() => {
                    const rightThumb = thumbRef.right.current
                    if(rightThumb !== undefined) rightThumb.classList.add('hover')
                }}
                onMouseLeave={() => {
                    const rightThumb = thumbRef.right.current
                    if(rightThumb !== undefined) rightThumb.classList.remove('hover')
                }}
                onMouseUp={() => {if(action !== undefined) action()}}
                onTouchEnd={() => {if(action !== undefined) action()}}
            />

        </div>
    )
}