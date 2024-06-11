const apiUrl = "http://localhost:5000";

export const getDayIdApi = async (competition, numberDay) => {
  try {
    const response = await fetch(`${apiUrl}/api/v1/days/searchBy/${competition}/numberDay/${numberDay}`, {
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