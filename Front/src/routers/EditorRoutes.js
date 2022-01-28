import { Routes, Route } from "react-router-dom";

//import { Navbar } from "../components/ui/Navbar";
import { Editor } from "../components/editor/Editor";
import { AddCategoria } from "../components/editor/AddCategoria";
import { AddProducto } from "../components/editor/AddProducto";
import { AddSubCategoria } from "../components/editor/AddSubCategoria";



export const EditorRoutes = () => {
    return (
        <>
           
            <Routes>
                <Route path="/" element={<Editor />}/>
                <Route path="add_categoria" element={<AddCategoria />}/>
                <Route path="add_producto" element={<AddProducto />}/>
                <Route path="add_sub_categoria" element={<AddSubCategoria />}/>
                
            </Routes>
        </>
    )
}
