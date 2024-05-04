import React from 'react'
import '../../styles/styles.css'
import { useNavigate } from 'react-router-dom'

function SeccionRoles() {
  const navigate = useNavigate();

  return (
    // aqui es donde según los roles del usuario elegirá si es juez o admin o solo uno de los dos para pasar a su respectiva sección
    <div className='flex flex-col'>
        seccionRoles
        <div className='flex gap-7'>
            <button onClick={() => navigate('/inicio_batalla')} className='debug'>
              {/** Aquí se manda a la vista del juez OJO: se debe mostrar solo si tiene rol de admin*/}
                <span>Juez</span>
            </button>
            <button>
              {/** Aquí se manda a la vista del admin OJO: se debe mostrar solo si tiene rol de admin*/}
                <span>Admin</span>
            </button>
        </div>
    </div>

  )
}

export default SeccionRoles