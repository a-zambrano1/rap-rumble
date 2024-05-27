import React from 'react'

const ModalEdit = ({ isOpen, onCancel, children }) => {
    if (!isOpen) {
        return null;
    }

    const handleOuterClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    }

    return (
        <div onClick={handleOuterClick} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'white', padding: '3em', maxWidth: '90%', maxHeight: '90%', overflow: 'auto', borderRadius: '10%' }}>
            </div>
            <div className='flex flex-col items-center gap-7 text-[25px] text-[#3d405b]'>{children}</div>
        </div>
    )
}

export default ModalEdit