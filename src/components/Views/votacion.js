import React, { useState, useEffect } from 'react'
import '../../styles/styles.css'
import bg from '../../media/bg.png'
import { useNavigate } from 'react-router-dom'
import Stepper from '@mui/material/Stepper'
import StepButton from '@mui/material/StepButton'
import StepLabel from '@mui/material/StepLabel'
import Step from '@mui/material/Step'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useLocation } from 'react-router-dom'
import { useForm } from '@mantine/form'
import { notify } from '../Utils/notify'
import VoteButton from '../Utils/VoteButton'
import Checkbox from '@mui/material/Checkbox'
import { formatox6 } from '../Utils/VoteJsons'
import { set } from 'firebase/database'
import Modal from '../Utils/ModalVotacion'

const steps = ['Temáticas', 'Random Mode', 'Minutos a Sangre', '4x4 Libre', 'Réplica', 'Resultados'];

const Votacion = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    //logica para enviar la votacion a la base de datos
    setIsModalOpen(false)
    //si pasa la validación se enviará la votación y volverá a la pagina de inicio de batalla
    notify("success", "Votación enviada correctamente")
    console.log(outForm.values)
    //navigate('/inicio_batalla')
  }

  const handleCancel = () => {
    notify("error", "No se envió la votación.")
    setIsModalOpen(false)
  }

  const handleSubmit = () => {
    setIsModalOpen(true)
  }

  const location = useLocation()
  const [activeStep, setActiveStep] = React.useState(0)
  const navigate = useNavigate()

  const handleStep = (step) => () => {
    setActiveStep(step)
  };

  const pag = ['Ida', 'Vuelta']
  const [slide, setSlide] = React.useState(0)
  const nextSlide = () => {
    if (slide === pag.length - 1) {
      setSlide(0)
    } else {
      setSlide(slide + 1)
    }
  }

  const prevSlide = () => {
    if (slide === 0) {
      setSlide(pag.length - 1)
    } else {
      setSlide(slide - 1)
    }
  }

  const form = useForm({
    initialValues: {
      juez: "",
      lugar: "",
      mc1: "MC 1",
      mc2: "MC 2"
    },
  })

  const outForm = useForm({
    initialValues: {
      mc1: "",
      mc2: "",
      juez: "",
      lugar: "",
      mc1pts: 0,
      mc2pts: 0,
      winner: ""
    },
  })

  const [mc1pts, setMc1pts] = useState(0)
  const [mc2pts, setMc2pts] = useState(0)
  const [winnerMc, setWinnerMc] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null)
  const [isButtonClicked, setIsButtonClicked] = useState(false)

  const formatoTematica = JSON.parse(JSON.stringify(formatox6))
  const formatoRandom = JSON.parse(JSON.stringify(formatox6))
  const formatoLibre = JSON.parse(JSON.stringify(formatox6))
  const formatoMinuto = JSON.parse(JSON.stringify(formatox6))
  const formatoReplica = JSON.parse(JSON.stringify(formatox6))

  const [tematicaValues, setTematicaValues] = useState(formatoTematica)
  const [randomValues, setRandomValues] = useState(formatoRandom)
  const [libreValues, setLibreValues] = useState(formatoLibre)
  const [minutoIda, setMinutoIda] = useState(formatoMinuto)

  const [replicaValues, setReplicaValues] = useState(formatoReplica)
  const replicaMc1 = Object.values(replicaValues.mc1).reduce((a, b) => a + b, 0);
  const replicaMc2 = Object.values(replicaValues.mc2).reduce((a, b) => a + b, 0);

  const handlePatron = (mc, button, newValue, formatValues, setFormatValues) => {
    let newPatron = { ...formatValues }
    newPatron[`mc${mc}`][`button${button}`] += newValue
    if (formatValues !== replicaValues) {
      handlePuntaje(mc, newValue)
    }
    setFormatValues(newPatron)
  }
  
  const handlePointsRespuesta = (mc, isChecked) => {
    handlePuntaje(mc, isChecked ? 0.5 : -0.5)
  }

  const handlePuntaje = (mc, value) => {
  mc === 1 ? setMc1pts(mc1pts + value) : setMc2pts(mc2pts + value)
  }

  useEffect(() => {
    if (location.state !== null) {
      notify("success", "Datos cargados correctamente")
      let data = location.state.data
      form.setValues({
        juez: data.juez,
        lugar: data.lugar,
        mc1: data.mc1,
        mc2: data.mc2
      })
    }
    // eslint-disable-next-line
  }, [location.state])

  useEffect(() => {
    outForm.setValues({
      mc1: form.values.mc1,
      mc2: form.values.mc2,
      juez: form.values.juez,
      lugar: form.values.lugar,
      mc1pts: mc1pts,
      mc2pts: mc2pts,
      winner: winnerMc
    })
  }, [winnerMc, selectedButton])

  

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  return (
    <div className='flex justify-center h-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'fill' }}>
      <div className='flex flex-col min-w-[25%] gap-5 my-auto py-7 items-center border-4 rounded-3xl border-black bg-white'>
        <section className='flex justify-between w-full bg-white px-7'>
          <h1 className='flex text-[50px]'>Votación</h1>
          <button onClick={() => navigate('/inicio_batalla')} className='flex rounded-full px-5 py-2 h-1/4 self-center text-sky-100 bg-verde hover:bg-verdesito'>X</button>
        </section>
        <section>
          <Stepper alternativeLabel nonLinear activeStep={activeStep} className='mx-10 my-5'>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton color="#inherit" onClick={handleStep(index)}>
                  <StepLabel >{label}</StepLabel>
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div style={{ borderTop: "1px solid black", width: '100%' }}></div>
          <TabPanel value={activeStep} index={0}>
            <div className='flex flex-col justify-around'>
              <div className='flex flex-col text-center w-full'>
                <label value="1" className='m-2 text-verde text-3xl'>Temática 1</label>
                <div className='flex gap-2 items-center justify-around'>
                  <h1 className='text-3xl'>{form.values.mc1}</h1>
                  <h1 className='text-3xl'>{form.values.mc2}</h1>
                </div>
                <br/>
                <div className='flex gap-2 items-center justify-around'>
                  <div className='flex flex-col gap-1'>
                    {[1, 2, 3].map((num) => (
                      <VoteButton count={tematicaValues.mc1[`button${num}`]} onVote={(e) => handlePatron(1, num, e, tematicaValues, setTematicaValues)} />
                    ))}
                  </div>
                  <div className='flex flex-col gap-1'>
                    {[1, 2, 3].map((num) => (
                      <VoteButton count={tematicaValues.mc2[`button${num}`]} onVote={(e) => handlePatron(2, num, e, tematicaValues, setTematicaValues)} />
                    ))}
                  </div>
                </div>
              </div>
              <div className='flex flex-col text-center w-full'>
                <label value="1" className='m-2 text-verde text-3xl'>Temática 2</label>
                <div className='flex flex-row gap-2 items-center justify-around'>
                  <div className='flex flex-col gap-1'>
                    {[4, 5, 6].map((num) => (
                      <VoteButton count={tematicaValues.mc1[`button${num}`]} onVote={(e) => handlePatron(1, num, e, tematicaValues, setTematicaValues)} />
                    ))}
                  </div>
                  <div className='flex flex-col gap-1'>
                    {[4, 5, 6].map((num) => (
                      <VoteButton count={tematicaValues.mc2[`button${num}`]} onVote={(e) => handlePatron(2, num, e, tematicaValues, setTematicaValues)} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={activeStep} index={1}>
            <div className='flex flex-col justify-around'>
              <div className='flex flex-col text-center w-full'>
                <label value="1" className='m-2 text-verde text-3xl'>Random Mode</label>
                <div className='flex gap-2 items-center justify-around'>
                  <h1 className='text-3xl'>{form.values.mc1}</h1>
                  <h1 className='text-3xl'>{form.values.mc2}</h1>
                </div>
                <br/>
                <div className='flex gap-2 items-center justify-around'>
                  <div className='flex flex-col gap-1'>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <VoteButton count={randomValues.mc1[`button${num}`]} onVote={(e) => handlePatron(1, num, e, randomValues, setRandomValues)} />
                    ))}
                  </div>
                  <div className='flex flex-col gap-1'>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <VoteButton count={randomValues.mc2[`button${num}`]} onVote={(e) => handlePatron(2, num, e, randomValues, setRandomValues)} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={activeStep} index={2}>
            <div>
              {
                pag.map((pag, index) => {
                  return (
                    <div
                      key={index}
                      className={slide === index ? 'flex flex-col justify-around' : 'hidden'}>
                      <div>
                        <div className='flex flex-col text-center w-full'>
                          <label value="1" className='m-2 text-verde text-3xl'>Minuto a Sangre {pag}</label>
                          <div className='flex gap-2 items-center justify-around'>
                            <h1 className='text-3xl'>{form.values.mc1}</h1>
                            <h1 className='text-3xl'>{form.values.mc2}</h1>
                          </div>
                          <br/>
                          <div className='flex gap-2 items-center justify-around'>
                            <div className='flex flex-col gap-1'>
                              {[1, 2, 3, 4, 5, 6].map((num) => (
                                <VoteButton count={minutoIda.mc1[`button${num}`]} onVote={(e) => handlePatron(1, num, e, minutoIda, setMinutoIda)} />
                              ))}
                            </div>
                            <div className='flex flex-col'>
                              {
                                [1, 2, 3, 4, 5, 6].map((num) => (
                                  <div className='flex flex-row'>
                                    <VoteButton count={minutoIda.mc2[`button${num}`]} onVote={(e) => handlePatron(2, num, e, minutoIda, setMinutoIda)} />
                                    <Checkbox {...label} onClick={(e) => handlePointsRespuesta(2, e.target.checked)} />
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              <div className='flex absolute w-2 h-2 '>
                <button onClick={prevSlide}>Prev</button>
                <button onClick={nextSlide}>Next</button>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={activeStep} index={3}>
            <div className='flex flex-col justify-around'>
              <div className='flex flex-col text-center w-full'>
                <label value="1" className='m-2 text-verde text-3xl'>4x4 Libre</label>
                <div className='flex gap-2 items-center justify-around'>
                  <h1 className='text-3xl'>{form.values.mc1}</h1>
                  <h1 className='text-3xl'>{form.values.mc2}</h1>
                </div>
                <br/>
                <div className='flex gap-2 items-center justify-around'>
                  <div className='flex flex-col gap-1'>
                    {
                      [1, 2, 3, 4, 5, 6].map((num) => (
                        <VoteButton count={libreValues.mc1[`button${num}`]} onVote={(e) => handlePatron(1, num, e, libreValues, setLibreValues)} />
                      ))
                    }
                  </div>
                  <div className='flex flex-col gap-1'>
                    {
                      [1, 2, 3, 4, 5, 6].map((num) => (
                        <VoteButton count={libreValues.mc2[`button${num}`]} onVote={(e) => handlePatron(2, num, e, libreValues, setLibreValues)} />
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={activeStep} index={4}>
            <div className='flex flex-col justify-around'>
                <div className='flex flex-col text-center w-full gap-4'>
                  <label value="1" className='m-2 text-verde text-3xl'>Réplica</label>
                  <div className='flex gap-2 items-center justify-around'>
                    <h1 className='text-3xl'>{form.values.mc1}</h1>
                    <h1 className='text-3xl'>{form.values.mc2}</h1>
                  </div>
                  <div className='flex gap-2 items-center justify-around'>
                    <div className='flex flex-col gap-1'>
                      {[1, 2, 3, 4].map((num) => (
                        <VoteButton count={replicaValues.mc1[`button${num}`]} onVote={(e) => handlePatron(1, num, e, replicaValues, setReplicaValues)} />
                      ))}
                    </div>
                    <div className='flex flex-col gap-1'>
                      {[1, 2, 3, 4].map((num) => (
                        <VoteButton count={replicaValues.mc2[`button${num}`]} onVote={(e) => handlePatron(2, num, e, replicaValues, setReplicaValues)} />
                      ))}
                    </div>
                  </div>
                  <div className='flex gap-2 items-center justify-around border-black'>
                    <span className={`text-2xl w-10 ${replicaMc1 > replicaMc2 ? "text-verde" : "text-red-500"}`}>
                      {replicaMc1}
                    </span>
                    <span className={`text-2xl w-10 ${replicaMc2 > replicaMc1 ? "text-verde" : "text-red-500"}`}>
                      {replicaMc2}
                    </span>
                  </div>
                </div>
              </div>
          </TabPanel>
          <TabPanel value={activeStep} index={5}>
            <div className='flex flex-col justify-around items-center gap-10'>
              <label value="1" className='m-2 text-verde text-3xl'>Elige un Ganador</label>
              <div className='flex justify-evenly text-center w-full gap-4'>
              <button 
                className={`flex flex-col items-center rounded-3xl border-2 w-1/5 ${selectedButton === 'mc1' ? 'bg-verde text-white' : 'border-black'}`}
                onClick={() => {
                  setWinnerMc(form.values.mc1)
                  setSelectedButton('mc1')
                  setIsButtonClicked(false)
                }}
              >
                <span className='text-3xl m-3'>{form.values.mc1}</span>
              </button>
              <button 
                className={`flex flex-col items-center rounded-3xl border-2 w-1/5 ${selectedButton === 'mc2' ? 'bg-verde text-white' : 'border-black'}`}
                onClick={() => {
                  setWinnerMc(form.values.mc2)
                  setSelectedButton('mc2')
                  setIsButtonClicked(false)
                }}
              >
                <span className='text-3xl m-3'>{form.values.mc2}</span>
              </button>
              </div>
              <button className={`rounded-xl text-white p-3 w-3/5 h-auto ${winnerMc === null || isButtonClicked ? 'bg-slate-500' : 'bg-verde hover:bg-verdesito'} `} 
                      disabled={winnerMc === null || isButtonClicked}
                      onClick={() => {
                        handleSubmit()
                        setIsButtonClicked(true)
                        setSelectedButton(null)
                      }}>Enviar Votación
              </button>
              <Modal isOpen={isModalOpen} onConfirm={handleConfirm} onCancel={handleCancel}>
                ¿Estás seguro de enviar tu voto?
              </Modal>
            </div>    
          </TabPanel>
        </section>
        <div style={{ borderTop: "1px solid black", width: '100%' }}></div>
        <section className='w-full text-center'>
        <label value="1" className='m-2 text-verde text-3xl'>Puntajes</label>
          <section className='flex justify-around mx-5'>
            <div className='flex flex-col text-3xl w-10'><span>{mc1pts}</span></div>
            <div className='flex flex-col text-3xl w-10'><span>{mc2pts}</span></div>
          </section>
        </section>
      </div>
    </div >
  )
}

export default Votacion


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}