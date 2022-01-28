import {Link} from 'react-router-dom';

export const AddCategoria = () => {
    console.log('tamo')

    return (
        <div>
            <Link to={'/editor'} className="btn btn-primary btn-sm ">Atras</Link>
            <h1>add categoria</h1>
            
        </div>
        
        
    )
}