import React from 'react'
import '../../styles/styles.css'
import bg from'../../media/bg.png'
import { useNavigate } from 'react-router-dom';

const Votacion = () => {

  const navigate = useNavigate();

  const Buttonroute = (route) => {
    navigate(route);
  };

  return (
    <div className='flex justify-center h-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'fill'}}>
      <div className='flex flex-col min-w-[25%] gap-5 my-auto py-7 items-center border-4 rounded-3xl border-black bg-white'>
        <section className='flex justify-between w-full bg-white'>
          <div className='flex flex-col'>
            <h1 className='flex items-center text-[50px]'>Votación
            </h1>
          </div>
          <button onClick={()=> Buttonroute('/')} className='flex rounded-full p-5  h-1/4 self-center bg-verde hover:bg-verdesito'>
            X
          </button>
        </section>
        <section>
          
        </section>
      </div>
    </div>
  )
}

export default Votacion