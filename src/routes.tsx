import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/layout/header/_header'

import Home from './pages/home'
import Pokemon from './pages/pokemon'
import NotFound from './pages/404'
import PaginaGridProvider from './contexts/home/paginaGrid'

import './scss/main.scss'

export default function Ruas() {
    return(
        <BrowserRouter>
            <Header/>
            <div id="container">
                <Routes>
                    {/* Home */}
                    <Route path='/' element={
                        <PaginaGridProvider>
                            <Home/>
                        </PaginaGridProvider>
                    } />
                    {/* Sobre cada Pokemon */}
                    <Route path='/pokemon' element={<Pokemon/>}/>
                    <Route path='/pokemon/:pkmn' element={<Pokemon/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}