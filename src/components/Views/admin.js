import React, { useState, useEffect } from 'react'
import '../../styles/styles.css'
import bg from '../../media/bg.png'
import { getMembersByCompetitionApi } from '../../Services/APIS/GetMembersByCompetition'
import { deleteMemberApi } from '../../Services/APIS/DeleteMember'
import { updateIdRoleApi } from '../../Services/APIS/UpdateIdRole'
import { createMemberApi } from '../../Services/APIS/CreateMember'
import { getUserByNameApi } from '../../Services/APIS/GetUserByName'
import { getDayIdApi } from '../../Services/APIS/GetDayId'
import ModalDays from '../Utils/ModalDays'
import ModalAdmin from '../Utils/ModalAdmin'
import ModalEdit from '../Utils/ModalEdit'
import ModalDelete from '../Utils/ModalDelete'
import { notify } from '../Utils/notify'


function Admin() {

  const [akaShown, setAkaShown] = useState('user')
  const [members, setMembers] = useState([])
  const [selectedMember, setSelectedMember] = useState()
  const [selectedDay, setSelectedDay] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [isModalDelete, setIsModalDelete] = useState(false)
  const [isModalDays, setIsModalDays] = useState(false)
  const [dayIds, setDayIds] = useState([]);


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

  const handleCancelDay = () => {
    notify("error", "No se modificó ninguna jornada")
    setIsModalDays(false)
  }
  
  const GetMembersByCompetition = async (competition) => {
    let result = await getMembersByCompetitionApi(competition)
    setMembers(result)
  }

  const DeleteMember = async (idMember) => {
    let result = await deleteMemberApi(idMember)
    return result
  }

  const GetDayId = async (competition, numberDay) => {
    let result = await getDayIdApi(competition, numberDay)
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

  const handleDays = () => {
    setIsModalDays(true)
  }

  const handleAddConfirm = async () => {
    notify("success", "Miembro añadido correctamente.")
    setIsModalOpen(false)
  }

  const handleEditConfirm = async () => {
    notify("success", "Miembro editado correctamente.")
    setIsModalEditOpen(false)
  }

  const handleDayConfirm = async () => {
    notify("success", "Jornada editada correctamente.")
    setIsModalDays(false)
  } 

  const fetchDayIds = async () => {
    const days = []
    for (let i = 1; i <= 15; i++) {
      const result = await GetDayId("1", i)
      days.push([result.enable, result.finish])
    }
    console.log(days)
    return days
  }


  const handleDeleteConfirm = async () => {
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
    const fetchDayIdsFromApi = async () => {
      const result = await fetchDayIds()
      setDayIds(result)
    }

    fetchDayIdsFromApi()
  }, [])

  useEffect(() => {
    GetMembersByCompetition("1")
    setAkaShown('Admin')
  }
    , [isModalOpen, isModalEditOpen, isModalDelete, handleEditConfirm])


  return (
    <div className='flex justify-center h-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'fill' }}>
      <div className='flex flex-col min-w-[25%] max-w-[90%] gap-9 my-auto py-7 items-center border-4 rounded-3xl border-black bg-white'>
        <section className='flex flex-col items-center w-full px-7'>
          <h1 className='flex text-[50px]'>¡Hola {akaShown}!</h1>
          <h1 className='flex text-[18px]'>Bienvenido al Panel de Administración</h1>
        </section>
        <section className='flex flex-col items-center w-full px-2 gap-5'>
          <div className='flex flex-col justify-center items-center gap-5'>
            <h1 className='text-[30px] text-[#3d405b] text-center'>Jornadas</h1>
            <div className='flex'>
              {(dayIds).map((dayIds, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full border-2 ${dayIds[1] === 1 ? 'bg-gray-500' : dayIds[0] === 1 ? 'bg-green-500' : ''}`}
                  disabled={dayIds[1] === 1}
                  onClick={() => {setSelectedDay(index + 1)
                                  handleDays()
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <ModalDays isOpen={isModalDays} onCancel={handleCancelDay} onConfirm={handleDayConfirm} day={selectedDay}>Editar Jornada</ModalDays>
          </div>
          <div className='flex flex-col justify-center items-center gap-5'>
            <h1 className='text-[30px] text-[#3d405b] text-center'>Miembros de UdeRap</h1>
            <hr class="w-4/5 h-0.5 bg-[#000000]" />
            <div className="flex w-full justify-center h-96" style={{overflow: "auto"}}>
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
                  {members.sort((a, b) => {
                      const aAka = a.aka || "";
                      const bAka = b.aka || "";
                      return aAka.localeCompare(bAka);
                    }).map((member, index) => (
                        <tr key={index}>
                          <td className='p-2'>{member.aka}</td>
                          <td className='p-2'>{member.roleName}</td>
                          <td className='flex justify-center p-2 gap-3'>
                          <button className='bg-verdesito hover:bg-verde text-white font-bold py-2 px-2 rounded' onClick={() => {
                            setSelectedMember(member.idMember)
                            handleSubmitEdit()
                          }}>Editar</button>
                            {member.idRole === 1 ? null : <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded'
                              onClick={() => {
                                setSelectedMember(member.idMember)
                                handleDelete()
                              }}>Eliminar</button>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  <ModalEdit isOpen={isModalEditOpen} onCancel={handleCancelEdit} onConfirm={handleEditConfirm} member={selectedMember}>Editar Miembro</ModalEdit>
                </table>
                : <p>Cargando miembros...</p>}
            </div>
            <ModalDelete isOpen={isModalDelete} onConfirm={handleDeleteConfirm} onCancel={handleCancelDelete}>
                ¿Estás seguro que deseas eliminar a este miembro de la competencia?
            </ModalDelete>
            <hr class="w-4/5 h-0.5 bg-[#000000]" />
            <div>
              <button
                onClick={() => {
                  handleSubmit()
                }}
                className='flex items-center rounded-3xl hover:bg-verdesito bg-verde text-white w-10/12 p-2' >Añadir Miembros</button>
              <ModalAdmin isOpen={isModalOpen} onCancel={handleCancel} onConfirm={handleAddConfirm}>
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