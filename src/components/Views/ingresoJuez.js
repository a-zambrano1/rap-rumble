import React from "react";
import '../../styles/styles.css'
import bg from '../../media/bg.png'
import { Link } from 'react-router-dom';

function ingresoJuez() {
  return (
    <div className='flex justify-center h-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'fill'}}>
      <div className='flex min-w-1/4 min-h-[65%] items-center flex-col my-auto py-7 border-4 rounded-3xl border-black bg-white'>
        <div className="flex self-start p-7 mb-5">
            <Link to="/" className='text-[25px] font-semibold hover:text-verdesito'>« Regresar</Link>
        </div>
        <div className="flex flex-col h-fit gap-6 px-7">
          <div className="flex flex-col self-start gap-4">
            <span className='text-[70px] font-bold leading-none text-black'>Liga
              <span className='text-[70px] font-bold leading-none text-[#2D8F1D]'> UdeRAP</span>
            </span>
            <span className="flex justify-start self-start">Ingreso de Juez</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <input className="rounded-xl w-4/5 border-2 border-gray-500 p-3 h-auto "
            id="idJuez"
            placeholder="A.K.A del Juez"
            />
            <input className="rounded-xl w-4/5 border-2 border-gray-500 p-3 h-auto"
              minLength="8"
              label="Contraseña"
              type="password"
              id="password"
              placeholder="Contraseña"
            />
          </div>
          <button className="rounded-xl bg-verde hover:bg-verdesito w-3/5 self-center text-white p-3 h-auto">
            <span>Ingresar</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ingresoJuez