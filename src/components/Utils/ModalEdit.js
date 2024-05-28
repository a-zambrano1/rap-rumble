import React, { useRef } from 'react'
import { updateIdRoleApi } from '../../Services/APIS/UpdateIdRole';

const ModalEdit = ({ isOpen, onCancel, member, children }) => {
    const dropdownRef = useRef(null)

    if (!isOpen) {
        return null
    }

    const handleOuterClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel()
        }
    }

    const handleEditRole = async () => {
        var newRole = dropdownRef.current.value
        console.log(newRole)
        let result = await updateIdRoleApi(member, newRole)
        console.log(result)
    }

    return (
        <div onClick={handleOuterClick} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'white', padding: '3em', maxWidth: '90%', maxHeight: '90%', overflow: 'auto', borderRadius: '10%' }}>
                {children}
                <div className='flex flex-col items-center gap-7 text-[25px] text-[#3d405b]'>
                    {member}
                    <span>Nuevo rol</span>
                    <select ref={dropdownRef} className='g-4 p-3 border-2'>
                        <option value="1">Admin</option>
                        <option value="2">Juez</option>
                        <option value="3">Competidor</option>
                    </select>
                    <button
                        onClick={handleEditRole}
                        className='bg-verdesito hover:bg-verde text-white p-3 rounded-xl'>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalEdit