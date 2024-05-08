import React, { useState } from 'react'
import bg from'../../media/bg.png'
import { Batalla } from '../Utils/Batalla.js'
import { useNavigate } from 'react-router-dom'
import ModalResult from '../Utils/ModalResultado.js'

const Jornada = () => {

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBatalla, setSelectedBatalla] = useState(null);

  const onCancel = () => {
    console.log('cancelado')
    setIsModalOpen(false)
  }

  const handleModal = (batallaData) => {
    setSelectedBatalla(batallaData)
    setIsModalOpen(true)
  }


  return (
    <div className='flex justify-center h-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'fill'}}>
      <div className='flex flex-col min-w-[25%] max-h-[90%] gap-10 my-auto py-7 px-6 items-center border-4 rounded-3xl border-black bg-white' style={{overflow: "auto", scrollbarWidth: 'thin', borderRadius: '10px',}}>
        <section className='flex justify-between w-full bg-white'>
          <div className='flex flex-col'>
            <h1 className='flex items-center text-[50px]'>Jornada #
             <select id='selectJornada' className='text-[40px] border w-auto'>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
             </select>
            </h1>
            <span className='text-[15px]'>LUGAR: {}</span>
            <span className='text-[15px]'>JUECES: {}</span>
          </div>
          <button onClick={()=> navigate('/')} className='flex rounded-full p-5  h-1/4 self-center bg-verde hover:bg-verdesito'>
            X
          </button>
        </section>
        <div className='flex flex-col gap-8 w-full'>
            <Batalla mc1="leoteo" mc2="dkarlos" pts1="86" pts2="85" winner="leoteo" clicked={() => handleModal({mc1: "leoteo", mc2: "dkarlos", pts1: 86, pts2: 85})}/>
            <Batalla mc1="uderap" mc2="micro" pts1="100" pts2="10" winner="uderap" clicked={() => handleModal({mc1: "uderap", mc2: "micro", pts1: 100, pts2: 10})}/>
            <Batalla mc1="leoteo" mc2="dkarlos" pts1="10" pts2="90" winner="dkarlos" clicked={() => handleModal({mc1: "leoteo", mc2: "dkarlos", pts1: 10, pts2: 90})}/>
        </div>
        <ModalResult isOpen={isModalOpen} onCancel={onCancel} batallaData={selectedBatalla}/>
      </div>
    </div>
  )
}

export default Jornada