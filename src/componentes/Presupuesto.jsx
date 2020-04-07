import React, { Fragment, useState } from 'react'
import Error from './Error';

const Presupuesto = ({guardarPresupuesto, guardarRestante, actualizarPregunta}) => {

    //Definir el state de la cantidad
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    //Función que lee el presupuesto
    const definirPresupuesto = e =>{
        guardarCantidad(parseFloat(e.target.value));
    }

    //submit para definir el presupuesto
    const agregarPresupuesto = (e)=>{
        e.preventDefault();
        
        //validar
        if(cantidad < 1 || isNaN(cantidad) || typeof(cantidad)!== 'number'){
            guardarError(true);
            return;
        }
        
        //una vez que pase la validación
        guardarError(false);

        //guardar presupuesto
        guardarPresupuesto(cantidad);
        guardarRestante(cantidad);
        actualizarPregunta(false);
    }

    return ( 
        <Fragment>
            <h2> ¿Cuál es tu presupuesto? </h2>
            {error ? <Error mensaje={'El Presupuesto es Incorrecto'}/> : null }
            <form
                onSubmit={agregarPresupuesto}
            >
                <input 
                    type="number"
                    className="u-full-width"
                    placeholder="Coloca tu presupuesto"
                    onChange={definirPresupuesto}
                />
                <input 
                    type="submit"
                    className="button-primary u-full-width"
                    value="Definir presupuesto"
                />
            </form>
        </Fragment>
     );
}
 
export default Presupuesto;