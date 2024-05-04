import React from 'react'
import { useState, useEffect } from 'react'
import '../../styles/styles.css'
import bg from '../../media/bg.png'
import { Navigate, useNavigate } from 'react-router-dom'



const Welcome = () => {

    const navigate = useNavigate();

    //const [selectedCompetencia, setSelectedCompetencia] = useState("");
    //const competencias = [
      //  { id_competencia: 0, nombre_competencia: 'Ligas'},
        //{ id_competencia: 1, nombre_competencia: 'Liga UdeRAP' }
    //];

    return (
        <div className='flex justify-center h-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'fill' }}>
            <div className='flex flex-col min-w-[25%] gap-5 my-auto py-7 items-center border-4 rounded-3xl border-black bg-white'>
                <section className='flex justify-between w-full bg-white px-7'>
                    <h1 className='flex text-[50px]'>Hola User</h1>
                    <button onClick={() => navigate('/ingresoJuez')} className='flex rounded-full px-5 py-2 h-1/4 self-center text-sky-100 bg-verde hover:bg-verdesito'>X</button>
                </section>
                <section className='flex flex-row gap-4'>
                    <button onClick={() => navigate('/admin')} className="rounded-xl bg-verde hover:bg-verdesito w-3/5 self-center text-white p-3 h-auto">Administrador</button>
                    <button onClick={() => navigate('/inicio_batalla')} className="rounded-xl bg-verde hover:bg-verdesito w-3/5 self-center text-white p-3 h-auto">Juez</button>
                </section>
                <section>
                    Cerrar sesión
                </section>
            </div>
        </div>
    )
}

export default Welcome