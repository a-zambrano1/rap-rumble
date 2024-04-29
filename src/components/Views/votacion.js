import React, { useState, useEffect } from 'react'
import '../../styles/styles.css'
import bg from '../../media/bg.png'
import { useNavigate } from 'react-router-dom';
import Stepper from '@mui/material/Stepper';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel'
import Step from '@mui/material/Step';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { notify } from '../Utils/notify';
import VoteButton from '../Utils/VoteButton';
import Checkbox from '@mui/material/Checkbox';


const steps = ['Temáticas', 'Random Mode', 'Minutos a Sangre', '4x4 Libre', 'Réplica', 'Resultados'];

const Votacion = ({ mc1, mc2, judge, localization }) => {

  const location = useLocation()
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const Buttonroute = (route) => {
    navigate(route);
  };

  const form = useForm({
    initialValues: {
      juez: "",
      lugar: "",
      mc1: "MC 1",
      mc2: "MC 2",
    },
  })

  const [mc1pts, setMc1pts] = useState(0)
  const [mc2pts, setMc2pts] = useState(0)

  const [tematicaValues, setTematicaValues] = useState({
    "tematica1": {
      "mc1": {
        "button1": 0,
        "button2": 0,
        "button3": 0
      },
      "mc2": {
        "button1": 0,
        "button2": 0,
        "button3": 0
      }
    },
    "tematica2": {
      "mc1": {
        "button1": 0,
        "button2": 0,
        "button3": 0
      },
      "mc2": {
        "button1": 0,
        "button2": 0,
        "button3": 0
      }
    },
  })

  const [randomValues, setRandomValues] = useState({
    "mc1": {
      "button1": 0,
      "button2": 0,
      "button3": 0,
      "button4": 0,
      "button5": 0,
      "button6": 0
    },
    "mc2": {
      "button1": 0,
      "button2": 0,
      "button3": 0,
      "button4": 0,
      "button5": 0,
      "button6": 0
    }
  })

  const [libreValues, setLibreValues] = useState({
    "mc1": {
      "button1": 0,
      "button2": 0,
      "button3": 0,
      "button4": 0,
      "button5": 0,
      "button6": 0
    },
    "mc2": {
      "button1": 0,
      "button2": 0,
      "button3": 0,
      "button4": 0,
      "button5": 0,
      "button6": 0
    }
  })

  const [minutoIda, setMinutoIda] = useState({
    "mc1": {
      "button1": 0,
      "button2": 0,
      "button3": 0,
      "button4": 0,
      "button5": 0,
      "button6": 0
    },
    "mc2": {
      "button1": 0,
      "button2": 0,
      "button3": 0,
      "button4": 0,
      "button5": 0,
      "button6": 0
    }
  })

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

  const handleTematica = (tematica, mc, button, newValue) => {
    let newTematica = { ...tematicaValues }
    newTematica[`tematica${tematica}`][`mc${mc}`][`button${button}`] += newValue
    handlePuntaje(mc, newValue)
    setTematicaValues(newTematica)
  }

  const handleRandom = (mc, button, newValue) => {
    let newRandom = { ...randomValues }
    newRandom[`mc${mc}`][`button${button}`] += newValue
    handlePuntaje(mc, newValue)
    setRandomValues(newRandom)
  }

  const handle4x4 = (mc, button, newValue) => {
    let new4x4 = { ...libreValues }
    new4x4[`mc${mc}`][`button${button}`] += newValue
    handlePuntaje(mc, newValue)
    setLibreValues(new4x4)
  }

  const handleMinutoIda = (mc, button, newValue) => {
    let newMinutoIda = { ...minutoIda }
    newMinutoIda[`mc${mc}`][`button${button}`] += newValue
    handlePuntaje(mc, newValue)
    setMinutoIda(newMinutoIda)
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

  const handlePointsRespuesta = (mc, isChecked) => {
    let newValue = isChecked ? 0.5 : -0.5
    handlePuntaje(mc, newValue)
  }
  const handlePuntaje = (mc, value) => {
    if (mc === 1) {
      let newValue = mc1pts + value
      setMc1pts(newValue)
    } else {
      let newValue = mc2pts + value
      setMc2pts(newValue)
    }

  }

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <div className='flex justify-center h-screen' style={{ backgroundImage: `url(${bg})`, backgroundSize: 'fill' }}>
      <div className='flex flex-col min-w-[25%] gap-5 my-auto py-7 items-center border-4 rounded-3xl border-black bg-white'>
        <section className='flex justify-between w-full bg-white px-7'>
          <h1 className='flex text-[50px]'>Votación</h1>
          <button onClick={() => Buttonroute('/inicio_batalla')} className='flex rounded-full px-5 py-2 h-1/4 self-center text-sky-100 bg-verde hover:bg-verdesito'>X</button>
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
            <div className='flex justify-around mx-5'>
              <div className='flex flex-col'> </div>
              <div className='flex flex-col'> </div>
            </div>
            <div className='flex flex-col justify-around'>
              <div className='flex flex-col text-center w-full'>
                <label value="1" className='m-2 text-verde text-3xl'>Tematica 1</label>
                <div className='flex flex-row gap-2 items-center justify-around'>
                  <div className='flex flex-col gap-1'>
                    <VoteButton
                      count={tematicaValues.tematica1.mc1.button1}
                      onVote={(e) => handleTematica(1, 1, 1, e)} />
                    <VoteButton
                      count={tematicaValues.tematica1.mc1.button2}
                      onVote={(e) => handleTematica(1, 1, 2, e)} />
                    <VoteButton
                      count={tematicaValues.tematica1.mc1.button3}
                      onVote={(e) => handleTematica(1, 1, 3, e)} />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <VoteButton count={tematicaValues.tematica1.mc2.button1}
                      onVote={(e) => handleTematica(1, 2, 1, e)} />
                    <VoteButton count={tematicaValues.tematica1.mc2.button2}
                      onVote={(e) => handleTematica(1, 2, 2, e)} />
                    <VoteButton count={tematicaValues.tematica1.mc2.button3}
                      onVote={(e) => handleTematica(1, 2, 3, e)} />
                  </div>
                </div>
              </div>
              <div className='flex flex-col text-center w-full'>
                <label value="1" className='m-2 text-verde text-3xl'>Tematica 2</label>
                <div className='flex flex-row gap-2 items-center justify-around'>
                  <div className='flex flex-col gap-1'>
                    <VoteButton count={
                      tematicaValues.tematica2.mc1.button1}
                      onVote={(e) => handleTematica(2, 1, 1, e)} />
                    <VoteButton
                      count={tematicaValues.tematica2.mc1.button2}
                      onVote={(e) => handleTematica(2, 1, 2, e)} />
                    <VoteButton
                      count={tematicaValues.tematica2.mc1.button3}
                      onVote={(e) => handleTematica(2, 1, 3, e)} />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <VoteButton
                      count={tematicaValues.tematica2.mc2.button1}
                      onVote={(e) => handleTematica(2, 2, 1, e)} />
                    <VoteButton count={tematicaValues.tematica2.mc2.button2}
                      onVote={(e) => handleTematica(2, 2, 2, e)} />
                    <VoteButton count={tematicaValues.tematica2.mc2.button3}
                      onVote={(e) => handleTematica(2, 2, 3, e)} />
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={activeStep} index={1}>
            <div className='flex justify-around mx-5'>
              <div className='flex flex-col'> </div>
              <div className='flex flex-col'> </div>
            </div>
            <div className='flex flex-col justify-around'>
              <div className='flex flex-col text-center w-full'>
                <label value="1" className='m-2 text-verde text-3xl'>Random Mode</label>
                <div className='flex gap-2 items-center justify-around'>
                  <div className='flex flex-col gap-1'>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <VoteButton count={randomValues.mc1[`button${num}`]} onVote={(e) => handleRandom(1, num, e)} />
                    ))}
                  </div>
                  <div className='flex flex-col gap-1'>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <VoteButton count={randomValues.mc2[`button${num}`]} onVote={(e) => handleRandom(2, num, e)} />
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
                            <div className='flex flex-col gap-1'>
                              {[1, 2, 3, 4, 5, 6].map((num) => (
                                <VoteButton count={minutoIda.mc1[`button${num}`]} onVote={(e) => handleMinutoIda(1, num, e)} />
                              ))}
                            </div>
                            <div className='flex flex-col'>
                              {
                                [1, 2, 3, 4, 5, 6].map((num) => (
                                  <div className='flex flex-row'>
                                    <VoteButton count={minutoIda.mc2[`button${num}`]} onVote={(e) => handleMinutoIda(2, num, e)} />
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
            <div className='flex justify-around mx-5'>
              <div className='flex flex-col'> </div>
              <div className='flex flex-col'> </div>
            </div>
            <div className='flex flex-col justify-around'>
              <div className='flex flex-col text-center w-full'>
                <label value="1" className='m-2 text-verde text-3xl'>4x4 Libre</label>
                <div className='flex gap-2 items-center justify-around'>
                  <div className='flex flex-col gap-1'>
                    {
                      [1, 2, 3, 4, 5, 6].map((num) => (
                        <VoteButton count={libreValues.mc1[`button${num}`]} onVote={(e) => handle4x4(1, num, e)} />
                      ))
                    }
                  </div>
                  <div className='flex flex-col gap-1'>
                    {
                      [1, 2, 3, 4, 5, 6].map((num) => (
                        <VoteButton count={libreValues.mc2[`button${num}`]} onVote={(e) => handle4x4(2, num, e)} />
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={activeStep} index={4}>
            En construccion ...
          </TabPanel>
          <TabPanel value={activeStep} index={5}>
            <div>
              {mc1pts}, {form.values.mc1}
            </div>
            <div>
              {mc2pts}, {form.values.mc2}
            </div>

          </TabPanel>
        </section>
        <div style={{ borderTop: "1px solid black", width: '100%' }}></div>
        <section className='w-full text-center'>
          <span className=''>Puntajes</span>
          <section className='flex justify-between mx-5'>
            <div className='flex flex-col'><span>{form.values.mc1}</span> <span>{mc1pts}</span></div>
            <div className='flex flex-col'><span>{form.values.mc2}</span> <span>{mc2pts}</span></div>
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