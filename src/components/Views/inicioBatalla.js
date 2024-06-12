import React, { useState, useEffect } from 'react'
import banner from '../../media/bg-hiphop.jpg'
import uderap from '../../media/uderap.png'
import { Link } from 'react-router-dom'
import bg from'../../media/bg.png'
import { useForm } from "@mantine/form"
import { notify } from '../Utils/notify'
import { useNavigate } from 'react-router-dom'
import { getCompetitorsApi } from '../../Services/APIS/GetCompetitors'
import { getDayIdApi } from '../../Services/APIS/GetDayId'
import { get } from 'firebase/database'


const InicioBatalla = () => {

  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [dayIds, setDayIds] = useState([])
  const [judgeId, setJudgeId] = useState('')

  const getCompetitors = async (competition) => {
    let result = await getCompetitorsApi(competition)
    console.log(result)
    setUsers(result)
  }

  const GetDayId = async (competition, numberDay) => {
    let result = await getDayIdApi(competition, numberDay)
    return result
  }

  const getJudgeId = async () => {
    let result = localStorage.getItem('idRole')
    let result2 = localStorage.getItem('idRole2')
    if (result === '2') {
      setJudgeId(localStorage.getItem('memberId'))
    } else if (result2 === '2'){
      setJudgeId(localStorage.getItem('memberId2'))
    }
  }

  const fetchDayIds = async () => {
    const days = []
    for (let i = 1; i <= 15; i++) {
      const result = await GetDayId("1", i)
      days.push([result.enable, result.finish])
    }
    return days
  }

  const form = useForm({
    initialValues: {
      juez: "",
      day: "",
      mc1: "",
      mc2: "",
      idmc1: "",
      idmc2: ""
    },
  })

  const handleSubmit = () => {
    console.log(form.values)
    if (form.values.juez === "") {
      notify("warning", "Ocurrio un error, por favor intenta de nuevo")
    } else if (form.values.day === "" || form.values.mc1 === "" || form.values.mc2 === "") {
      notify("warning", "Por favor llena todos los campos")
    } else if (form.values.mc1 === form.values.mc2) {
      notify("warning", "Los MCs no pueden ser el mismo")
    }
    else {
      console.log(form.values)
      navigate(`/votacion`, { state: { data: form.values } })
    }
  }

  useEffect(() => {
    const fetchDayIdsFromApi = async () => {
      const result = await fetchDayIds()
      setDayIds(result)
    }

    fetchDayIdsFromApi()
    getCompetitors("1")
    getJudgeId()
  }, [])

  return (
    <div className='flex justify-center h-screen bg-contain' style={{ backgroundImage: `url(${bg})` }}>
      <div className='flex justify-center h-screen'>
        <div className='className=flex min-w-1/4 min-h-[70%] items-center flex-col my-auto py-7 border-4 rounded-3xl border-black bg-white'>
          <div className="flex self-start p-1 mb-5">
            <Link to="/" className='text-[25px] font-semibold hover:text-verdesito'>« Regresar</Link>
          </div>
          <div style={{ backgroundImage: `url(${banner})`, backgroundSize: 'contain' }} className='flex m-4 rounded-3xl'>
            <img className='p-4' src={uderap} alt="uderap" />
            <div className='flex flex-col justify-center items-center p-10'>
              <span style={{ whiteSpace: 'normal' }} className=' overflow-wrap text-[30px] text-white'>Bienvenid@ al panel</span>
              <span style={{ whiteSpace: 'normal' }} className=' overflow-wrap text-[30px] text-white'>de votación</span>
            </div>
          </div>
          <div className="flex flex-col items-center p-5 gap-4">
            <select className="rounded-xl w-4/5 border-2 border-gray-500 p-3 h-auto" 
              id="day"
              placeholder="Número de Jornada"
              onChange={(e) => {form.setFieldValue('day', e.target.value); form.setFieldValue('juez', judgeId)}}>
              <option value="" disabled selected>Jornada</option>
              {(dayIds).map((dayId, index) => (
                dayId[0] === 1 ?  
                  <option key={index+1} value={index+1}>
                    {`Jornada #${index+1}`}
                  </option>
                : null
              ))}
            </select>
            <select
                className="rounded-xl w-4/5 border-2 border-gray-500 p-3 h-auto"
                id="mc1"
                onChange={(e) => {
                  const [aka, idMember] = e.target.value.split('|');
                  form.setFieldValue('mc1', aka);
                  form.setFieldValue('idmc1', idMember);
                }}
              >
                <option value="" disabled selected>MC #1</option>
                {users.map((user) => (
                  <option key={user.id} value={`${user.aka}|${user.idMember}`}>
                    {user.aka}
                  </option>
                ))}
            </select>
            <select
              className="rounded-xl w-4/5 border-2 border-gray-500 p-3 h-auto"
              id="mc1"
              onChange={(e) => {
                const [aka, idMember] = e.target.value.split('|')
                form.setFieldValue('mc2', aka)
                form.setFieldValue('idmc2', idMember)
              }}
            >
              <option value="" disabled selected>MC #2</option>
              {users.map((user) => (
                <option key={user.id} value={`${user.aka}|${user.idMember}`}>
                  {user.aka}
                </option>
              ))}
            </select>
            
            <button className="rounded-xl bg-verde hover:bg-verdesito w-3/5 self-center text-white p-3 h-auto" onClick={handleSubmit}>
              <span>Iniciar votación</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InicioBatalla