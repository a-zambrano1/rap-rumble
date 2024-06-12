const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1"

export const getBattleVotesApi = async (competition, idMC1, idMC2) => {
  try {
    const response = await fetch(`${apiUrl}/votes/searchBy/idCompetition/${competition}/idMC1/${idMC1}/idMC2/${idMC2}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();

  } catch (error) {
    console.log(error);
  }
};