import React, { useState, useEffect } from 'react'
import bg from'../../media/bg.png'
import { Batalla } from '../Utils/Batalla.js'
import { useNavigate } from 'react-router-dom'
import ModalResult from '../Utils/ModalResultado.js'
import ListaBatallas from '../Utils/ListaBatallas.js'
import { useLocation } from 'react-router-dom'
import { getDayIdApi } from '../../Services/APIS/GetDayId'
import { getNumberOfDaysApi } from '../../Services/APIS/GetNumberOfDays'
import { getDayVotesApi } from '../../Services/APIS/GetDayVotes'
import { set } from 'firebase/database'

const Jornada = () => {

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBatalla, setSelectedBatalla] = useState(null)
  const [day, setDay] = useState()
  const [dayIds, setDayIds] = useState([])
  const [votes, setVotes] = useState([])
  const [selectedDay, setSelectedDay] = useState()
  const [selectedLocation, setSelectedLocation] = useState()
  const [batallas, setBatallas] = useState({})
  const location = useLocation()

  const handleChange = (event) => {
    setSelectedDay(event.target.value)
    setSelectedLocation(dayIds[event.target.value - 1][0].location)
  }

  const GetDayId = async (competition, numberDay) => {
    let result = await getDayIdApi(competition, numberDay)
    return result
  }

  const fetchDayIds = async () => {
    const days = []
    for (let i = 1; i <= day; i++) {
      const result = await GetDayId("1", i)
      days.push([result])
    }
    return days
  }

  const fetchDayIdsFromApi = async () => {
    const result = await fetchDayIds()
    setDayIds(result)
  }

  const GetDayVotes = async (competition, idDay) => {
    let result = await getDayVotesApi(competition, idDay)
    return result
  }

  const fetchVotes = async () => {
    const preVotes = []
    for (let i = 0; i < day; i++) {
      const dia = dayIds[i][0].id
      const result = await GetDayVotes("1", dia)
      preVotes.push(result)
    }
    return preVotes
  }

  const fetchVotesFromApi = async () => {
    const result = await fetchVotes()
    setVotes(result)
  }

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
  }, [])

  useEffect(() => {
    fetchDayIdsFromApi()
    fetchVotesFromApi()
  }, [day, selectedDay])

  useEffect(() => {
    if (votes.length === 0) {
      return
    } else {
    const batallas = {}
    for (let i = 0; i < day; i++) {
      batallas[i + 1] = [<ListaBatallas votes={votes} idx={i} handleModal={handleModal} />]
    }
    setBatallas(batallas)
  }}, [votes])


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
            <span className='text-[15px]'>LUGAR: {selectedLocation}</span>
          </div>
          <button onClick={()=> navigate('/')} className='flex rounded-full p-5  h-1/4 self-center bg-verde hover:bg-verdesito'>X</button>
        </section>
        <div className='flex flex-col gap-8 w-full'>
        {batallas?.[selectedDay]?.map((Batalla, index) => (
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