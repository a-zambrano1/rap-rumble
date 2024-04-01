import React from "react";
import '../../styles/styles.css'
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";

function ingresoJuez() {
  return (
    <div className='flex max-h-screen my-16 justify-center items-center self-center debug'>
      <div>
        <div >
          <a className='regresar'>« Regresar</a>
        </div>
        <div className='opciones-login'>
          <span className='raprumble'>Rap
            <span className='raprumble1'>Rumble</span>
          </span>
        </div>
        <div className='opciones-login'>
          <span>Ingreso de Usuario</span>
        </div>
        <section>
          <div className="cuadro-informacion">
            <MDBInput
              label="A.K.A del Juez"
              id="email"
              style={{ height: 25 }}
            />
            <MDBInput
              minLength="8"
              label="Contraseña"
              type="password"
              id="password"
              style={{ height: 25 }}
            />
            <MDBBtn rounded color='success'
              size='lg'>
              <span>Ingresar </span>
            </MDBBtn>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ingresoJuez