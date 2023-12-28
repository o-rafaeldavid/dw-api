import { useEffect } from "react"

export function useEventListener(
    DOC : HTMLElement | Window | Document,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
){
    useEffect(
        () => {
            (options !== undefined)
                ? DOC.addEventListener(type, listener, options)
                : DOC.addEventListener(type, listener)
            
            return () => {
                (options !== undefined)
                    ? DOC.removeEventListener(type, listener, options)
                    : DOC.removeEventListener(type, listener)
            }
        }
    )
}