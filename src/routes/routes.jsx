import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "../pages/Home"
import { Tratamiento } from "../pages/Tratamiento"
import { Configuracion } from "../pages/Configuracion"
import {Reglas} from "../pages/Reglas";

import styled from "styled-components";
export function MyRoutes() {
    return (
    

        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/tratamiento" element={<Tratamiento/>} />
            <Route path="/configuracion" element={<Configuracion/>} />
            <Route path="/reglas" element={<Reglas/>} />
            
        </Routes>
    )
}
