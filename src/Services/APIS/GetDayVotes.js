const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1"

export const getDayVotesApi = async (competition, idDay) => {
  try {
    const response = await fetch(`${apiUrl}/votes/searchBy/idCompetition/${competition}/idDay/${idDay}/groupByBattle`, {
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