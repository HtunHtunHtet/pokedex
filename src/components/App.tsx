import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./Home";
import Detail from "./Detail";
import NoRoute from "./NoRoute";
import AddPokemon from "./AddPokemon";

const App = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/detail/:id" element={<Detail/>} />
                <Route path="/add-pokemon" element={<AddPokemon/>} />
                <Route path="*" element={<NoRoute/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
