import React from "react"
import '../../styles/styles.css'
import bg from '../../media/bg.png'
import { useNavigate, Link } from 'react-router-dom'
import { getUserByEmailApi } from '../../Services/APIS/GetUserByEmail'
import { notify } from '../Utils/notify'
import { loginVerificationApi } from "../../Services/APIS/LoginVerification"
import { getUserMemberApi } from "../../Services/APIS/getUserMember"
import { useEffect } from "react"
import { useContext } from "react"
import { AuthContext } from "../Utils/authContext"


function Ingreso() {

  const navigate = useNavigate()
  const { isAuthenticated } = useContext(AuthContext);

  const getUserByEmail = async (email) => {
    let result = await getUserByEmailApi(email)
    return result
  }

  const loginVerification = async (email, password) => {
    let result = await loginVerificationApi(email, password)
    return result
  }


  const handleLogin = async () => {
    const userEmail = document.getElementById('email').value
    const password = document.getElementById('password').value
    const apiEmail = await getUserByEmail(userEmail)

    if (userEmail === "" || password === "") {
      notify("warning", "Por favor llena todos los campos")
    } else if (apiEmail.email !== userEmail) {
      notify("warning", "El correo no existe")
    } else {
      const login = await loginVerification(userEmail, password)
      if (login.userId) {
        let userMember = await getUserMemberApi(login.userId)
        console.log(userMember)
        if (userMember.message === "member not found") {
          notify("info", "Aún no se le ha asignado un rol")
          return
        }
        localStorage.setItem('idRole', userMember[0].idRole)
        localStorage.setItem('idMember', userMember[1].idUserMember);
        localStorage.setItem('memberId', userMember[0].id)
        localStorage.setItem('aka', apiEmail.aka)
        if (userMember[1]) {
          localStorage.setItem('idRole2', userMember[1].idRole)
          localStorage.setItem('memberId2', userMember[1].id)
        } else {
          localStorage.setItem('idRole2', '0');
        }
        notify("success", "Bienvenido")
        navigate('/welcome')
      } else {
        notify("warning", "Contraseña incorrecta")
      }
    }
  }
  useEffect(() => {
    let idRole = localStorage.getItem('idRole')
    if (idRole && !isAuthenticated) {
      navigate('/welcome')
    }
  }, [navigate, isAuthenticated])

  return (
    <div className='flex justify-center h-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'fill' }}>
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
              id="email"
              type="email"
              placeholder="Correo"
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