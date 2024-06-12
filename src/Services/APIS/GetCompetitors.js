const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1"

export const getCompetitorsApi = async (competition) => {
  try {
    const response = await fetch(`${apiUrl}/competitions/${competition}/competitors/aka/score/ptb`, {
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