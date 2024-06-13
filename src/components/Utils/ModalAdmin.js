import React from 'react'
import { getUserByNameApi } from '../../Services/APIS/GetUserByName'
import { notify } from '../Utils/notify'
import { createMemberApi } from '../../Services/APIS/CreateMember'
import { getUserMemberApi } from '../../Services/APIS/getUserMember'
import { on } from 'process'


const ModalAdmin = ({ isOpen, onCancel, onConfirm, children }) => {
    if (!isOpen) {
        return null;
    }

    const handleOuterClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    }

    const getUserByName = async (name) => {
        let result = await getUserByNameApi(name);
        return result;
    }

    const GetUserMember = async (id) => {
        let result = await getUserMemberApi(id)
        return result
    }


    const handleSubmitVerification = async () => {
        const username = document.getElementById('username').value
        const apiName = await getUserByName(username) || {}
        if (apiName.username === username) {
            notify("success", "El usuario existe")
            console.log(apiName)
        } else {
            notify("error", "El usuario no existe")

        }
    }

    const handleCreateMember = async () => {
        const username = document.getElementById('username').value
        const apiName = await getUserByName(username)
        const memberId = apiName.id
        const userMembers = await GetUserMember(memberId)
        var member = parseInt(document.getElementById("dropdown").value)
        console.log(member)
        if (userMembers.length >= 2) {
            notify("error", "El usuario ya tiene dos roles asignados")
            return
        }
        if (userMembers.length === 1) {
            console.log(userMembers[0].idRole)
            if (userMembers[0].idRole === member) {
                notify("error", "El usuario ya tiene ese rol asignado")
                return
            } else if (userMembers[0].idRole === 3 && member === 2) {
                notify("error", "El usuario ya es Competidor, por ende no puede ser juez")
                return
            } else if (userMembers[0].idRole === 2 && member === 3) {
                notify("error", "El usuario ya es Juez, por ende no puede ser competidor")
                return
            }
        }
        if (apiName.username === username) {
            const formMember = [apiName.id, 1, member, 0, 0]
            try {createMemberApi(formMember)
            console.log(formMember)
            } catch (error) {
                console.log(error)
            }
            onConfirm()
        } else {
            onCancel()
        }
        
    }
    return (
        <div onClick={handleOuterClick} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'white', padding: '3em', maxWidth: '90%', maxHeight: '90%', overflow: 'auto', borderRadius: '10%' }}>
                <div className='flex flex-col items-center gap-7 text-[25px] text-[#3d405b]'>
                    {children}
                    <div className='flex flex-col gap-7 p-2 w-full justify-around'>
                        
                            <input id="username" type="text" placeholder="Username" className='border-2 border-black rounded-xl p-3 g-2 mb-2' />
                            <button onClick={handleSubmitVerification} className='bg-verdesito hover:bg-verde text-white p-3 rounded-xl'>Verificar</button>
                     
                        <select id='dropdown' className='g-4 p-3 border-2 border-gray-500'>
                            <option value="1">Admin</option>
                            <option value="2">Juez</option>
                            <option value="3">Competidor</option>
                        </select>
                        <input type="text" id='linkPicture' placeholder="Link a la foto de Perfil" className='border-2 border-black rounded-xl p-3 g-2' />
                    </div>
                    <div className='flex w-full justify-around'>
                        <button
                            onClick={handleCreateMember}
                            className='bg-verdesito hover:bg-verde text-white p-3 rounded-xl'>
                            Confirmar
                        </button>
                        <button onClick={onCancel} 
                                className='bg-red-400 hover:bg-red-500 text-white p-3 rounded-xl'>
                                Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalAdmin