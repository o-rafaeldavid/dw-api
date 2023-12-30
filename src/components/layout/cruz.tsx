import { CSSProperties } from "react";
import '../../scss/cruz.scss'

export default function Cruz({style, parentElement} : {style: CSSProperties, parentElement: HTMLElement | null}){
    return(
        <svg className="cruz" x="0px" y="0px" viewBox="0 0 1080 1080"
            onClick={
                () => {
                    if(parentElement !== null) parentElement.removeAttribute('style')
                }
            }
        >
            <rect
                style={style}
                x="0" y="450"
                transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 1303.6753 540)"
                width="1080" height="180"
            />
            <rect
                style={style}
                x="0" y="450"
                transform="matrix(0.7071 0.7071 -0.7071 0.7071 540 -223.6753)"
                width="1080" height="180"
            />
        </svg>
    )
}