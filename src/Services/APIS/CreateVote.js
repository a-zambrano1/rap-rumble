import { notify } from '../../components/Utils/notify.js'

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1"

export const createVoteApi = async (props) => {
    try {
        const response = await fetch(`${apiUrl}/votes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idCompetition: 1,
            idMC1: props.idMC1,
            idMC2: props.idMC2,
            idJudge: props.idJudge,
            idDay: props.idDay,
            scoreMC1: props.scoreMC1,
            scoreMC2: props.scoreMC2,
            winner: props.winner,
            replik: props.replik
          }),
        })
        return response.json()
    
      } catch (error) {
        console.log(error)
        notify("error", "Error al crear la votación.")
      }
}