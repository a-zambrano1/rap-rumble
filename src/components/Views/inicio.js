import React, { useState, useEffect } from 'react'
import '../../styles/styles.css'
import { useNavigate } from 'react-router-dom'
import micro from'../../media/micro.png'
import banner from'../../media/banner.png'
import uderap from'../../media/uderap.png'
import x from'../../media/x.png'
import rapero from'../../media/rapero.png'
import bg from'../../media/bg.png'
import { getCompetitorsApi } from '../../Services/APIS/GetCompetitors'
import { getNumberOfDaysApi } from '../../Services/APIS/GetNumberOfDays'

function Inicio()  {
const navigate = useNavigate()

const [users, setUsers] = useState([])
const [days, setDays] = useState([])


const getCompetitors = async (competition) => {
  let result = await getCompetitorsApi(competition)
  setUsers(result)
}

const GetNumberOfDays = async (competition) => {
  let result = await getNumberOfDaysApi(competition)
  setDays(result.daysCount || 3)
}

useEffect(() => {
  getCompetitors("1")
  GetNumberOfDays("1")
}
, [])

const handleSubmit = () => {
  navigate(`/jornada`, { state: { data: days } })
}

  return (
    <div className='flex justify-center h-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'fill'}}>
      <div className='flex flex-col min-w-[25%] gap-5 my-auto py-7 items-center border-4 rounded-3xl border-black bg-white'>
      <a href="https://www.instagram.com/_uderap/" target="_blank" rel="noopener noreferrer">
        <div style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover'}} className='flex rounded-3xl hover:scale-110'>
          <img className='p-2' src={uderap} alt="uderap"/>
          <div className='flex flex-col justify-center items-center p-2'>
            <span style={{ whiteSpace: 'normal' }} className=' overflow-wrap text-[30px] text-white'>Liga Universitaria</span> 
            <span style={{ whiteSpace: 'normal' }} className=' overflow-wrap text-[30px] text-white'>de freestyle</span>
          </div>
        </div>
      </a>
      <div className='flex flex-col items-center w-4/5'>
        <div>
          <h1 className='text-[30px] text-[#3d405b]'>Tabla de Posiciones</h1>
        </div>
        <hr class="w-4/5 h-0.5 bg-[#000000]"/>
        <div className= "flex w-full justify-center h-64" style={{overflow: "auto"}}>
          {users != null ?
          <table className='table-auto'>
            <thead className='sticky top-0 bg-white'>
              <tr className='text-verde'>
                <th className='p-2'>Posición</th>
                <th className='p-2'>A.K.A</th>
                <th className='p-2'>Score</th>
                <th className='p-2'>PTB</th>
              </tr>
            </thead>
            <tbody>
              {users.sort((a, b) => {
                // First, sort by ptb
                const ptbDifference = b.ptb - a.ptb;
                if (ptbDifference !== 0) {
                  return ptbDifference;
                }
                // If ptb is the same, sort by score
                return b.score - a.score;
              }).map((user, index) => (
                <tr key={index}>
                  <td className='p-2 text-center'>{index + 1}</td>
                  <td className='p-2 text-center'>{user.aka}</td>
                  <td className='p-2 text-center'>{user.score}</td>
                  <td className='p-2 text-center'>{user.ptb}</td>
                </tr>
              ))}
            </tbody>
          </table>
          : <div key={2} className='flex self-center'>Waiting for fetch data...</div>}
        </div>
        <hr class="w-4/5 h-0.5 bg-[#000000]"/>
      </div>
      <div className='flex flex-col items-center w-4/5'>
        <h1 className='text-[30px] text-[#3d405b]'>Última fecha!</h1>
        <button onClick={handleSubmit} className='flex w-4/5 justify-evenly items-center rounded-3xl size bg-verde px-2 hover:bg-verdesito text-white text-[30px]'> 
          <img className='p-2' src={micro} alt="uderap"/>
          Fecha #{days} 
        </button>
      </div>
      <hr class="w-4/5 h-0.5 bg-[#000000]"/>
      <div className='flex gap-9'>
        <button onClick={() => navigate('/registro_usuario')} className='rounded-3xl hover:bg-verdesito bg-verde text-white' >Registro
          <img className='p-2 w-[100px] h-[90px]' src={rapero} alt="rapper"/>
        </button>
        <button onClick={() => navigate('/ingreso')} className='rounded-3xl hover:bg-verdesito bg-verde text-white' >Ingreso
          <img className='p-2 w-[100px] h-[90px]' src={x} alt="x"/>
        </button>
      </div>
    </div>
  </div>
  )
}

export default Inicio;