import state from "../../state.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  GoogleAuthProvider,
  signInWithPopup, browserLocalPersistence
} from "firebase/auth";
import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/styles.css'
import { MDBBtn, MDBIcon, MDBInput } from "mdb-react-ui-kit";
import { Button } from '@mui/material';
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'

export default (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [aka, setAka] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const auth = getAuth();


  const notify = (type, message) => {
    toast[type](message)
  }

  const testeoLoginPost = async (nombre, aka, email, roles) => {
    console.log("Se accede al post")
    try {
      const response = await fetch(
        'http://localhost:5000/api/usuarios/registroGoogle/' + email, {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, aka, email, roles })

      }).then((response) => response.json())
      if (response.data != 'ERROR') {
        console.log('registro correcto');
      } else {
        console.log('error', response)
      }
    } catch (error) {
      return (error);
    }
  }



  const toRegister = () => {
    testeoLoginPost(userInfo.displayName, aka, userInfo.email, "normal");
    setOpen(false);
    navigate('/welcome');
  }


  const Registro = async () => {
    state.isAdmin = false;


    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Usuario registrado con éxito");
        navigate('/welcome');
      })
      .catch((error) => {
        toast.error("Error al registrar usuario");
      });
  };


  const Ingreso = async () => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      return signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          state.islogged = true;
          state.isAdmin = true;
          navigate('/welcome');
        })
        .catch((error) => {
          const errorCode = error.code;
          if (email === null || email === "") {
            toast.error('Debe ingresar un correo');
          }
          if (password === null || password === "") {
            toast.error('Debe ingresar una contraseña');
          }
          if (errorCode === "auth/wrong-password") {
            toast.error('Contraseña Incorrecta')
          }
          if (errorCode === "auth/user-not-found") {
            toast.error('Usuario no encontrado');
          }
        });
    }).catch((error) => console.log(error))
  };

  async function TorneoGet(email_admin) {
    console.log("Trayendo usuarios de la BD...")
    try {
      let result = await fetch(
        'http://localhost:5000/api/usuarios/busqueda/existe/' + email_admin, {
        method: "get",
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => response.json())
      console.log(result)
      if (result.status == 'OK') {
        return (result.data);
      } else {
        toast.error('Ingresa tu A.K.A');
      }
    } catch (error) {
      return ("");
    }
  }

  const ingresoGoogle = () => {

    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence).then(() => {
      return signInWithPopup(auth, provider).then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        state.isAdmin = false;
        setUserInfo(user);
        console.log("user", user)
        const aka = await TorneoGet(user.email);
        aka != null && aka != "" ? navigate('/welcome') : setOpen(true);
      })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
    })
  };

  return (
    <div className='recuadro2 debug'>
      <div>
        <br />
        <div >
          <a className='regresar' onClick={() => navigate('/')}>« Regresar</a>
        </div>
        <br />
        <div className='opciones-login'>
          <span className='raprumble'>Rap
            <span className='raprumble1'>Rumble</span>
          </span>
        </div>
        <div className='opciones-login'>
          <span>Ingreso de Usuario</span>
        </div>
        <br />
        <section>
          <div className="cuadro-informacion">
            <MDBInput
              label="Ingresar Correo"
              id="email"
              style={{ height: 25 }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput
              minLength="8"
              label="Ingresar Contraseña"
              type="password"
              id="password"
              style={{ height: 25 }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <MDBBtn rounded color='success'
              size='lg'
              onClick={Ingreso}>
              <span>Ingresar </span>
              <i className="fas fa-right-to-bracket"></i>
            </MDBBtn>
            <div className='ingreso-correo'>
              <span>-------- O iniciar sesión con --------</span>
              <br />
              <div className="opciones-login">
                <MDBBtn className="me-2" size="lg" style={{ backgroundColor: '#dd4b39' }} href="#" onClick={ingresoGoogle}>
                  <MDBIcon fab icon='google' />
                </MDBBtn>
              </div>
              <br />
              <div className='crear-cuenta'>
                <span>¿No estás registrado aún?</span>
                <a className='boton-crear-cuenta' onClick={() => navigate('/registro_usuario')}>Crear Cuenta</a>
              </div>
              <br />
            </div>
          </div>
        </section>
      </div>

      <Modal
        show={open}
        onHide={() => setOpen(false)}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            INGRESO DEL A.K.A
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>¡Hola! Al ser la primera vez que te registras a Rap Rumble debes ingresar tu AKA</span>
          <MDBInput label='Ingrese su A.K.A' type="text" style={{ height: 60 }} onChange={(e) => setAka(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <br></br>
          <br></br>
          <Button

            onClick={() => toRegister()}
          >
            Registrarme
          </Button>
          <Button
            style={{
              backgroundColor: 'transparent',
              borderRadius: '100px',
              color: 'black',
            }}
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <br></br>
          <br></br>
        </Modal.Footer>
      </Modal>
    </div>
  );




};