import {Link} from 'react-router-dom';

export const AddSubCategoria = () => {
    console.log('tamo')

    return (
        <div>
            <Link to={'/editor'} className="btn btn-primary btn-sm ">Atras</Link>
            <h1>-agregar categoria-</h1>
        </div>
    )
}