const apiUrl = "http://localhost:5000";

export const getCompetitorsApi = async (competition) => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/competitions/${competition}/members/aka/score/ptb`, {
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