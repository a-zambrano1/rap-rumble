import React from 'react'
import { useNavigate } from 'react-router'
import '../../styles/styles.css'
import Auth from './logeo';
import rapero from '../../media/rapper.png'
import micro from '../../media/micro.png'
import { MDBBtn, MDBIcon, MDBInput } from 'mdb-react-ui-kit';

const Inicio = () => {
  
  const navigate = useNavigate()


  return (
  <div className='recuadro2 debug'>
    <div className='pag-bienvenida'>
      <div className='bienvenido'>
        <img src = {micro} width = {96} height = {94}/>
        <span className='titulo-rap-rumble'>Bienvenid@ a
        <span>Rap Rumble! </span>
        </span>         
      </div>
        
      <div className='seccion-hacer'>
        <div>
          <span className='titulos-inicio'>¿Qué quieres hacer?</span>
        </div>
        <br/>
        <div>
        <MDBBtn onClick={()=>navigate('/InicioVotar')} rounded color='success' size='lg'> ¡Votación Rápida!</MDBBtn>
        </div>
      </div>
      <div className='seccion-hacer'>
        <div>
          <span className='titulos-inicio'>Últimos Torneos!</span>
        </div>
        <br/>
        <div>
          <MDBBtn onClick={() => navigate('/listaTodosTorneos')} rounded color='success' size='lg'> Lista de Torneos</MDBBtn>
        </div>
      </div>
      <div className='menu-opciones'>
        <MDBBtn className='titulo-login' rounded color='success' size='lg' onClick={()=>navigate('/login')}>Ingreso Usuario
        <img src = {rapero} width = {72} height = {70}/>
        </MDBBtn>
      </div>
    </div>
  </div>  
  )
}

export default Inicio