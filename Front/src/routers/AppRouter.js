import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from 'react'

import { Login } from "../components/login/Login";

import { DashboardRoutes } from "./DashboardRoutes";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            
            <Routes>
                
                <Route path="/Login" element={<Login />}/>

                <Route path="/*" element= {<DashboardRoutes />}></Route>

            </Routes>
        </BrowserRouter>
    )
}
