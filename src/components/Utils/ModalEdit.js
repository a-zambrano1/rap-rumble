import React, { useRef } from 'react'
import { updateIdRoleApi } from '../../Services/APIS/UpdateIdRole'
import { getUserMemberApi } from '../../Services/APIS/getUserMember'
import { notify } from './notify'
import { on } from 'process'

const ModalEdit = ({ isOpen, onCancel, onConfirm, member, user, children }) => {
    const dropdownRef = useRef(null)

    if (!isOpen) {
        return null
    }

    const GetUserMember = async (id) => {
        let result = await getUserMemberApi(id)
        return result
    }

    const handleOuterClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel()
        }
    }

    const handleEditRole = async () => {
        var newRole = parseInt(dropdownRef.current.value)
        const userMembers = await GetUserMember(user)
        console.log(user)
        console.log(userMembers)
        if (!userMembers[1]) {
            userMembers[1] = { idRole: 0 }
        }
        if (userMembers.length >= 1) {
            if (userMembers[0].idRole === newRole || userMembers[1].idRole === newRole) {
                notify("error", "El usuario ya tiene ese rol asignado")
                return
            } else if ((userMembers[0].idRole  === 3 || userMembers[1].idRole === 3) && newRole === 2) {
                notify("error", "El usuario ya es Competidor, por ende no puede ser juez")
                return
            } else if ((userMembers[0].idRole === 2 || userMembers[1].idRole === 2) && newRole === 3) {
                notify("error", "El usuario ya es Juez, por ende no puede ser competidor")
                return
            }
        }
        try {
            let result = await updateIdRoleApi(member, newRole)
            console.log(result)
        } catch (error) {
            console.log(error)
            notify("error", "No se ha podido editar el rol del miembro. Inténtalo de nuevo.")
        }
        onConfirm()
    }

    return (
        <div onClick={handleOuterClick} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="flex flex-col items-center" style={{ backgroundColor: 'white', padding: '3em', maxWidth: '90%', maxHeight: '90%', overflow: 'auto', borderRadius: '10%' }}>
                {children}
                <div className='flex flex-col items-center gap-5 text-[25px] text-[#3d405b]'>
                    id #{member}
                    <div className='flex flex-col items-center w-full justify-around'>
                        <select ref={dropdownRef} className='g-4 p-3 border-2 border-gray-500 '>
                            <option value="" disabled selected>Nuevo Rol</option>
                            <option value="1">Admin</option>
                            <option value="2">Juez</option>
                            <option value="3">Competidor</option>
                        </select>
                    </div>
                    <div className='flex w-full gap-5'>
                        <button
                            onClick={() => {handleEditRole()}}
                            className='bg-verdesito hover:bg-verde text-white p-3 rounded-xl'>
                            Confirmar
                        </button>
                        <button
                            onClick={() => {onCancel()}}
                            className='bg-red-500 hover:bg-red-700 text-white p-3 rounded-xl'>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEdit