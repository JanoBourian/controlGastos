import React, {Fragment} from 'react';
import {validarClases} from '../helpers/helpers';

const Restante = ({presupuesto, restante}) => {
    return ( 
        <Fragment>
            <div className="alert alert-primary">
                Presupuesto: ${presupuesto}
            </div>
            <div className={validarClases(presupuesto,restante)}>
                Restante: ${restante}
            </div>
        </Fragment>
     );
}
 
export default Restante;