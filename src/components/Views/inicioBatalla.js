import React from 'react'
import banner from'../../media/bg-hiphop.jpg'
import uderap from'../../media/uderap.png'
import { Link } from 'react-router-dom';
import bg from'../../media/bg-4.jpg'

const inicioBatalla = () => {
  return (
    <div className='flex justify-center h-screen bg-contain' style={{ backgroundImage: `url(${bg})`}}>
      <div className='flex justify-center h-screen'>
        <div className='className=flex min-w-1/4 min-h-[70%] items-center flex-col my-auto py-7 border-4 rounded-3xl border-black bg-white'>
            <div className="flex self-start p-1 mb-5">
                <Link to="/" className='text-[25px] font-semibold hover:text-verdesito'>« Regresar</Link>
            </div>
          <div style={{ backgroundImage: `url(${banner})`, backgroundSize: 'contain'}} className='flex m-4 rounded-3xl hover:scale-110'>
            <img className='p-4' src={uderap} alt="uderap"/>
              <div className='flex flex-col justify-center items-center p-10'>
                <span style={{ whiteSpace: 'normal' }} className=' overflow-wrap text-[30px] text-white'>Bienvenid@ al panel</span> 
                <span style={{ whiteSpace: 'normal' }} className=' overflow-wrap text-[30px] text-white'>de votación</span>
              </div>
          </div>
          <div className="flex flex-col items-center p-5 gap-4">
                <input className="rounded-xl w-4/5 border-2 border-gray-500 p-3 h-auto "
                id="idJuez"
                placeholder="A.K.A del Juez"
                />
                <input className="rounded-xl w-4/5 border-2 border-gray-500 p-3 h-auto "
                id="idJuez"
                placeholder="Localización de la Jornada"
                />
                <input className="rounded-xl w-4/5 border-2 border-gray-500 p-3 h-auto "
                id="idJuez"
                placeholder="MC1"
                />
                <input className="rounded-xl w-4/5 border-2 border-gray-500 p-3 h-auto "
                id="idJuez"
                placeholder="MC2"
                />
                <button className="rounded-xl bg-verde hover:bg-verdesito w-3/5 self-center text-white p-3 h-auto">
                  <span>Iniciar votación</span>
                </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default inicioBatalla