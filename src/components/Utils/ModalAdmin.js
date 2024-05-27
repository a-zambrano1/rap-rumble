import React from 'react'
import { getUserByNameApi } from '../../Services/APIS/GetUserByName'
import { notify } from '../Utils/notify'
import { createMemberApi } from '../../Services/APIS/CreateMember'


const ModalAdmin = ({ isOpen, onCancel, children }) => {
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


    const handleSubmitVerification = async () => {
        const username = document.getElementById('username').value
        const apiName = await getUserByName(username)
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
        if (apiName.username === username) {
            //Se guarda el valor del desplegable
            var e = document.getElementById("dropdown");
            var value = e.value;
            const formMember = [apiName.id, 1, value, 0, 0]
            createMemberApi(formMember.values)
            console.log(formMember.values)
            notify("success", "El miembro ha sido agregado correctamente a la competencia")
        } else {
            notify("error", "No fue posible agregar el miembro a la competencia. Inténtalo de nuevo.")

        }
    }
    return (
        <div onClick={handleOuterClick} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'white', padding: '3em', maxWidth: '90%', maxHeight: '90%', overflow: 'auto', borderRadius: '10%' }}>
                <div className='flex flex-col items-center gap-7 text-[25px] text-[#3d405b]'>
                    {children}
                    <div className='flex flex-col g-2 p-2 w-full justify-around'>
                        <div className='flex g-2 w-full items-center'>
                            <input id="username" type="text" placeholder="Username" className='border-2 border-black rounded-xl p-3 g-2' />
                            <button onClick={handleSubmitVerification} className='bg-verdesito hover:bg-verde text-white p-3 rounded-xl'>Verificar</button>
                        </div>
                        <select id='dropdown' className='g-4 p-3 border-2'>
                            <option value="1">Admin</option>
                            <option value="2">Juez</option>
                            <option value="3">Competidor</option>
                        </select>
                        <input type="text" id='linkPicture' placeholder="Link a la foto de Perfil" className='border-2 border-black rounded-xl p-3 g-2' />
                    </div>
                    <button
                        onClick={handleCreateMember}
                        className='bg-verdesito hover:bg-verde text-white p-3 rounded-xl'>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalAdmin