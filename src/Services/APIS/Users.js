const apiUrl = "http://localhost:5000";

export const getUsersByCompetitionApi = async (competition) => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/competitions/${competition}/members`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();

  } catch (error) {
    console.log(error);
    //notify("error", "Error al iniciar sesión.");
  }
};