import React from 'react';
// a modal that shows a result of a battle between two mc's and shows the votes from all the judges that could be from 3 to 5 judges

const ModalResult = ({ isOpen, onCancel, batallaData }) => {
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
            <div>
                {batallaData && (
                <>
                    <span>{batallaData.mc1}</span>
                    <span>{batallaData.pts1}</span>
                    <span>{batallaData.mc2}</span>
                    <span>{batallaData.pts2}</span>
                </>
                )}
            </div>
            <div className='flex w-full justify-around'>
                <button onClick={onCancel} className='bg-verdesito hover:bg-verde text-white p-3 rounded-xl'>Cerrar</button>
            </div>
        </div>
        </div>
    </div>
    );
}

export default ModalResult