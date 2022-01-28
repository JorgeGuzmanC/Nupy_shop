import {Link} from 'react-router-dom';

export const AddProducto = () => {
    console.log('add')

    return (
        <div>
            <Link to={'/editor'} className="btn btn-primary btn-sm ">Atras</Link>
            <h1>productoadd</h1>
        </div>
    )
}