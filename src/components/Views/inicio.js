import React, { useState, useEffect } from 'react'
import '../../styles/styles.css'
import { useNavigate } from 'react-router-dom';
import micro from'../../media/micro.png'
import banner from'../../media/banner.png'
import uderap from'../../media/uderap.png'
import x from'../../media/x.png'
import bg from'../../media/bg.png'

function Inicio()  {
  const navigate = useNavigate();

  const Buttonroute = (route) => {
    navigate(route);
  };

  return (
    <div className='flex justify-center h-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'fill'}}>
      <div className='flex flex-col min-w-[25%] gap-5 my-auto py-7 items-center border-4 rounded-3xl border-black bg-white'>
        <div style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover'}} className='flex rounded-3xl hover:scale-110'>
          <img className='p-2' src={uderap} alt="uderap"/>
          <div className='flex flex-col justify-center items-center p-2'>
            <span style={{ whiteSpace: 'normal' }} className=' overflow-wrap text-[30px] text-white'>Liga Universitaria</span> 
            <span style={{ whiteSpace: 'normal' }} className=' overflow-wrap text-[30px] text-white'>de freestyle</span>
          </div>
        </div>
      <div className='flex flex-col items-center w-4/5'>
        <div>
          <h1 className='text-[30px] text-[#3d405b]'>Tabla de Posiciones</h1>
        </div>
        <hr class="w-4/5 h-0.5 bg-[#000000]"/>
        <div className= "flex w-full justify-center h-64" style={{overflow: "auto"}}>
          <table className='table-auto'>
            <thead className='sticky top-0 bg-white'>
              <tr className='text-verde'>
                <th className='p-2'>Posición</th>
                <th className='p-2'>A.K.A</th>
                <th className='p-2'>PTB</th>
                <th className='p-2'>PTS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className='p-2'>1</th>
                <td className='p-2'>Test</td>
                <td className='p-2'>100</td>
                <td className='p-2'>100</td>
              </tr>
              <tr>
                <th className='p-2'>2</th>
                <td className='p-2'>Pedro</td>
                <td className='p-2'>90</td>
                <td className='p-2'>90</td>
              </tr>
              <tr>
                <th className='p-2'>3</th>
                <td className='p-2'>Jose</td>
                <td className='p-2'>80</td>
                <td className='p-2'>80</td>
              </tr>
              <tr>
                <th className='p-2'>4</th>
                <td className='p-2'>Luis</td>
                <td className='p-2'>30</td>
                <td className='p-2'>30</td>
              </tr>
              <tr>
                <th className='p-2'>5</th>
                <td className='p-2'>Pepe</td>
                <td className='p-2'>10</td>
                <td className='p-2'>10</td>
              </tr>
              <tr>
                <th className='p-2'>5</th>
                <td className='p-2'>Pepe</td>
                <td className='p-2'>10</td>
                <td className='p-2'>10</td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr class="w-4/5 h-0.5 bg-[#000000]"/>
      </div>
      <div className='flex flex-col items-center w-4/5'>
        <div>
          <h1 className='text-[30px] text-[#3d405b]'>Última fecha!</h1>
        </div>
        <button onClick={() => Buttonroute('/jornada')} className='flex w-4/5 justify-evenly items-center rounded-3xl size bg-verde px-2 hover:bg-verdesito text-white text-[30px]'> 
          <img className='p-2' src={micro} alt="uderap"/>
          Fecha #2
        </button>
      </div>
      <hr class="w-4/5 h-0.5 bg-[#000000]"/>
      <button onClick={() => Buttonroute('/ingreso_juez')} className='rounded-3xl hover:bg-verdesito bg-verde' >Ingreso Juez
        <img className='p-2' src={x} alt="uderap"/>
      </button>
    </div>
  </div>
  )
}

export default Inicio;