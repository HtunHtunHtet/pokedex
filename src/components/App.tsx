import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./Home";
import Detail from "./Detail";
import NoRoute from "./NoRoute";

const App = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/detail" element={<Detail/>} />
                <Route path="*" element={<NoRoute/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
