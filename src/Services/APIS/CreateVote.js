import { notify } from '../../components/Utils/notify.js'

const apiUrl = "http://localhost:5000"

export const createVoteApi = async (props) => {
    try {
        const response = await fetch(`${apiUrl}/api/v1/votes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idCompetition: 1,
            idMC1: props.aka,
            idMC2: props.aka,
            idJudge: props.aka,
            idDay: props.aka,
            scoreMC1: props.aka,
            scoreMC2: props.aka,
            winner: props.aka,
          }),
        })
        return response.json()
    
      } catch (error) {
        console.log(error)
        notify("error", "Error al crear la votación.")
      }
}