import { Routes, Route } from "react-router-dom";

import { Navbar } from "../components/ui/Navbar";

import { Home } from "../components/home/Home";
import { Caja } from "../components/caja/Caja";

import { Pedidos } from "../components/pedidos/Pedidos";
import { Reporte } from "../components/reporte/Reporte";

import { EditorRoutes } from "./EditorRoutes"



export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="Home" element={<Home />}/>
                <Route path="Caja" element={<Caja />}/>
                <Route path="Editor/*" element={<EditorRoutes />}></Route>
                <Route path="Pedidos" element={<Pedidos />}/>
                <Route path="Reporte" element={<Reporte />}/>
                

            </Routes>
        </>
    )
}
