import { useEffect, useRef, useState } from "react";
import { gql, useQuery } from "urql"
import { reQueryProps } from "../ts/_interfaces";

export const useREQuery = (props : reQueryProps) => {
    const [stateQuery, setStateQuery] = useState<reQueryProps>(props)

    const [result, reexecuteQuery] = useQuery({
        query: gql`query{${stateQuery.query}}`
    })


    const { data, fetching, error } = result;

    const [res, setRes] = useState<any>((props.onLoading) ? props.onLoading : 'Loading...')
    const [isLoading, setISLoading] = useState<boolean>(true)

    useEffect(
        () => {
            if (fetching){
                console.log('fetching')
                return
            }
            if (error){
                setISLoading(false)
                console.log('erro')
                setRes(`${(props.onError) ? props.onError : 'Oh no...'} | ${error.message}`)
                return
            }

            setISLoading(false)
            setRes(data)
            return
        }, [data, fetching, error]
    )

    return {
        res,
        isLoading,
        reexecuteQuery,
        newQuery: setStateQuery
    }
}