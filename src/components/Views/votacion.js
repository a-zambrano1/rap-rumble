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

const steps = ['Temáticas', 'Random Mode', 'Minuto a Sangre', '4x4 Libre', 'Réplica', 'Resultados'];

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

  const handlePuntaje = (mc, value ) => {
    if (mc === 1) {
      let newValue = mc1pts + value
      setMc1pts(newValue)
    } else {
      let newValue = mc2pts + value
      setMc2pts(newValue)
    }

  }


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
          <div style={{borderTop: "1px solid black",width:'100%'}}></div> 
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
                    <VoteButton  count={tematicaValues.tematica2.mc2.button3}
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
                    <VoteButton  count={randomValues.mc1.button1} onVote={(e)=> handleRandom(1,1,e)} />
                    <VoteButton  count={randomValues.mc1.button2} onVote={(e)=> handleRandom(1,2,e)}/>
                    <VoteButton  count={randomValues.mc1.button3} onVote={(e)=> handleRandom(1,3,e)}/>
                    <VoteButton  count={randomValues.mc1.button4} onVote={(e)=> handleRandom(1,4,e)}/>
                    <VoteButton  count={randomValues.mc1.button5} onVote={(e)=> handleRandom(1,5,e)}/>
                    <VoteButton  count={randomValues.mc1.button6} onVote={(e)=> handleRandom(1,6,e)}/>
                  </div>
                  <div className='flex flex-col gap-1'>
                    <VoteButton  count={randomValues.mc2.button1} onVote={(e)=> handleRandom(2,1,e)}/>
                    <VoteButton  count={randomValues.mc2.button2} onVote={(e)=> handleRandom(2,2,e)}/>
                    <VoteButton  count={randomValues.mc2.button3} onVote={(e)=> handleRandom(2,3,e)}/>
                    <VoteButton  count={randomValues.mc2.button4} onVote={(e)=> handleRandom(2,4,e)}/>
                    <VoteButton  count={randomValues.mc2.button5} onVote={(e)=> handleRandom(2,5,e)}/>
                    <VoteButton  count={randomValues.mc2.button6} onVote={(e)=> handleRandom(2,6,e)}/>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={activeStep} index={2}>
            SANGRE
          </TabPanel>
          <TabPanel value={activeStep} index={3}>
            <button value="3">HOLI</button>
            <button value="3">3</button>
          </TabPanel>
          <TabPanel value={activeStep} index={4}>
            <select id='selectJornada' className='text-[40px] border w-auto'>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </TabPanel>
          <TabPanel value={activeStep} index={5}>
            RESULTADOS
          </TabPanel>
        </section>
        <div style={{borderTop: "1px solid black",width:'100%'}}></div> 
        <section className='w-full text-center'>
          <span className=''>Puntajes</span>
          <section className='flex justify-between mx-5'>
            <div className='flex flex-col'><span>{form.values.mc1}</span> <span>{mc1pts}</span></div>
            <div className='flex flex-col'><span>{form.values.mc2}</span> <span>{mc2pts}</span></div>
          </section>
        </section>
      </div>
    </div>
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