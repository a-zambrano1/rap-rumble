import React from "react"
import '../../styles/styles.css'
import bg from '../../media/bg.png'
import { useNavigate, Link } from 'react-router-dom'
import { getUserByNameApi } from '../../Services/APIS/GetUserByName'
import { notify } from '../Utils/notify'

function Ingreso() {

  const navigate = useNavigate()

  const getUserByName = async (name) => {
    let result = await getUserByNameApi(name);
    return result;
  }

  const handleLogin = async () => {
    const userName = document.getElementById('username').value
    const password = document.getElementById('password').value
    const apiName = await getUserByName(userName)

    if (userName === "" || password === ""){
      notify("warning", "Por favor llena todos los campos")
    } else if (apiName.username !== userName){
      notify("warning", "El usuario no existe")
    } /*else if (apiName.password !== password){
      notify("warning", "Contraseña incorrecta")
    }*/ else {
      notify("success", "Bienvenido")
      navigate('/welcome')
    }
  }

  return (
    <div className='flex justify-center h-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'fill'}}>
      <div className='flex min-w-1/4 min-h-[65%] items-center flex-col my-auto py-7 border-4 rounded-3xl border-black bg-white'>
        <div className="flex self-start p-7 mb-5">
            <Link to="/" className='text-[25px] font-semibold hover:text-verdesito'>« Regresar</Link>
        </div>
        <div className="flex flex-col h-fit gap-6 px-7">
          <div className="flex flex-col self-start gap-4">
            <span className='text-[70px] font-bold leading-none text-black'>Liga
              <span className='text-[70px] font-bold leading-none text-[#2D8F1D]'> UdeRAP</span>
            </span>
            <span className="flex justify-start self-start">Ingreso Admin & Jueces</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <input className="rounded-xl w-4/5 border-2 border-gray-500 p-3 h-auto "
            id="username"
            placeholder="Nombre de Usuario"
            />
            <input className="rounded-xl w-4/5 border-2 border-gray-500 p-3 h-auto"
              minLength="8"
              label="Contraseña"
              type="password"
              id="password"
              placeholder="Contraseña"
            />
          </div>
           {/* si el usuario ingresado existe pero no tiene rol de juez o de usuario aparecera un mensaje indicandole que aún no le hann asignado ninguno de estos roles*/}
          <button onClick={handleLogin} className="rounded-xl bg-verde hover:bg-verdesito w-3/5 self-center text-white p-3 h-auto">
            <span>Ingresar</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Ingreso