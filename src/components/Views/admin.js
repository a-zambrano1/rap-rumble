import React, { useState, useEffect } from 'react'
import '../../styles/styles.css'
import bg from '../../media/bg.png'
import { getMembersByCompetitionApi } from '../../Services/APIS/GetMembersByCompetition'
import { deleteMemberApi } from '../../Services/APIS/DeleteMember'
import ModalAdmin from '../Utils/ModalAdmin'
import ModalEdit from '../Utils/ModalEdit'
import ModalDelete from '../Utils/ModalDelete'
import { notify } from '../Utils/notify'


function Admin() {

  const [akaShown, setAkaShown] = useState('user')
  const [members, setMembers] = useState([])
  const [selectedMember, setSelectedMember] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [isModalDelete, setIsModalDelete] = useState(false)

  const handleCancel = () => {
    notify("error", "No se ha podido añadir el miembro. Inténtalo de nuevo.")
    setIsModalOpen(false)
  }

  const handleCancelEdit = () => {
    notify("error", "No se ha editado ningún miembro.")
    setIsModalEditOpen(false)
  }

  const handleCancelDelete = () => {
    notify("error", "No se ha eliminado ningún miembro.")
    setIsModalDelete(false)
  }
  
  const GetMembersByCompetition = async (competition) => {
    let result = await getMembersByCompetitionApi(competition)
    setMembers(result)
  }

  const DeleteMember = async (idMember) => {
    let result = await deleteMemberApi(idMember)
    return result
  }

  const handleSubmit = (e) => {
    setIsModalOpen(true);
  }

  const handleSubmitEdit = () => {
    setIsModalEditOpen(true)
  }

  const handleDelete = () => {
    setIsModalDelete(true)
  }

  const handleConfirm = async () => {
    try {
    const deleted = await DeleteMember(selectedMember)
    if (deleted.message === 'member deleted') {
      notify("success", "Miembro eliminado correctamente.")
    } else {
      notify("error", "No se ha podido eliminar el miembro. Inténtalo de nuevo.")
    }
  } catch (error) {
    console.error(error)
  }
  setIsModalDelete(false)
}

  useEffect(() => {
    GetMembersByCompetition("1")
    setAkaShown('Admin')
  }
    , [isModalOpen, isModalEditOpen, isModalDelete])


  return (
    <div className='flex justify-center h-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'fill' }}>
      <div className='flex flex-col min-w-[25%] max-w-[90%] gap-9 my-auto py-7 items-center border-4 rounded-3xl border-black bg-white'>
        <section className='flex flex-col items-center w-full px-7'>
          <h1 className='flex text-[50px]'>¡Hola {akaShown}!</h1>
          <h1 className='flex text-[18px]'>Bienvenido al Panel de Administración</h1>
        </section>
        <section className='flex flex-col items-center w-full px-2'>
          <div className='flex flex-col justify-center items-center gap-5'>
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
                        <td className='flex justify-center p-2 gap-3'>
                          <button className='bg-verdesito hover:bg-verde text-white font-bold py-2 px-2 rounded' onClick={() => {
                            setSelectedMember(member.idMember)
                            handleSubmitEdit()
                          }}>Editar</button>
                          <ModalEdit isOpen={isModalEditOpen} onCancel={handleCancelEdit} member={selectedMember}>Editar Miembro</ModalEdit>
                          {member.idRole === 1 ? null : <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded'
                            onClick={() => {
                              setSelectedMember(member.idMember)
                              handleDelete()
                            }}>Eliminar</button>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                : <p>Cargando miembros...</p>}
            </div>
            <ModalDelete isOpen={isModalDelete} onConfirm={handleConfirm} onCancel={handleCancelDelete}>
                ¿Estás seguro de enviar tu voto?
            </ModalDelete>
            <hr class="w-4/5 h-0.5 bg-[#000000]" />
            <div>
              <button
                onClick={() => {
                  handleSubmit()
                }}
                className='flex items-center rounded-3xl hover:bg-verdesito bg-verde text-white w-10/12 p-2' >Añadir Miembros</button>
              <ModalAdmin isOpen={isModalOpen} onCancel={handleCancel}>
                Añadir Miembros
              </ModalAdmin>
            </div>
          </div>
        </section>
      </div>

    </div>
  )
}

export default Admin