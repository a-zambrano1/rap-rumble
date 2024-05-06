import React from 'react';

const Modal = ({ isOpen, onConfirm, onCancel, children }) => {
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
        <div className='flex flex-col items-center gap-7 text-[25px] text-[#3d405b]'>
            {children}
            <div className='flex w-full justify-around'>
                <button onClick={onConfirm} className='bg-verdesito hover:bg-verde text-white p-3 rounded-xl'>Confirmar</button>
                <button onClick={onCancel} className='bg-red-400 hover:bg-red-500 text-white p-3 rounded-xl'>Cancelar</button>
            </div>
        </div>
        </div>
    </div>
    );
};

export default Modal;