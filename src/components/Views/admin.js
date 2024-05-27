import React, { useState, useEffect } from 'react'
import '../../styles/styles.css'
import bg from '../../media/bg.png'
import { getMembersByCompetitionApi } from '../../Services/APIS/GetMembersByCompetition'
import ModalAdmin from '../Utils/ModalAdmin'
import ModalEdit from '../Utils/ModalEdit'
import { set } from 'firebase/database'
import { notify } from '../Utils/notify'
import { Modal } from 'bootstrap'


function Admin() {

  const [akaShown, setAkaShown] = useState('user')
  const [members, setMembers] = useState([])
  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null)

  const handleCancel = () => {
    notify("error", "No se ha podido añadir el miembro. Inténtalo de nuevo.")
    setIsModalOpen(false)
  }

  const handleCancelEdit = () => {
    notify("error", "No se editado ningún miembro.")
    setIsModalOpen(false)
  }

  const GetMembersByCompetition = async (competition) => {
    let result = await getMembersByCompetitionApi(competition)
    setMembers(result)
  }

  const handleSubmit = (e) => {
    setIsModalOpen(true);
  }

  const handleSubmitEdit = (e) => {
    setIsModalOpen(true);
  }

  useEffect(() => {
    GetMembersByCompetition("1")
    setAkaShown('Admin')
  }
    , [])


  return (
    <div className='flex justify-center h-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'fill' }}>
      <div className='flex flex-col min-w-[25%] max-w-[90%] gap-9 my-auto py-7 items-center border-4 rounded-3xl border-black bg-white'>
        <section className='flex flex-col items-center w-full px-7'>
          <h1 className='flex text-[50px]'>¡Hola {akaShown}!</h1>
          <h1 className='flex text-[18px]'>Bienvenido al Panel de Administración</h1>
        </section>
        <section className='flex flex-col items-center w-full px-2'>
          <div className='flex flex-col justify-center items-center w-4/5 gap-5'>
            <h1 className='text-[30px] text-[#3d405b] text-center'>Miembros de UdeRap</h1>
            <hr class="w-4/5 h-0.5 bg-[#000000]" />
            <div className="flex w-full justify-center items-center h-64" style={{ overflow: "auto" }}>
              {members != null ?
                <table className='table-auto'>
                  <thead className='sticky top-0 bg-white'>
                    <tr className='text-verde'>
                      <th className='p-2'>A.K.A</th>
                      <th className='p-2'>Rol</th>
                      <th className='p-2'>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member, index) => (
                      <tr key={index}>
                        <td className='p-2'>{member.aka}</td>
                        <td className='p-2'>{member.roleName}</td>
                        <td className='flex p-2 gap-3'>
                          <button className='bg-verdesito hover:bg-verde text-white font-bold py-2 px-2 rounded' onClick={() => {
                            handleSubmitEdit()
                            setIsButtonClicked(true)
                            setSelectedButton(null)
                          }}>Editar</button>
                          {member.idRole === 1 ? null : <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded'>Eliminar</button>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                : <p>Cargando miembros...</p>}
            </div>
            <hr class="w-4/5 h-0.5 bg-[#000000]" />
            <div>
              <button
                onClick={() => {
                  handleSubmit()
                  setIsButtonClicked(true)
                  setSelectedButton(null)
                }}
                className='flex items-center rounded-3xl hover:bg-verdesito bg-verde text-white w-10/12 p-2' >Añadir Miembros</button>
              <ModalAdmin isOpen={isModalOpen} onCancel={handleCancel}>
                Añadir Miembros
              </ModalAdmin>
              <ModalEdit isOpen={isModalOpen} onCancel={handleCancelEdit}>Editar Miembros</ModalEdit>
            </div>
          </div>
        </section>
      </div>

    </div>
  )
}

export default Admin