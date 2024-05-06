import React from 'react'
import { useState, useEffect } from 'react'
import '../../styles/styles.css'
import bg from '../../media/bg.png'
import { Navigate, useNavigate } from 'react-router-dom'
import snoop from '../../media/snoop.png'
import hat from '../../media/hat.png'



const Welcome = () => {

    const navigate = useNavigate();

    //const [selectedCompetencia, setSelectedCompetencia] = useState("");
    //const competencias = [
      //  { id_competencia: 0, nombre_competencia: 'Ligas'},
        //{ id_competencia: 1, nombre_competencia: 'Liga UdeRAP' }
    //];

    return (
        <div className='flex justify-center h-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'fill' }}>
            <div className='flex flex-col min-w-[25%] gap-9 my-auto py-7 items-center border-4 rounded-3xl border-black bg-white'>
                <section className='flex justify-center w-full px-7'>
                    <h1 className='flex text-[50px]'>Hola User! Qué quieres hacer hoy?</h1>
                </section>
                <section className='flex justify-evenly gap-4'>
                    <button onClick={() => navigate('/inicio_batalla')} className='flex flex-col items-center rounded-3xl hover:bg-verdesito bg-verde text-white w-4/12' >Ingresar como Juez
                        <img className='p-2' src={hat} alt="rapper"/>
                    </button>
                    <button onClick={() => navigate('/admin')} className='flex flex-col items-center rounded-3xl hover:bg-verdesito bg-verde text-white w-4/12' >Ingresar como Admin
                        <img className='p-2' src={snoop} alt="rapper"/>
                    </button>
                </section>
                <section>
                <button onClick={() => navigate('/')} className="rounded-xl bg-verde hover:bg-verdesito text-white p-3 h-auto">
                    <span>Salir</span>
                </button>
                </section>
            </div>
        </div>
    )
}

export default Welcome