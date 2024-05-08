import React, { useState } from 'react'
import '../../styles/styles.css'
import bg from '../../media/bg.png'
function Admin() {

  const [akaShown, setAkaShown] = useState('Zzatanas')
  const [Competencia, setCompetencia] = useState('UdeRap')
  
  return (
    <div className='flex justify-center h-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'fill' }}>
      <div className='flex flex-col min-w-[25%] max-w-[90%] gap-9 my-auto py-7 items-center border-4 rounded-3xl border-black bg-white'>
        <section className='flex flex-col items-center w-full px-7'>
          <h1 className='flex text-[50px]'>¡Hola {akaShown}!</h1>
          <h1 className='flex text-[18px]'>Bienvenido al Panel de Administración</h1>
        </section>
        <section className='flex flex-col items-center w-full px-2'>
          <div className='flex flex-col justify-center items-center w-4/5 gap-5'>
            <h1 className='text-[30px] text-[#3d405b] text-center'>Miembros de {Competencia}</h1>
            <hr class="w-4/5 h-0.5 bg-[#000000]" />
            <div className="flex w-full justify-center items-center h-64" style={{ overflow: "auto" }}>
              <table className='table-auto'>
                <thead className='sticky top-0 bg-white'>
                  <tr className='text-verde'>
                    <th className='p-2'>A.K.A</th>
                    <th className='p-2'>Rol</th>
                    <th className='p-2'>Editar</th>
                    <th className='p-2'>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='p-2'>Zzatanas</td>
                    <td className='p-2'>Juez</td>
                    <td className='p-2'>Boton editar</td>
                    <td className='p-2'>Boton eliminar</td>
                  </tr>
                  <tr>
                    <td className='p-2'>Zzatanas</td>
                    <td className='p-2'>Juez</td>
                    <td className='p-2'>Boton editar</td>
                    <td className='p-2'>Boton eliminar</td>
                  </tr>
                  <tr>
                    <td className='p-2'>Zzatanas</td>
                    <td className='p-2'>Juez</td>
                    <td className='p-2'>Boton editar</td>
                    <td className='p-2'>Boton eliminar</td>
                  </tr>
                  <tr>
                    <td className='p-2'>Zzatanas</td>
                    <td className='p-2'>Juez</td>
                    <td className='p-2'>Boton editar</td>
                    <td className='p-2'>Boton eliminar</td>
                  </tr>
                  <tr>
                    <td className='p-2'>Zzatanas</td>
                    <td className='p-2'>Juez</td>
                    <td className='p-2'>Boton editar</td>
                    <td className='p-2'>Boton eliminar</td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
            <hr class="w-4/5 h-0.5 bg-[#000000]" />
            <div>
              <button className='flex items-center rounded-3xl hover:bg-verdesito bg-verde text-white w-10/12 p-2' >Añadir Miembros</button>
            </div>
          </div>
        </section>
      </div>

    </div>
  )
}

export default Admin