import { Client, cacheExchange, fetchExchange } from "urql"

const requestHeaders: HeadersInit = new Headers();
requestHeaders.set('Content-Type', 'application/json')
requestHeaders.set('X-Method-Used', 'graphiql')

export const client = new Client({
    url: 'https://beta.pokeapi.co/graphql/v1beta',
    exchanges: [cacheExchange, fetchExchange]
})