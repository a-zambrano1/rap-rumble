import React, { useState, useEffect } from 'react'
import '../../styles/styles.css'
import { useNavigate } from 'react-router-dom';
import micro from'../../media/micro.png'
import banner from'../../media/banner.png'
import uderap from'../../media/uderap.png'
import x from'../../media/x.png'
import bg from'../../media/bg.png'
import { getUsersByCompetitionApi } from '../../Services/APIS/Users';

function Inicio()  {
  const navigate = useNavigate();

  const Buttonroute = (route) => {
    navigate(route);
  };

const [users, setUsers] = useState([]);

const getUsersByCompetition = async (competition) => {
  let result = await getUsersByCompetitionApi(competition);
  setUsers(result);
};

useEffect(() => {
  getUsersByCompetition("1");
}
, []);

  return (
    <div className='flex justify-center h-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'fill'}}>
      <div className='flex flex-col min-w-[25%] gap-5 my-auto py-7 items-center border-4 rounded-3xl border-black bg-white'>
        <div style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover'}} className='flex rounded-3xl hover:scale-110'>
          <img className='p-2' src={uderap} alt="uderap"/>
          <div className='flex flex-col justify-center items-center p-2'>
            <span style={{ whiteSpace: 'normal' }} className=' overflow-wrap text-[30px] text-white'>Liga Universitaria</span> 
            <span style={{ whiteSpace: 'normal' }} className=' overflow-wrap text-[30px] text-white'>de freestyle</span>
          </div>
        </div>
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
                <th className='p-2'>PTB</th>
                <th className='p-2'>PTS</th>
              </tr>
            </thead>
              <tbody>
                {users.sort((a, b) => b.score - a.score).map((user, index) => (
                  <tr key={index}>
                    <td className='p-2'>{index + 1}</td>
                    <td className='p-2'>{user.aka}</td>
                    <td className='p-2'>{user.score}</td>
                    <td className='p-2'>{user.score}</td>
                  </tr>
                ))}
              </tbody>
          </table>
          : <div key={2} className='flex self-center'>Waiting for fetch data...</div>}
        </div>
        <hr class="w-4/5 h-0.5 bg-[#000000]"/>
      </div>
      <div className='flex flex-col items-center w-4/5'>
        <div>
          <h1 className='text-[30px] text-[#3d405b]'>Última fecha!</h1>
        </div>
        <button onClick={() => Buttonroute('/jornada')} className='flex w-4/5 justify-evenly items-center rounded-3xl size bg-verde px-2 hover:bg-verdesito text-white text-[30px]'> 
          <img className='p-2' src={micro} alt="uderap"/>
          Fecha #2
        </button>
      </div>
      <hr class="w-4/5 h-0.5 bg-[#000000]"/>
      <button onClick={() => Buttonroute('/ingreso_juez')} className='rounded-3xl hover:bg-verdesito bg-verde' >Ingreso Juez
        <img className='p-2' src={x} alt="uderap"/>
      </button>
    </div>
  </div>
  )
}

export default Inicio;