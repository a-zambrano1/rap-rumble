const apiUrl = "http://localhost:5000";

export const getNumberOfDaysApi = async (competition) => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/days/searchBy/${competition}/count`, {
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