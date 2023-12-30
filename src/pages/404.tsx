import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function NotFound(){
    let navigate = useNavigate()

    useEffect(
        () => {
            navigate('/')
        }, []
    )

    return(
        <>
        </>
    )
}