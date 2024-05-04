import React, {useState} from 'react'
import '../../styles/styles.css'
import bg from '../../media/bg.png'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from "@mantine/form"
import { notify } from '../Utils/notify'
import {createUserApi} from '../../Services/APIS/CreateUser'

function Registro() {
    const navigate = useNavigate();

    const createUser = async (props) => {
        let result = await createUserApi(props);
        return result;
    };

    const form = useForm({
        initialValues: {
          username: "",
          aka: "",
          email: "",
          password: "",
          password2: "",
        },
      });
      const handleSubmit = () => {  
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (form.values.username === "" || form.values.aka === "" || form.values.correo === "" || form.values.password === "" || form.values.password2 === ""){
          notify("warning", "Por favor llena todos los campos")
        } else if (!emailRegex.test(form.values.email)){
            notify("warning", "Correo no valido")
        } else if (!passwordRegex.test(form.values.password)){
            notify("warning", "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial")
        } else if (form.values.password !== form.values.password2){
            notify("warning", "Las contraseñas no coinciden")
        } else {
          notify("success", "Usuario registrado correctamente")
          createUser(form.values)
          navigate(`/`)
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
              <span className="flex justify-start self-start">Registro de Usuario</span>
            </div>
            <div className="flex flex-col items-center gap-4">
                <input className="rounded-xl w-4/5 border-2 border-gray-500 p-3 h-auto "
                id="username"
                placeholder="Nombre de Usuario"
                onChange={(e) => form.setFieldValue('username', e.target.value)}
                />
                <input className="rounded-xl w-4/5 border-2 border-gray-500 p-3 h-auto "
                id="aka"
                placeholder="A.K.A"
                onChange={(e) => form.setFieldValue('aka', e.target.value)}
                />
                <input className="rounded-xl w-4/5 border-2 border-gray-500 p-3 h-auto "
                id="email"
                placeholder="Correo"
                onChange={(e) => form.setFieldValue('email', e.target.value)}
                />
                <input className="rounded-xl w-4/5 border-2 border-gray-500 p-3 h-auto "
                id="password"
                placeholder="Contraseña"
                type='password'
                onChange={(e) => form.setFieldValue('password', e.target.value)}
                />
                <input className="rounded-xl w-4/5 border-2 border-gray-500 p-3 h-auto "
                id="password2"
                placeholder="Confirmar Contraseña"
                type='password'
                onChange={(e) => form.setFieldValue('password2', e.target.value)}
                />
            </div>
            <button onClick={handleSubmit} className="rounded-xl bg-verde hover:bg-verdesito w-3/5 self-center text-white p-3 h-auto">
              <span>Registrar</span>
            </button>
          </div>
        </div>
      </div>
    )
}

export default Registro