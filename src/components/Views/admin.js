import React from 'react'
import '../../styles/styles.css'
import bg from '../../media/bg.png'

function Admin() {
  return (
    <div className='flex justify-center h-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'fill' }}>
      <div className='flex flex-col min-w-[25%] gap-9 my-auto py-7 items-center border-4 rounded-3xl border-black bg-white'>
        <section className='flex justify-center flex-col w-full px-7'>
          <h1 className='flex text-[50px]'>¡Hola User!</h1>
          <h1 className='flex text-[18px]'>Bienvenido al Panel de Administración</h1>
        </section>
        <section className='flex flex-col justify-center w-full px-2'>
          <div>
            <button className='flex items-center rounded-3xl hover:bg-verdesito bg-verde text-white w-4/12' >Añadir Miembros</button>
          </div>
          <div className='flex flex-col justify-center items-center w-4/5'>
            <div className='flex justify-center items-center'>
              <h1 className='text-[30px] text-[#3d405b]'>Miembros de la Competencia</h1>
            </div>
            <hr class="w-4/5 h-0.5 bg-[#000000]" />
            <div className="flex w-full justify-center h-64" style={{ overflow: "auto" }}>
              <table className='table-auto'>
                <thead className='sticky top-0 bg-white'>
                  <tr className='text-verde'>
                    <th className='p-2'>A.K.A</th>
                    <th className='p-2'>Rol</th>
                    <th className='p-2'></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='p-2'>Zzatanas</td>
                    <td className='p-2'>Juez</td>
                    <td className='p-2'>Boton editar</td>
                  </tr>
                  <tr>
                    <td className='p-2'>Zzatanas</td>
                    <td className='p-2'>Juez</td>
                    <td className='p-2'>Boton editar</td>
                  </tr>
                  <tr>
                    <td className='p-2'>Zzatanas</td>
                    <td className='p-2'>Juez</td>
                    <td className='p-2'>Boton editar</td>
                  </tr>
                  <tr>
                    <td className='p-2'>Zzatanas</td>
                    <td className='p-2'>Juez</td>
                    <td className='p-2'>Boton editar</td>
                  </tr>
                  <tr>
                    <td className='p-2'>Zzatanas</td>
                    <td className='p-2'>Juez</td>
                    <td className='p-2'>Boton editar</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr class="w-4/5 h-0.5 bg-[#000000]" />
          </div>
        </section>
      </div>

    </div>
  )
}

export default Admin