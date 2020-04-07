import React , {useState, Fragment} from 'react';
import shortid from 'shortid';
import Error from './Error';


const Formulario = ({agregarNuevoGasto}) => {

    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    const definirNombre = (e) =>{
        guardarNombre(e.target.value);
    }
    
    const definirCantidad = (e) =>{
        guardarCantidad(parseFloat(e.target.value));
    }

    //Cuando el usuario agrega un gasto
    const agregarGasto = (e)=>{
        e.preventDefault();

        //validar
        if(cantidad < 1 || isNaN(cantidad) || typeof(cantidad) !== 'number' || nombre.trim()===""){
            guardarError(true);
            return; 
        }
        
        //Cuando ya pasamos la validación 
        guardarError(false);

        //construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }

                //pasar el gasto al componente principal
        agregarNuevoGasto(gasto);

        // resetear el form
        guardarNombre('');
        guardarCantidad(0);
    }


    return ( 
        <Fragment>
            <form
                onSubmit={agregarGasto}
            >
                <h2> Agrega tus gastos aquí </h2>
                {error ? <Error mensaje="Hay un error con los datos"/> : null}
                <div className="campo">
                    <label> Nombre del gasto</label>
                    <input
                        type="text"
                        className="u-full-width"
                        placeholder="Ej.: Transporte"
                        value = {nombre}
                        onChange={definirNombre}
                    />
                </div>
                <div className="campo">
                    <label> Cantidad gasto</label>
                    <input
                        type="number"
                        className="u-full-width"
                        placeholder="Ej. 300"
                        value = {cantidad}
                        onChange = {definirCantidad}
                    />
                </div>
                <input 
                    type="submit"
                    className="u-full-width button-primary"
                    value="Agregar gasto"
                />
            </form>
        </Fragment>
     );
}
 
export default Formulario;