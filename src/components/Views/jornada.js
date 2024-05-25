import React, { useState, useEffect } from 'react'
import bg from'../../media/bg.png'
import { Batalla } from '../Utils/Batalla.js'
import { useNavigate } from 'react-router-dom'
import ModalResult from '../Utils/ModalResultado.js'
import { useLocation } from 'react-router-dom'


const Jornada = () => {

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBatalla, setSelectedBatalla] = useState(null)
  const [day, setDay] = useState()
  const [selectedDay, setSelectedDay] = useState()
  const location = useLocation()

  const handleChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const onCancel = () => {
    console.log('cancelado')
    setIsModalOpen(false)
  }

  const handleModal = (batallaData) => {
    setSelectedBatalla(batallaData)
    setIsModalOpen(true)
  }

  useEffect(() => {
    let data = location.state.data
    setDay(data)
    setSelectedDay(data)
  }, [location.state])

  const batallas = {
    1: [<Batalla mc1="leoteo" mc2="dkarlos" pts1="86" pts2="85" winner="leoteo" clicked={() => handleModal({mc1: "leoteo", mc2: "dkarlos", pts1: 86, pts2: 85})}/>, <Batalla />], // Batallas for day 1
    2: [<Batalla mc1="uderap" mc2="micro" pts1="100" pts2="10" winner="uderap" clicked={() => handleModal({mc1: "uderap", mc2: "micro", pts1: 100, pts2: 10})}/>], // Batallas for day 2
    3: [<Batalla />, <Batalla mc1="leoteo" mc2="dkarlos" pts1="10" pts2="90" winner="dkarlos" clicked={() => handleModal({mc1: "leoteo", mc2: "dkarlos", pts1: 10, pts2: 90})}/>], // Batallas for day 3
    // Add more days here
  };

  return (
    <div className='flex justify-center h-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'fill'}}>
      <div className='flex flex-col min-w-[25%] max-h-[90%] gap-10 my-auto py-7 px-6 items-center border-4 rounded-3xl border-black bg-white' style={{overflow: "auto", scrollbarWidth: 'thin', borderRadius: '10px',}}>
        <section className='flex justify-between w-full bg-white'>
          <div className='flex flex-col'>
            <h1 className='flex items-center text-[50px]'>Jornada #
             <select id='selectJornada' className='text-[40px] border w-auto' value={selectedDay} onChange={handleChange}>
              {[...Array(day).keys()].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
             </select>
            </h1>
            <span className='text-[15px]'>LUGAR: {}</span>
            <span className='text-[15px]'>JUECES: {}</span>
          </div>
          <button onClick={()=> navigate('/')} className='flex rounded-full p-5  h-1/4 self-center bg-verde hover:bg-verdesito'>X</button>
        </section>
        <div className='flex flex-col gap-8 w-full'>
          {batallas[selectedDay] && batallas[selectedDay].map((Batalla, index) => (
            <React.Fragment key={index}>
              {Batalla}
            </React.Fragment>
          ))}
        </div>
        <ModalResult isOpen={isModalOpen} onCancel={onCancel} batallaData={selectedBatalla}/>
      </div>
    </div>
  )
}

export default Jornada