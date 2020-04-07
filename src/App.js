import React, {Fragment, useState, useEffect} from 'react';
import Presupuesto from './componentes/Presupuesto';
import Formulario from './componentes/Formulario';
import Listado from './componentes/Listado';
import Restante from './componentes/Restante';

function App() {

  localStorage.removeItem('gastos');

        /* Sección donde trabajaremos con localStorage */
        let gastosIniciales = JSON.parse(localStorage.getItem('gastos'));
        if(!gastosIniciales){
          gastosIniciales=[];
        }

 
  /* ********** */

  //Definir el state 
  const [presupuesto, guardarPresupuesto]=useState(0);
  const [restante, guardarRestante]=useState(0);
  const [mostrarpregunta, actualizarPregunta] =useState(true);
  const [gastos, guardarGastos] = useState(gastosIniciales);  

      /* Cuando se detecte cambio en los gastos se actualizará 
     localstorage */

     useEffect(()=>{
      
      if(gastosIniciales){
        localStorage.setItem('gastos', JSON.stringify(gastos));
      }else{
       localStorage.setItem('gastos', JSON.stringify([]));
     };
     gastosIniciales = JSON.parse(localStorage.getItem('gastos'));
     gastosIniciales.forEach(gasto =>{
       guardarRestante(restante-gasto.cantidad);
     });
    },[gastos, restante, gastosIniciales]);

 /* *********************** */


  //Cuando agregemos un nuevo gasto
  const agregarNuevoGasto = (gasto) =>{
    console.log(gasto);
    guardarGastos([
      ...gastos,
      gasto
    ])
  }


  return(
    <Fragment>
      <div className="container">
        <header>
          <h1> Gasto Semanal </h1>
          <div className="contenido-principal contenido">
            {mostrarpregunta ?             
            (<Presupuesto
              guardarPresupuesto = {guardarPresupuesto}
              guardarRestante={guardarRestante}
              actualizarPregunta = {actualizarPregunta}
            />) : 
            (<div className="row">
              <div className="one-half column">
                <Formulario 
                  agregarNuevoGasto = {agregarNuevoGasto}
                />
              </div>
              <div className="one-half column">
                <Restante 
                  presupuesto = {presupuesto}
                  restante = {restante}
                />
                <Listado 
                  gastos = {gastos}
                />
              </div>
            </div>)}
          </div>
        </header>
      </div>
    </Fragment>
  ) ;
}

export default App;
