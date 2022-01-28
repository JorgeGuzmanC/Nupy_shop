import { editor } from "../../../../service/services/Editor.service";
import React, { useState } from "react";
import ReportIcon from '@mui/icons-material/Report';

export const AddSubCategoria: React.FC<any> = (props:any): JSX.Element => {

    const id_modulo = props;
    const [addInput, setAdd] = useState({
        nombre: '',
        submitted: false,
    });

    const handleInput = (e) => {
        e.persist();
        const name = e.target.name;
        const value = e.target.value;
        
        switch(name){
            case 'nombre':
                setAdd(prev => ({
                    ...prev,
                    nombre: value
                }));
                break;
            default:
                break;
        }
    }

    const guardar = async(e) =>{
        e.preventDefault();
        
        setAdd(prev => ({
            ...prev,
            submitted: true
        }))
        
        const {nombre} = addInput;

        if(!nombre){
            return;
        }

        const state = 1;
        //console.log(id_modulo);
        await editor.addSubmodulo(nombre, state, id_modulo);
        window.location.reload();
    }

    return(
        <div>
                <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card-body">
                            <form 
                            onSubmit={guardar}
                            >
                                <div className={'form-group'+ (addInput.submitted && !addInput.nombre ? ' has-error' : '')}>
                                    <label>Nombre Submodulo</label>
                                    <input type="text" name="nombre" onChange={handleInput} value={addInput.nombre} className="form-control"/>
                                    {addInput.submitted && !addInput.nombre && (
                                    <div className='help-block'><ReportIcon/>Ingresa un nombre para el submodulo</div>
                                    )}
                                </div>
                                <div className="form-group mb-3">
                                    <button type="submit" className="btn btn-primary">Agregar Submodulo</button>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
                </div>
            </div>
    );
}